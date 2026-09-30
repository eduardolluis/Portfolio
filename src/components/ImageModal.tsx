import React, { useEffect } from "react";
import { X, ZoomIn, ExternalLink } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  imageAlt: string;
  caption?: string;
  title?: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  imageAlt,
  caption,
  title,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="image-lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Screenshot Viewer"}
    >
      <div className="image-lightbox-container" onClick={(e) => e.stopPropagation()}>
        {/* Lightbox Header Bar */}
        <div className="lightbox-header">
          <div className="lightbox-title-area">
            <ZoomIn size={16} className="lightbox-icon" aria-hidden="true" />
            <span className="lightbox-title">{title || "Screenshot View"}</span>
          </div>

          <div className="lightbox-controls">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lightbox-action-btn"
              title="Open full image in new tab"
            >
              <ExternalLink size={16} />
              <span>Original File</span>
            </a>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={onClose}
              aria-label="Close image viewer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Lightbox Image Stage */}
        <div className="lightbox-viewport">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="lightbox-img"
          />
        </div>

        {/* Lightbox Footer Caption */}
        {caption && (
          <div className="lightbox-footer">
            <p className="lightbox-caption">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};
