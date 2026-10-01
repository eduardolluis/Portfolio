import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Monitor,
  Maximize2,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { LocaleContent, ProjectData } from "../types";
import { ImageModal } from "./ImageModal";

interface FeaturedWorkProps {
  content: LocaleContent["work"];
}
type WorkLabels = Omit<
  LocaleContent["work"],
  "projects" | "eyebrow" | "title" | "subtitle"
>;

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ content }) => (
  <section className="section-container work-section" id="work">
    <div className="section-header">
      <span className="section-eyebrow">{content.eyebrow}</span>
      <h2 className="section-title">{content.title}</h2>
      <p className="section-subtitle">{content.subtitle}</p>
    </div>
    <div className="projects-container">
      {content.projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          total={content.projects.length}
          labels={content}
        />
      ))}
    </div>
    <div className="work-cta-row">
      <a className="btn btn-primary" href="#contact">
        {content.ctaLabel}
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </div>
  </section>
);

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  labels: WorkLabels;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  labels,
}) => {
  const availableDeviceTypes = useMemo(
    () =>
      Array.from(
        new Set(
          project.screenshots.map((screenshot) => screenshot.type || "desktop"),
        ),
      ) as ("desktop" | "mobile")[],
    [project.screenshots],
  );
  const [activeDevice, setActiveDevice] = useState<"desktop" | "mobile">(
    availableDeviceTypes[0] || "desktop",
  );
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveDevice(availableDeviceTypes[0] || "desktop");
  }, [availableDeviceTypes, project.id]);

  useEffect(() => {
    setActiveScreenshotIdx(0);
  }, [activeDevice, project.id]);

  const filteredScreenshots = useMemo(() => {
    if (availableDeviceTypes.length <= 1) return project.screenshots;
    return project.screenshots.filter(
      (screenshot) => (screenshot.type || "desktop") === activeDevice,
    );
  }, [activeDevice, availableDeviceTypes.length, project.screenshots]);

  const activeScreenshot =
    filteredScreenshots[activeScreenshotIdx] ||
    filteredScreenshots[0] ||
    project.screenshots[0];
  const isPrimary = index === 0;
  const viewLabel =
    activeScreenshot?.type === "mobile"
      ? labels.mobileView
      : labels.desktopView;

  return (
    <article
      className={`project-card ${isPrimary ? "project-primary" : ""}`}
      id={`project-${project.id}`}
      aria-labelledby={`heading-${project.id}`}
    >
      <div className="project-top-meta">
        <div className="project-meta-left">
          <span className="project-counter">
            {index + 1} <span className="counter-sep">/</span> {total}
          </span>
          <span className="project-category-tag">{project.category}</span>
        </div>
        {project.badge && (
          <span
            className={`project-status-badge ${isPrimary ? "badge-primary" : ""}`}
          >
            {isPrimary && <ShieldCheck size={13} aria-hidden="true" />}
            {project.badge}
          </span>
        )}
      </div>

      <div className="project-content-grid">
        <div className="project-visual-column">
          <div className="showcase-frame">
            <div className="project-media-header">
              <div className="project-media-info">
                <span className="project-media-name">{project.name}</span>
                <span className="project-media-active-view">
                  {activeScreenshot?.type === "mobile" ? (
                    <Smartphone size={14} aria-hidden="true" />
                  ) : (
                    <Monitor size={14} aria-hidden="true" />
                  )}
                  {viewLabel}
                </span>
              </div>

              {availableDeviceTypes.length > 1 && (
                <div
                  className="project-media-device-switch"
                  role="tablist"
                  aria-label={`${project.name} device view`}
                >
                  {availableDeviceTypes.map((deviceType) => {
                    const isSelected = activeDevice === deviceType;
                    const deviceLabel =
                      deviceType === "mobile"
                        ? labels.mobileView
                        : labels.desktopView;

                    return (
                      <button
                        key={deviceType}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        className={`device-toggle-btn ${isSelected ? "device-toggle-active" : ""}`}
                        onClick={() => setActiveDevice(deviceType)}
                      >
                        {deviceType === "mobile" ? (
                          <Smartphone size={13} aria-hidden="true" />
                        ) : (
                          <Monitor size={13} aria-hidden="true" />
                        )}
                        <span>{deviceLabel}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div
              className={`mockup-viewport ${activeScreenshot?.type === "mobile" ? "viewport-mobile" : "viewport-desktop"} clickable-mockup`}
              onClick={() => activeScreenshot && setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && activeScreenshot) {
                  e.preventDefault();
                  setLightboxOpen(true);
                }
              }}
              title={labels.expandView}
            >
              {activeScreenshot ? (
                <>
                  <img
                    src={activeScreenshot.url}
                    alt={activeScreenshot.alt}
                    className="mockup-image"
                    loading="lazy"
                    onError={(event) => {
                      if (
                        activeScreenshot.fallbackUrl &&
                        event.currentTarget.src !== activeScreenshot.fallbackUrl
                      ) {
                        event.currentTarget.src = activeScreenshot.fallbackUrl;
                      }
                    }}
                  />
                  <div className="mockup-expand-hint">
                    <Maximize2 size={16} aria-hidden="true" />
                    <span>{labels.expandView}</span>
                  </div>
                </>
              ) : (
                <div className="mockup-fallback">
                  <span>{project.name}</span>
                </div>
              )}
            </div>
            {activeScreenshot?.caption && (
              <div className="mockup-caption">
                <span className="caption-text">{activeScreenshot.caption}</span>
              </div>
            )}
          </div>

          {filteredScreenshots.length > 1 && (
            <div
              className="screenshot-tabs"
              role="tablist"
              aria-label={`${project.name} screenshots`}
            >
              {filteredScreenshots.map((screenshot, idx) => (
                <button
                  key={screenshot.url}
                  type="button"
                  role="tab"
                  aria-selected={activeScreenshotIdx === idx}
                  className={`screenshot-tab-btn ${activeScreenshotIdx === idx ? "tab-active" : ""}`}
                  onClick={() => setActiveScreenshotIdx(idx)}
                >
                  <span>
                    {screenshot.label || `${labels.screenshotView} ${idx + 1}`}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="project-details-column">
          <div className="project-title-area">
            <h3 id={`heading-${project.id}`} className="project-title">
              {project.name}
            </h3>
            <p className="project-summary">{project.summary}</p>
          </div>
          <div className="case-block">
            <h4 className="case-block-label">{labels.challengeLabel}</h4>
            <p className="case-block-text">{project.challenge}</p>
          </div>
          <div className="case-block">
            <h4 className="case-block-label">{labels.solutionLabel}</h4>
            <p className="case-block-text">{project.solution}</p>
          </div>
          <div className="case-block">
            <h4 className="case-block-label">{labels.builtLabel}</h4>
            <ul className="capabilities-checklist">
              {project.built.map((item) => (
                <li key={item} className="checklist-item">
                  <CheckCircle2
                    size={16}
                    className="check-icon"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="case-block">
            <h4 className="case-block-label">{labels.techLabel}</h4>
            <div className="tech-badge-cloud" aria-label={labels.techLabel}>
              {project.tech.map((technology) => (
                <span key={technology} className="tech-pill">
                  {technology}
                </span>
              ))}
            </div>
          </div>
          {project.independentNote && (
            <div className="project-note-banner">
              <span className="note-icon">ℹ</span>
              <span className="note-text">{project.independentNote}</span>
            </div>
          )}
          <div className="project-actions-row">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <GithubIcon size={15} />
                <span>{labels.viewSource}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <ExternalLink size={15} aria-hidden="true" />
                <span>{labels.liveDemo}</span>
              </a>
            )}
            {!project.github && !project.live && (
              <span className="confidential-tag">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>{labels.privateProject}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={lightboxOpen}
        imageUrl={activeScreenshot?.url || null}
        imageAlt={activeScreenshot?.alt || project.name}
        caption={activeScreenshot?.caption}
        title={`${project.name} — ${activeScreenshot?.label || `${labels.screenshotView} ${activeScreenshotIdx + 1}`}`}
        onClose={() => setLightboxOpen(false)}
      />
    </article>
  );
};
