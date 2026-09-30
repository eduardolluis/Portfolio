import React from "react";
import { LocaleContent } from "../types";

interface CapabilitiesProps {
  content: LocaleContent["capabilities"];
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ content }) => {
  return (
    <section className="section-container capabilities-section" id="capabilities">
      <div className="section-header">
        <span className="section-eyebrow">{content.eyebrow}</span>
        <h2 className="section-title capabilities-heading">{content.title}</h2>
      </div>

      <div className="capabilities-grid">
        {content.items.map((item) => (
          <article key={item.number} className="capability-card">
            <div className="capability-top">
              <span className="capability-number">{item.number}</span>
              <span className="capability-line" aria-hidden="true"></span>
            </div>
            <h3 className="capability-title">{item.title}</h3>
            <p className="capability-summary">{item.summary}</p>
            <ul className="capability-tags" aria-label={`Deliverables for ${item.title}`}>
              {item.deliverables.map((tag) => (
                <li key={tag} className="capability-tag">
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
