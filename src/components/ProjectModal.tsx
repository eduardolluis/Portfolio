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

  useEffect(() => {
    if (!project) return;
    setActiveIndex(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % project.gallery.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + project.gallery.length) % project.gallery.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;
  const active = project.gallery[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + project.gallery.length) % project.gallery.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % project.gallery.length);
  };

  return (
    <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.currentTarget === event.target) onClose();
    }}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <div className="project-modal-topbar">
          <div>
            <span className="project-modal-category">{project.category}</span>
            <h2 id="project-modal-title">{project.title}</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label={labels.close}>×</button>
        </div>

        <div className="project-modal-layout">
          <div className="project-modal-visuals">
            <div
              className={`modal-stage ${active.kind === "mobile" ? "stage-mobile" : "stage-desktop"}`}
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
              <img src={active.src} alt={active.alt} />
              {project.gallery.length > 1 ? (
                <>
                  <button
                    className="gallery-arrow gallery-prev"
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous screen"
                  >
                    ←
                  </button>
                  <button
                    className="gallery-arrow gallery-next"
                    type="button"
                    onClick={showNext}
                    aria-label="Next screen"
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
