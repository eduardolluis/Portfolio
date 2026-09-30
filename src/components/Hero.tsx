import React, { useState } from "react";
import { ArrowUpRight, ArrowDown, Maximize2 } from "lucide-react";
import { LocaleContent } from "../types";
import { ImageModal } from "./ImageModal";

interface HeroProps {
  content: LocaleContent["hero"];
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"gio" | "melodix" | "whatzapp">("gio");
  const [heroLightboxOpen, setHeroLightboxOpen] = useState(false);

  const heroShowcase = {
    gio: {
      name: "GIO Workspace",
      category: "Business Platform",
      url: "gioworkspace.internal",
      image: "/images/projects/gio/preview-v3.jpg",
      type: "desktop",
      tech: ["React", "TypeScript", "Supabase", "PostgreSQL"],
      desc: "Role-aware administrative platform coordinating scheduling, patients & billing",
    },
    melodix: {
      name: "Melodix",
      category: "Mobile Streaming App",
      url: "melodix.app",
      image: "/images/projects/melodix/player.png",
      type: "mobile",
      tech: ["Flutter", "FastAPI", "PostgreSQL", "Cloudinary"],
      desc: "Full-stack mobile music player with background queue & cloud storage",
    },
    whatzapp: {
      name: "Whatzapp",
      category: "Real-Time Messaging",
      url: "whatzapp.app",
      image: "/images/projects/whatzapp/chat.png",
      type: "mobile",
      tech: ["Flutter", "WebSockets", "Firebase", "LiveKit"],
      desc: "Cross-platform chat app with voice notes, live location & video calls",
    },
  };

  const current = heroShowcase[activeTab];

  return (
    <section className="hero-section" id="top">
      <div className="hero-grid-layout">
        {/* Left Content Column */}
        <div className="hero-left-col">
          {/* Availability & Location Eyebrow */}
          <div className="hero-eyebrow-wrapper">
            <span className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-ping"></span>
            </span>
            <span className="hero-eyebrow-text">{content.eyebrow}</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline">
            {content.titleStart}{" "}
            <span className="hero-headline-accent">{content.titleAccent}</span>{" "}
            {content.titleEnd}
          </h1>

          {/* Value Proposition Description */}
          <p className="hero-description">{content.subtitle}</p>

          {/* CTAs */}
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

          {/* Capability Ticker */}
          <div className="hero-ticker-band" aria-label="Specialties">
            {content.ticker.map((item, index) => (
              <div key={item} className="hero-ticker-item">
                <span className="ticker-index">0{index + 1}</span>
                <span className="ticker-label">{item}</span>
                {index < content.ticker.length - 1 && (
                  <span className="ticker-divider" aria-hidden="true">/</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual Interactive Preview Window */}
        <div className="hero-right-col">
          <div className="hero-showcase-window">
            {/* Window Bar */}
            <div className="showcase-window-bar">
              <div className="window-dots" aria-hidden="true">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="window-address">
                <span className="address-icon">🔒</span>
                <span className="address-url">{current.url}</span>
              </div>
              <div className="window-badge">
                <span className="badge-pulse"></span>
                <span>PRODUCTION</span>
              </div>
            </div>

            {/* Showcase Tabs */}
            <div className="showcase-tabs-row" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "gio"}
                className={`showcase-tab ${activeTab === "gio" ? "active-tab" : ""}`}
                onClick={() => setActiveTab("gio")}
              >
                <span>01 GIO Workspace</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "melodix"}
                className={`showcase-tab ${activeTab === "melodix" ? "active-tab" : ""}`}
                onClick={() => setActiveTab("melodix")}
              >
                <span>02 Melodix</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "whatzapp"}
                className={`showcase-tab ${activeTab === "whatzapp" ? "active-tab" : ""}`}
                onClick={() => setActiveTab("whatzapp")}
              >
                <span>03 Whatzapp</span>
              </button>
            </div>

            {/* Window Screen Viewport */}
            <div
              className={`showcase-screen ${current.type === "mobile" ? "screen-mobile" : "screen-desktop"} clickable-mockup`}
              onClick={() => setHeroLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setHeroLightboxOpen(true);
                }
              }}
              title="Click to view full screenshot in high resolution"
            >
              <img
                src={current.image}
                alt={current.name}
                className="showcase-img"
              />
              <div className="mockup-expand-hint">
                <Maximize2 size={16} aria-hidden="true" />
                <span>Expand Full View</span>
              </div>
            </div>

            {/* Window Footer Info */}
            <div className="showcase-window-footer">
              <div className="footer-meta-info">
                <span className="meta-category">{current.category}</span>
                <h4 className="meta-title">{current.name}</h4>
                <p className="meta-desc">{current.desc}</p>
              </div>
              <div className="footer-tech-pills">
                {current.tech.map((t) => (
                  <span key={t} className="tech-pill-mini">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Lightbox Modal */}
      <ImageModal
        isOpen={heroLightboxOpen}
        imageUrl={current.image}
        imageAlt={current.name}
        caption={current.desc}
        title={`${current.name} — Preview`}
        onClose={() => setHeroLightboxOpen(false)}
      />
    </section>
  );
};
