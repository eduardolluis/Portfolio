import { site, type LocaleContent } from "../../data/content";
import type {
  ContactForm,
  ContactStatus,
} from "../../hooks/useContactForm";
import type { FormEvent } from "react";

export function ContactSection({
  t,
  copied,
  contactForm,
  contactStatus,
  copyEmail,
  submitContact,
  updateContactField,
}: {
  t: LocaleContent;
  copied: boolean;
  contactForm: ContactForm;
  contactStatus: ContactStatus;
  copyEmail: () => Promise<void>;
  submitContact: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  updateContactField: (field: keyof ContactForm, value: string) => void;
}) {
  return (
    <section className="contact motion-section" id="contact" data-motion-section>
      <div className="section-atmosphere contact-atmosphere" aria-hidden="true">
        <span className="contact-halo halo-one" />
        <span className="contact-halo halo-two" />
      </div>
      <div className="wrap">
        <div className="contact-shell">
          <span className="contact-shell-beam" aria-hidden="true" />
          <div className="contact-layout">
            <div className="contact-copy">
              <span className="section-kicker reveal">{t.contact.eyebrow}</span>
              <h2 className="reveal">{t.contact.title}</h2>
              <p className="lead reveal d1">{t.contact.lead}</p>
              <a className="mail contact-email reveal d2" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <div className="contact-signal reveal d2" aria-hidden="true">
                <span className="contact-signal-dot" />
                <span className="contact-signal-line" />
                <strong>{t.contact.online}</strong>
              </div>
              <div className="cta-row reveal d3">
                <button
                  className="btn primary magnetic"
                  type="button"
                  onClick={copyEmail}
                >
                  {copied ? t.contact.copied : t.contact.copy}
                </button>
                <a
                  className="btn magnetic"
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.contact.github}
                </a>
                <a
                  className="btn magnetic"
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.contact.linkedin}
                </a>
                <a
                  className="btn magnetic"
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.contact.whatsapp}
                </a>
                <a
                  className="btn magnetic resume-btn"
                  href={site.resume}
                  download="Eduardo_De_La_Cruz_Resume.pdf"
                >
                  {t.hero.resume} ↓
                </a>
              </div>
            </div>

            <form className="contact-form reveal d1" onSubmit={submitContact}>
              <div className="contact-form-chrome" aria-hidden="true">
                <span /><span /><span />
                <i />
              </div>
              <label>
                <span>{t.contact.form.name}</span>
                <input
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  value={contactForm.name}
                  onChange={(event) =>
                    updateContactField("name", event.target.value)
                  }
                />
              </label>
              <label>
                <span>{t.contact.form.email}</span>
                <input
                  required
                  type="email"
                  maxLength={120}
                  autoComplete="email"
                  value={contactForm.email}
                  onChange={(event) =>
                    updateContactField("email", event.target.value)
                  }
                />
              </label>
              <label>
                <span>{t.contact.form.type}</span>
                <select
                  required
                  value={contactForm.type}
                  onChange={(event) =>
                    updateContactField("type", event.target.value)
                  }
                >
                  <option value="" disabled>
                    —
                  </option>
                  {t.contact.form.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t.contact.form.message}</span>
                <textarea
                  required
                  minLength={5}
                  maxLength={4000}
                  rows={5}
                  value={contactForm.message}
                  onChange={(event) =>
                    updateContactField("message", event.target.value)
                  }
                />
              </label>
              <button
                className="btn primary contact-submit"
                type="submit"
                disabled={contactStatus === "sending"}
              >
                <span>
                  {contactStatus === "sending"
                    ? t.contact.form.sending
                    : t.contact.form.submit}
                </span>
                <i aria-hidden="true">↗</i>
              </button>
              <small
                aria-live="polite"
                className={`contact-status ${contactStatus}`}
              >
                {contactStatus === "sent"
                  ? t.contact.form.sent
                  : contactStatus === "fallback"
                    ? t.contact.form.fallback
                    : contactStatus === "error"
                      ? t.contact.form.error
                      : t.contact.form.note}
              </small>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
