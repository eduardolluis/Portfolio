import { useEffect, useRef, useState, type FormEvent } from "react";
import { site, type Lang } from "../data/content";

export type ContactForm = {
  name: string;
  email: string;
  type: string;
  message: string;
};

export type ContactStatus = "idle" | "sending" | "sent" | "fallback" | "error";

const emptyContactForm: ContactForm = {
  name: "",
  email: "",
  type: "",
  message: "",
};

export function useContactForm(lang: Lang) {
  const [copied, setCopied] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>(emptyContactForm);
  const [contactStatus, setContactStatus] = useState<ContactStatus>("idle");
  const copyResetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (copyResetTimer.current !== null) {
        window.clearTimeout(copyResetTimer.current);
      }
    },
    [],
  );

  const updateContactField = (field: keyof ContactForm, value: string) => {
    setContactForm((current) => ({ ...current, [field]: value }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (copyResetTimer.current !== null) {
        window.clearTimeout(copyResetTimer.current);
      }
      copyResetTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactStatus === "sending") return;

    const subject = `${contactForm.type || "Software project"} — ${contactForm.name || "Portfolio inquiry"}`;
    const body = [
      `${lang === "en" ? "Name" : "Nombre"}: ${contactForm.name}`,
      `${lang === "en" ? "Email" : "Correo"}: ${contactForm.email}`,
      `${lang === "en" ? "Project type" : "Tipo de proyecto"}: ${contactForm.type}`,
      "",
      contactForm.message,
    ].join("\n");

    const openEmailDraft = () => {
      setContactStatus("fallback");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    setContactStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          need: contactForm.type,
          message: contactForm.message,
          website: "",
        }),
      });

      if (response.ok) {
        setContactStatus("sent");
        setContactForm(emptyContactForm);
        return;
      }

      if (response.status === 400 || response.status === 429) {
        setContactStatus("error");
        return;
      }

      openEmailDraft();
    } catch {
      openEmailDraft();
    }
  };

  return {
    copied,
    contactForm,
    contactStatus,
    copyEmail,
    submitContact,
    updateContactField,
  };
}
