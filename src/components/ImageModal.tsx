import React, { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";

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
  const [isPortrait, setIsPortrait] = useState(false);

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

  useEffect(() => {
    setIsPortrait(false);
  }, [imageUrl]);

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
            className={`lightbox-img ${isPortrait ? "lightbox-img-portrait" : ""}`}
            onLoad={(event) => {
              const image = event.currentTarget;
              setIsPortrait(image.naturalHeight > image.naturalWidth * 1.2);
            }}
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
