import { useState } from "react";
import { ArrowUpRight, ExternalLink, ShieldCheck, CheckCircle2, Smartphone, Monitor } from "lucide-react";
import { GithubIcon } from "./Icons";
import { LocaleContent, ProjectData } from "../types";

interface FeaturedWorkProps {
  content: LocaleContent["work"];
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ content }) => {
  return (
    <section className="section-container work-section" id="work">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-eyebrow">{content.eyebrow}</span>
        <h2 className="section-title">{content.title}</h2>
        <p className="section-subtitle">{content.subtitle}</p>
      </div>

      {/* Projects List */}
      <div className="projects-container">
        {content.projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={content.projects.length}
            labels={{
              featuredBadge: content.featuredBadge,
              caseStudyLabel: content.caseStudyLabel,
              challengeLabel: content.challengeLabel,
              solutionLabel: content.solutionLabel,
              builtLabel: content.builtLabel,
              techLabel: content.techLabel,
              viewSource: content.viewSource,
              liveDemo: content.liveDemo,
            }}
          />
        ))}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  labels: {
    featuredBadge: string;
    caseStudyLabel: string;
    challengeLabel: string;
    solutionLabel: string;
    builtLabel: string;
    techLabel: string;
    viewSource: string;
    liveDemo: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, total, labels }) => {
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  const activeScreenshot = project.screenshots[activeScreenshotIdx] || project.screenshots[0];
  const isPrimary = index === 0;

  return (
    <article
      className={`project-card ${isPrimary ? "project-primary" : ""}`}
      id={`project-${project.id}`}
      aria-labelledby={`heading-${project.id}`}
    >
      {/* Top Meta Bar */}
      <div className="project-top-meta">
        <div className="project-meta-left">
          <span className="project-counter">
            0{index + 1} <span className="counter-sep">/</span> 0{total}
          </span>
          <span className="project-category-tag">{project.category}</span>
        </div>

        {project.badge && (
          <span className={`project-status-badge ${isPrimary ? "badge-primary" : ""}`}>
            {isPrimary && <ShieldCheck size={13} aria-hidden="true" />}
            {project.badge}
          </span>
        )}
      </div>

      {/* Main Grid: Visual Media + Case Study Breakdown */}
      <div className="project-content-grid">
        {/* Left/Top: Visual Showcase Frame */}
        <div className="project-visual-column">
          <div className="showcase-frame">
            {/* Window / Frame Header */}
            <div className="mockup-chrome">
              <div className="chrome-controls" aria-hidden="true">
                <span className="control-dot dot-red"></span>
                <span className="control-dot dot-yellow"></span>
                <span className="control-dot dot-green"></span>
              </div>
              <div className="chrome-address-bar">
                <span className="address-lock">🔒</span>
                <span className="address-text">
                  {project.id === "gio-workspace"
                    ? "gioworkspace.internal"
                    : `${project.id}.app`}
                </span>
              </div>
              <div className="chrome-device-indicator" aria-label={activeScreenshot?.type === "mobile" ? "Mobile View" : "Desktop View"}>
                {activeScreenshot?.type === "mobile" ? (
                  <Smartphone size={14} aria-hidden="true" />
                ) : (
                  <Monitor size={14} aria-hidden="true" />
                )}
              </div>

            </div>

            {/* Media Canvas */}
            <div className={`mockup-viewport ${activeScreenshot?.type === "mobile" ? "viewport-mobile" : "viewport-desktop"}`}>
              {activeScreenshot ? (
                <img
                  src={activeScreenshot.url}
                  alt={activeScreenshot.alt}
                  className="mockup-image"
                  loading="lazy"
                />
              ) : (
                <div className="mockup-fallback">
                  <span>{project.name}</span>
                </div>
              )}
            </div>

            {/* Screenshot Caption */}
            {activeScreenshot?.caption && (
              <div className="mockup-caption">
                <span className="caption-text">{activeScreenshot.caption}</span>
              </div>
            )}
          </div>

          {/* Screenshot Selector Tabs if multiple images exist */}
          {project.screenshots.length > 1 && (
            <div
              className="screenshot-tabs"
              role="tablist"
              aria-label={`${project.name} screenshot views`}
            >
              {project.screenshots.map((s, idx) => (
                <button
                  key={s.url}
                  type="button"
                  role="tab"
                  aria-selected={activeScreenshotIdx === idx}
                  className={`screenshot-tab-btn ${activeScreenshotIdx === idx ? "tab-active" : ""}`}
                  onClick={() => setActiveScreenshotIdx(idx)}
                >
                  <span className="tab-dot" aria-hidden="true"></span>
                  <span>View 0{idx + 1}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right/Bottom: Case Study Specification */}
        <div className="project-details-column">
          <div className="project-title-area">
            <h3 id={`heading-${project.id}`} className="project-title">
              {project.name}
            </h3>
            <p className="project-summary">{project.summary}</p>
          </div>

          {/* Context & Challenge */}
          <div className="case-block">
            <h4 className="case-block-label">{labels.challengeLabel}</h4>
            <p className="case-block-text">{project.challenge}</p>
          </div>

          {/* Engineered Solution */}
          <div className="case-block">
            <h4 className="case-block-label">{labels.solutionLabel}</h4>
            <p className="case-block-text">{project.solution}</p>
          </div>

          {/* What I Built / Key Capabilities Delivered */}
          <div className="case-block">
            <h4 className="case-block-label">{labels.builtLabel}</h4>
            <ul className="capabilities-checklist">
              {project.built.map((item, idx) => (
                <li key={idx} className="checklist-item">
                  <CheckCircle2 size={16} className="check-icon" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div className="case-block">
            <h4 className="case-block-label">{labels.techLabel}</h4>
            <div className="tech-badge-cloud" aria-label="Technologies used">
              {project.tech.map((techItem) => (
                <span key={techItem} className="tech-pill">
                  {techItem}
                </span>
              ))}
            </div>
          </div>

          {/* Independent disclaimer note if applicable */}
          {project.independentNote && (
            <div className="project-note-banner">
              <span className="note-icon">ℹ</span>
              <span className="note-text">{project.independentNote}</span>
            </div>
          )}

          {/* Links / Actions */}
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

            {/* Client confidentiality indicator for GIO Workspace */}
            {!project.github && !project.live && (
              <span className="confidential-tag">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>Client Proprietary Production Software</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
