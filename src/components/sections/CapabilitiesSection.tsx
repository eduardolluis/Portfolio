import {
  Building2,
  MonitorSmartphone,
  ServerCog,
  Smartphone,
} from "lucide-react";
import type { LocaleContent } from "../../data/content";

const capabilityIcons = [MonitorSmartphone, Smartphone, Building2, ServerCog];

export function CapabilitiesSection({ t }: { t: LocaleContent }) {
  return (
    <section
      className="capabilities-section motion-section"
      aria-labelledby="capabilities-title"
      data-motion-section
    >
      <div className="section-atmosphere capabilities-atmosphere" aria-hidden="true">
        <span className="section-orb section-orb-a" />
        <span className="section-orb section-orb-b" />
        <span className="section-scanline" />
      </div>
      <div className="wrap">
        <div className="section-heading-layout">
          <div>
            <span className="section-kicker reveal">{t.capabilities.eyebrow}</span>
            <h2 className="reveal d1" id="capabilities-title">
              {t.capabilities.title}
            </h2>
          </div>
          <div className="section-signal reveal d2" aria-hidden="true">
            <span />
            <span />
            <span />
            <i />
          </div>
        </div>
        <div className="capabilities-grid">
          {t.capabilities.items.map((item, index) => {
            const Icon = capabilityIcons[index] ?? ServerCog;
            return (
              <article
                className={`capability-item reveal d${Math.min(index, 3)}`}
                data-parallax-card
                key={item.title}
              >
                <div className="capability-topline">
                  <span className="capability-number">0{index + 1}</span>
                  <span className="capability-icon" aria-hidden="true">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                </div>
                <div className="capability-pulse" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="capability-arrow" aria-hidden="true">↗</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
