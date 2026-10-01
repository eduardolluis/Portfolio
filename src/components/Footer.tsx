import { ArrowUp, Mail, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { siteConfig } from "../config/site";
import { LocaleContent } from "../types";

interface FooterProps {
  content: LocaleContent["footer"];
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ content, onOpenPrivacy }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer-section">
      <div className="section-container footer-container">
        {/* Top Footer: Brand & Description */}
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <span className="footer-brand-title">{siteConfig.name}</span>
            <p className="footer-tagline">{content.tagline}</p>
            <span className="footer-location">{content.location}</span>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-heading">{content.connectTitle}</h4>
            <div className="footer-social-links">
              {/* GitHub */}
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-item"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </a>

              {/* LinkedIn (Only if provided) */}
              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-item"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
              )}


              {/* Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="footer-social-item"
                aria-label="Email Address"
              >
                <Mail size={16} aria-hidden="true" />
                <span>Email</span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-item"
                aria-label="WhatsApp Contact"
              >
                <MessageSquare size={16} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="footer-action-col">
            <button
              type="button"
              className="btn btn-outline btn-back-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <span>{content.backToTop}</span>
              <ArrowUp size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {siteConfig.name}. {content.allRightsReserved}
          </p>

          <div className="footer-legal-links">
            <button
              type="button"
              className="footer-legal-btn"
              onClick={onOpenPrivacy}
            >
              {content.privacyPolicy}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
