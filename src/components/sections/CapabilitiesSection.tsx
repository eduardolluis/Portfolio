import type { LocaleContent } from "../../data/content";

export function CapabilitiesSection({ t }: { t: LocaleContent }) {
  return (
    <section
      className="capabilities-section"
      aria-labelledby="capabilities-title"
    >
      <div className="wrap">
        <span className="section-kicker reveal">{t.capabilities.eyebrow}</span>
        <h2 className="reveal d1" id="capabilities-title">
          {t.capabilities.title}
        </h2>
        <div className="capabilities-grid">
          {t.capabilities.items.map((item, index) => (
            <article
              className={`capability-item reveal d${Math.min(index, 3)}`}
              key={item.title}
            >
              <span className="capability-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
