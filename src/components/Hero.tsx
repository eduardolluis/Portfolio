import React from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { LocaleContent } from "../types";

interface HeroProps {
  content: LocaleContent["hero"];
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onNavigate }) => {
  return (
    <section className="hero-section" id="top">
      <div className="hero-container">
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

        {/* Capability Rule Ticker */}
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
    </section>
  );
};
