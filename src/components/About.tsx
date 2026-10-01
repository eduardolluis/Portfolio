import React from "react";
import { Check, Code2, Smartphone, Server, Database, MapPin, Wrench } from "lucide-react";
import { LocaleContent } from "../types";

interface AboutProps {
  content: LocaleContent["about"];
}

export const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <section className="section-container about-section" id="about">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-eyebrow">{content.eyebrow}</span>
        <h2 className="section-title">{content.title}</h2>
      </div>

      <div className="about-layout-grid">
        {/* Left Column: Narrative & Principles */}
        <div className="about-narrative-col">
          <p className="about-lead-intro">{content.intro}</p>
          <p className="about-body-text">{content.body}</p>

          <div className="about-principles-block">
            <h3 className="principles-title">{content.focusTitle}</h3>
            <ul className="principles-list">
              {content.focusItems.map((item, idx) => (
                <li key={idx} className="principle-item">
                  <span className="principle-check" aria-hidden="true">
                    <Check size={14} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-location-badge">
            <MapPin size={16} className="pin-icon" aria-hidden="true" />
            <span>{content.locationText}</span>
          </div>
        </div>

        {/* Right Column: Verified Tech Stack */}
        <div className="about-stack-col">
          <div className="stack-container-card">
            <h3 className="stack-heading">{content.stackTitle}</h3>
            <p className="stack-subtext">{content.stackDescription}</p>

            {/* Frontend */}
            <div className="stack-category-block">
              <div className="stack-cat-header">
                <Code2 size={16} className="cat-icon" aria-hidden="true" />
                <span className="cat-title">{content.stackLabels.frontend}</span>
              </div>
              <div className="stack-chips">
                {content.frontend.map((item) => (
                  <span key={item} className="stack-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="stack-category-block">
              <div className="stack-cat-header">
                <Smartphone size={16} className="cat-icon" aria-hidden="true" />
                <span className="cat-title">{content.stackLabels.mobile}</span>
              </div>
              <div className="stack-chips">
                {content.mobile.map((item) => (
                  <span key={item} className="stack-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="stack-category-block">
              <div className="stack-cat-header">
                <Server size={16} className="cat-icon" aria-hidden="true" />
                <span className="cat-title">{content.stackLabels.backend}</span>
              </div>
              <div className="stack-chips">
                {content.backend.map((item) => (
                  <span key={item} className="stack-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Database & Cloud */}
            <div className="stack-category-block">
              <div className="stack-cat-header">
                <Database size={16} className="cat-icon" aria-hidden="true" />
                <span className="cat-title">{content.stackLabels.databaseCloud}</span>
              </div>
              <div className="stack-chips">
                {content.databaseCloud.map((item) => (
                  <span key={item} className="stack-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="stack-category-block">
              <div className="stack-cat-header">
                <Wrench size={16} className="cat-icon" aria-hidden="true" />
                <span className="cat-title">{content.stackLabels.tools}</span>
              </div>
              <div className="stack-chips">
                {content.tools.map((item) => (
                  <span key={item} className="stack-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
