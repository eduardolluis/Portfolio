import React from "react";
import {
  Boxes,
  LayoutDashboard,
  Smartphone,
  CalendarCheck,
  ShieldCheck,
  Database,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";
import { LocaleContent } from "../types";

const iconMap: Record<string, LucideIcon> = {
  Boxes,
  LayoutDashboard,
  Smartphone,
  CalendarCheck,
  ShieldCheck,
  Database,
};

interface ServicesProps {
  content: LocaleContent["services"];
  onNavigate: (sectionId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ content, onNavigate }) => {
  return (
    <section className="section-dark services-section" id="services">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header section-header-dark">
          <span className="section-eyebrow eyebrow-light">
            {content.eyebrow}
          </span>
          <h2 className="section-title title-light">{content.title}</h2>
          <p className="section-subtitle subtitle-light">{content.subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {content.items.map((service) => {
            const IconComponent = iconMap[service.icon] || Boxes;
            return (
              <article key={service.id} className="service-card">
                <div className="service-card-top">
                  <div className="service-icon-box" aria-hidden="true">
                    <IconComponent size={22} />
                  </div>
                  <button
                    type="button"
                    className="service-inquire-btn"
                    onClick={() => onNavigate("contact")}
                    aria-label={`Inquire about ${service.title}`}
                  >
                    <span>{content.inquireLabel}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                <h3 className="service-title">{service.title}</h3>

                {/* Problem vs Deliverable Breakdown */}
                <div className="service-breakdown">
                  <div className="service-sub-block">
                    <span className="service-sub-label">
                      {content.problemLabel}
                    </span>
                    <p className="service-sub-text">{service.problem}</p>
                  </div>
                  <div className="service-sub-block">
                    <span className="service-sub-label label-accent">
                      {content.deliverableLabel}
                    </span>
                    <p className="service-sub-text text-strong">
                      {service.deliverable}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
