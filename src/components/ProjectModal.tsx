import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/content";

type Labels = {
  close: string;
  overview: string;
  gallery: string;
  highlights: string;
  viewCode: string;
  viewLive: string;
  caseStudy: string;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function ProjectModal({
  project,
  labels,
  onClose,
}: {
  project: Project | null;
  labels: Labels;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    setActiveIndex(0);
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // Lock the document behind the dialog. Using a fixed body also prevents
    // touch/trackpad scroll from leaking to the portfolio underneath the modal.
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % project.gallery.length);
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + project.gallery.length) % project.gallery.length);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [project, onClose]);

  useEffect(() => {
    if (!project || project.gallery.length < 2) return;
    const adjacent = [
      (activeIndex + 1) % project.gallery.length,
      (activeIndex - 1 + project.gallery.length) % project.gallery.length,
    ];
    adjacent.forEach((index) => {
      const image = new Image();
      image.src = project.gallery[index].src;
    });
  }, [activeIndex, project]);

  if (!project) return null;
  const active = project.gallery[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + project.gallery.length) % project.gallery.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % project.gallery.length);
  };

  return (
    <div
      className="project-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="project-modal-topbar">
          <div>
            <span className="project-modal-category">{project.category}</span>
            <h2 id="project-modal-title">{project.title}</h2>
          </div>
          <button ref={closeButtonRef} className="modal-close" type="button" onClick={onClose} aria-label={labels.close}>×</button>
        </div>

        <div className="project-modal-layout">
          <div className="project-modal-visuals">
            <div
              id="project-gallery-stage"
              className={`modal-stage ${active.kind === "mobile" ? "stage-mobile" : "stage-desktop"}`}
              aria-label={`${labels.gallery}: ${active.label}`}
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current == null || project.gallery.length < 2) return;
                const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
                const delta = endX - touchStartX.current;
                touchStartX.current = null;
                if (Math.abs(delta) < 48) return;
                if (delta < 0) showNext();
                else showPrevious();
              }}
            >
              <img src={active.src} alt={active.alt} decoding="async" draggable={false} />
              {project.gallery.length > 1 ? (
                <>
                  <button
                    className="gallery-arrow gallery-prev"
                    type="button"
                    onClick={showPrevious}
                    aria-label={`${labels.gallery}: ${project.gallery[(activeIndex - 1 + project.gallery.length) % project.gallery.length].label}`}
                  >
                    ←
                  </button>
                  <button
                    className="gallery-arrow gallery-next"
                    type="button"
                    onClick={showNext}
                    aria-label={`${labels.gallery}: ${project.gallery[(activeIndex + 1) % project.gallery.length].label}`}
                  >
                    →
                  </button>
                </>
              ) : null}
            </div>
            <div className="gallery-tabs" role="tablist" aria-label={labels.gallery}>
              {project.gallery.map((item, index) => (
                <button
                  key={`${item.src}-${item.label}`}
                  type="button"
                  role="tab"
                  aria-controls="project-gallery-stage"
                  aria-selected={index === activeIndex}
                  className={index === activeIndex ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="project-modal-copy">
            <span className="modal-section-label">{labels.overview}</span>
            <p className="modal-description">{project.description}</p>

            <div className="modal-detail-block">
              <span className="modal-section-label">{labels.highlights}</span>
              <ul className="modal-highlights">
                {project.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="modal-detail-block">
              <span className="modal-section-label">Stack</span>
              <div className="chips modal-chips">
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>

            {project.disclaimer ? <p className="project-note modal-note">{project.disclaimer}</p> : null}

            <div className="modal-links">
              {project.caseStudy ? <a className="btn primary" href={project.caseStudy} target="_blank" rel="noopener noreferrer">{labels.caseStudy}</a> : null}
              {project.live ? <a className="btn" href={project.live} target="_blank" rel="noopener noreferrer">{labels.viewLive}</a> : null}
              {project.github ? <a className="btn" href={project.github} target="_blank" rel="noopener noreferrer">{labels.viewCode}</a> : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
