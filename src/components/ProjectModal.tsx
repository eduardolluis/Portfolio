import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/content";
import { ProjectDetails } from "./project-modal/ProjectDetails";
import { ProjectGallery } from "./project-modal/ProjectGallery";
import type { ProjectModalLabels } from "./project-modal/types";

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
  labels: ProjectModalLabels;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project || project.gallery.length === 0) return;

    setActiveIndex(0);
    const resetFrame = requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

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

    const focusTimer = window.setTimeout(
      () => closeButtonRef.current?.focus(),
      0,
    );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (project.gallery.length > 1 && event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % project.gallery.length);
        return;
      }

      if (project.gallery.length > 1 && event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex(
          (current) =>
            (current - 1 + project.gallery.length) % project.gallery.length,
        );
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
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
      cancelAnimationFrame(resetFrame);
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

  if (!project || project.gallery.length === 0) return null;

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
          <button
            ref={closeButtonRef}
            className="modal-close"
            type="button"
            onClick={onClose}
            aria-label={labels.close}
          >
            ×
          </button>
        </div>

        <div className="project-modal-scroll" ref={scrollRef}>
          <div className="project-modal-layout">
            <ProjectGallery
              project={project}
              labels={labels}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
            <ProjectDetails project={project} labels={labels} />
          </div>
        </div>
      </section>
    </div>
  );
}
