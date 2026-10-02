import { useRef, type Dispatch, type SetStateAction } from "react";
import type { Project } from "../../data/content";
import type { ProjectModalLabels } from "./types";

export function ProjectGallery({
  project,
  labels,
  activeIndex,
  setActiveIndex,
}: {
  project: Project;
  labels: ProjectModalLabels;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}) {
  const touchStartX = useRef<number | null>(null);
  const active = project.gallery[activeIndex];
  const galleryLength = project.gallery.length;

  const showPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + galleryLength) % galleryLength,
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % galleryLength);
  };

  return (
    <div className="project-modal-visuals">
      <div
        id="project-gallery-stage"
        className={`modal-stage ${active.kind === "mobile" ? "stage-mobile" : "stage-desktop"}`}
        aria-label={`${labels.gallery}: ${active.label}`}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current == null || galleryLength < 2) return;
          const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
          const delta = endX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(delta) < 48) return;
          if (delta < 0) showNext();
          else showPrevious();
        }}
      >
        <img
          src={active.src}
          alt={active.alt}
          decoding="async"
          draggable={false}
        />
        {galleryLength > 1 ? (
          <>
            <button
              className="gallery-arrow gallery-prev"
              type="button"
              onClick={showPrevious}
              aria-label={`${labels.gallery}: ${project.gallery[(activeIndex - 1 + galleryLength) % galleryLength].label}`}
            >
              ←
            </button>
            <button
              className="gallery-arrow gallery-next"
              type="button"
              onClick={showNext}
              aria-label={`${labels.gallery}: ${project.gallery[(activeIndex + 1) % galleryLength].label}`}
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
      {project.previewNote ? (
        <p className="gallery-origin-note">{project.previewNote}</p>
      ) : null}
    </div>
  );
}
