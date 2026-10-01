import React, { useState, FormEvent } from "react";
import {
  ArrowUpRight,
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { siteConfig } from "../config/site";
import { LocaleContent } from "../types";

interface ContactProps {
  content: LocaleContent["contact"];
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export const Contact: React.FC<ContactProps> = ({ content }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    need: "",
    budget: "",
    message: "",
    website: "", // Anti-spam honeypot
  });

  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validate = (): boolean => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage(content.form.validationRequired);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage(content.form.validationEmail);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!validate()) return;

    // Check honeypot
    if (formData.website) {
      // Quietly simulate success to fool spam bots
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || undefined,
          need: formData.need || undefined,
          budget: formData.budget || undefined,
          message: formData.message.trim(),
          website: formData.website,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to deliver message");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        need: "",
        budget: "",
        message: "",
        website: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage(content.form.errorText);
    }
  };

  const handleResetForm = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section className="section-container contact-section" id="contact">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-eyebrow">{content.eyebrow}</span>
        <h2 className="section-title">{content.title}</h2>
        <p className="section-subtitle">{content.subtitle}</p>
      </div>

      <div className="contact-layout-grid">
        {/* Left Column: Direct Contact & Availability */}
        <div className="contact-direct-col">
          <div className="contact-direct-card">
            <h3 className="direct-heading">{content.directTalk}</h3>
            <p className="direct-desc">{content.directDescription}</p>

            {/* Email Channel */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="direct-channel-item"
              aria-label={`Email ${siteConfig.email}`}
            >
              <div className="channel-icon-box" aria-hidden="true">
                <Mail size={20} />
              </div>
              <div className="channel-info">
                <span className="channel-label">{content.emailLabel}</span>
                <span className="channel-value">{siteConfig.email}</span>
              </div>
              <ArrowUpRight size={18} className="channel-arrow" aria-hidden="true" />
            </a>

            {/* WhatsApp Channel */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(content.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="direct-channel-item"
              aria-label="Chat on WhatsApp"
            >
              <div className="channel-icon-box whatsapp-box" aria-hidden="true">
                <MessageSquare size={20} />
              </div>
              <div className="channel-info">
                <span className="channel-label">{content.whatsappLabel}</span>
                <span className="channel-value">{siteConfig.whatsappFormatted}</span>
              </div>
              <ArrowUpRight size={18} className="channel-arrow" aria-hidden="true" />
            </a>

            {/* Availability Note */}
            <div className="response-time-banner">
              <Clock size={16} className="clock-icon" aria-hidden="true" />
              <span>{content.responseTime}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="contact-form-col">
          {status === "success" ? (
            <div className="form-feedback-card success-card" role="alert">
              <div className="feedback-icon-box success-icon-box" aria-hidden="true">
                <CheckCircle size={36} />
              </div>
              <h3 className="feedback-title">{content.form.successTitle}</h3>
              <p className="feedback-text">{content.form.successText}</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleResetForm}
              >
                {content.form.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="project-inquiry-form" noValidate>
              {/* Row 1: Name and Email */}
              <div className="form-row form-row-2">
                <div className="form-field-group">
                  <label htmlFor="name" className="form-label">
                    {content.form.name} <span className="field-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={content.form.namePlaceholder}
                    required
                    className="form-input"
                    disabled={status === "submitting"}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="email" className="form-label">
                    {content.form.email} <span className="field-required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={content.form.emailPlaceholder}
                    required
                    className="form-input"
                    disabled={status === "submitting"}
                  />
                </div>
              </div>

              {/* Row 2: Company & Project Type */}
              <div className="form-row form-row-2">
                <div className="form-field-group">
                  <label htmlFor="company" className="form-label">
                    {content.form.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={content.form.companyPlaceholder}
                    className="form-input"
                    disabled={status === "submitting"}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="need" className="form-label">
                    {content.form.need}
                  </label>
                  <select
                    id="need"
                    name="need"
                    value={formData.need}
                    onChange={handleChange}
                    className="form-select"
                    disabled={status === "submitting"}
                  >
                    <option value="">{content.form.needPlaceholder}</option>
                    {content.form.needOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Budget Range */}
              <div className="form-field-group">
                <label htmlFor="budget" className="form-label">
                  {content.form.budget}
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="form-select"
                  disabled={status === "submitting"}
                >
                  <option value="">{content.form.budgetPlaceholder}</option>
                  {content.form.budgetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 4: Message */}
              <div className="form-field-group">
                <label htmlFor="message" className="form-label">
                  {content.form.message} <span className="field-required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={content.form.messagePlaceholder}
                  required
                  rows={5}
                  className="form-textarea"
                  disabled={status === "submitting"}
                ></textarea>
              </div>

              {/* Honeypot field (hidden from real users) */}
              <div className="honeypot-field" aria-hidden="true" style={{ display: "none" }}>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Validation / API Error Banner */}
              {errorMessage && (
                <div className="form-alert-banner" role="alert">
                  <AlertCircle size={18} className="alert-icon" aria-hidden="true" />
                  <div className="alert-content">
                    <p>{errorMessage}</p>
                    {status === "error" && (
                      <a
                        href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Project Inquiry: " + formData.name)}&body=${encodeURIComponent(formData.message)}`}
                        className="alert-fallback-link"
                      >
                        {content.emailFallback}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button & Privacy Disclaimer */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={17} className="btn-spinner" aria-hidden="true" />
                      <span>{content.form.submitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{content.form.submit}</span>
                      <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="form-privacy-note">{content.form.privacyNotice}</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
