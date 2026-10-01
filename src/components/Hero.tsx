import React, { useMemo, useState } from "react";
import { ArrowUpRight, ArrowDown, Maximize2, FileText } from "lucide-react";
import { LocaleContent } from "../types";
import { ImageModal } from "./ImageModal";

interface HeroProps {
  content: LocaleContent["hero"];
  onNavigate: (sectionId: string) => void;
}

type ShowcaseKey = "gio" | "melodix" | "whatzapp";

const showcaseMedia: Record<
  ShowcaseKey,
  {
    name: string;
    image: string;
    pdfUrl?: string;
    fallbackImage?: string;
    type: "desktop" | "mobile";
    tech: string[];
  }
> = {
  gio: {
    name: "GIO Workspace",
    image: "/images/projects/gio/dashboard.webp",
    pdfUrl: "/gio-workspace.pdf",
    type: "desktop",
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL"],
  },
  melodix: {
    name: "Melodix",
    image: "/images/projects/melodix/home.png",
    type: "mobile",
    tech: ["Flutter", "FastAPI", "PostgreSQL", "Cloudinary"],
  },
  whatzapp: {
    name: "Whatzapp",
    image: "/images/projects/whatzapp/home.png",
    type: "mobile",
    tech: ["Flutter", "Socket.IO", "Firebase", "LiveKit"],
  },
};

export const Hero: React.FC<HeroProps> = ({ content, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ShowcaseKey>("gio");
  const [heroLightboxOpen, setHeroLightboxOpen] = useState(false);

  const current = useMemo(
    () => ({ ...showcaseMedia[activeTab], ...content.showcase[activeTab] }),
    [activeTab, content.showcase],
  );

  const openShowcase = () => setHeroLightboxOpen(true);

  return (
    <section className="hero-section" id="top">
      <div className="hero-grid-layout">
        <div className="hero-left-col">
          <div className="hero-eyebrow-wrapper">
            <span className="status-indicator" aria-hidden="true">
              <span className="status-dot"></span>
            </span>
            <span className="hero-eyebrow-text">{content.eyebrow}</span>
          </div>

          <h1 className="hero-headline">
            {content.titleStart}{" "}
            <span className="hero-headline-accent">{content.titleAccent}</span>{" "}
            {content.titleEnd}
          </h1>

          <p className="hero-description">{content.subtitle}</p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate("contact")}
            >
              <span>{content.ctaPrimary}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => onNavigate("work")}
            >
              <span>{content.ctaSecondary}</span>
              <ArrowDown size={17} aria-hidden="true" />
            </button>
          </div>

          <div className="hero-ticker-band" aria-label="Specialties">
            {content.ticker.map((item) => (
              <div key={item} className="hero-ticker-item">
                <span className="ticker-label">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right-col">
          <div className="hero-showcase-window">
            <div className="showcase-project-header">
              <span className="showcase-kicker">{content.selectedWork}</span>
              <span className="showcase-status">{current.status}</span>
            </div>

            <div
              className="showcase-tabs-row"
              role="tablist"
              aria-label={content.selectedWork}
            >
              {(Object.keys(showcaseMedia) as ShowcaseKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === key}
                  className={`showcase-tab ${activeTab === key ? "active-tab" : ""}`}
                  onClick={() => setActiveTab(key)}
                >
                  <span>{showcaseMedia[key].name}</span>
                </button>
              ))}
            </div>

            <div
              className={`showcase-screen ${current.type === "mobile" ? "screen-mobile" : "screen-desktop"} clickable-mockup`}
              onClick={openShowcase}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openShowcase();
                }
              }}
              title={content.expandView}
            >
              <img
                src={current.image}
                alt={current.name}
                className="showcase-img"
                onError={(event) => {
                  if (
                    current.fallbackImage &&
                    event.currentTarget.src !== current.fallbackImage
                  ) {
                    event.currentTarget.src = current.fallbackImage;
                  }
                }}
              />
              <div className="mockup-expand-hint">
                <Maximize2 size={16} aria-hidden="true" />
                <span>{content.expandView}</span>
              </div>
            </div>

            <div className="showcase-window-footer">
              <div className="footer-meta-info">
                <span className="meta-category">{current.category}</span>
                <h4 className="meta-title">{current.name}</h4>
                <p className="meta-desc">{current.description}</p>
              </div>
              <div className="footer-tech-pills">
                {current.tech.map((technology) => (
                  <span key={technology} className="tech-pill-mini">
                    {technology}
                  </span>
                ))}
              </div>
              {current.pdfUrl && (
                <a
                  className="showcase-case-study-link"
                  href={current.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText size={15} aria-hidden="true" />
                  <span>{content.viewCaseStudy}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={heroLightboxOpen}
        imageUrl={current.image}
        imageAlt={current.name}
        caption={current.description}
        title={current.name}
        onClose={() => setHeroLightboxOpen(false)}
      />
    </section>
  );
};
