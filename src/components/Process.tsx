import React from "react";
import { CheckCircle2 } from "lucide-react";
import { LocaleContent } from "../types";

interface ProcessProps {
  content: LocaleContent["process"];
}

export const Process: React.FC<ProcessProps> = ({ content }) => {
  return (
    <section className="section-container process-section" id="process">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-eyebrow">{content.eyebrow}</span>
        <h2 className="section-title">{content.title}</h2>
        <p className="section-subtitle">{content.subtitle}</p>
      </div>

      {/* Steps List */}
      <div className="process-timeline">
        {content.steps.map((step, idx) => (
          <article key={step.number} className="process-step-item">
            <div className="process-step-num-col">
              <span className="process-step-num">{step.number}</span>
              {idx < content.steps.length - 1 && (
                <span className="process-connector-line" aria-hidden="true"></span>
              )}
            </div>

            <div className="process-step-content">
              <div className="process-step-header">
                <h3 className="process-step-title">{step.title}</h3>
                <span className="process-deliverable-badge">
                  <CheckCircle2 size={13} aria-hidden="true" />
                  <span>{step.deliverable}</span>
                </span>
              </div>
              <p className="process-step-desc">{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
