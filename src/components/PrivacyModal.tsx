import React, { useEffect } from "react";
import { X, Shield } from "lucide-react";
import { LocaleContent } from "../types";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: LocaleContent["privacy"];
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="privacy-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div
        className="privacy-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="privacy-modal-header">
          <div className="privacy-header-title-box">
            <Shield size={20} className="shield-icon" aria-hidden="true" />
            <h2 id="privacy-modal-title" className="privacy-modal-heading">
              {content.title}
            </h2>
          </div>
          <button
            type="button"
            className="privacy-close-btn"
            onClick={onClose}
            aria-label="Close privacy policy"
          >
            <X size={20} />
          </button>
        </div>

        <div className="privacy-modal-body">
          <span className="privacy-date">{content.lastUpdated}</span>
          <p className="privacy-intro">{content.intro}</p>

          <div className="privacy-points-list">
            {content.points.map((pt, i) => (
              <div key={i} className="privacy-point-item">
                <h3 className="privacy-point-title">{pt.title}</h3>
                <p className="privacy-point-text">{pt.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="privacy-modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
          >
            {content.backToHome}
          </button>
        </div>
      </div>
    </div>
  );
};
