import type { LocaleContent } from "../../data/content";

export function AboutSection({ t }: { t: LocaleContent }) {
  return (
    <section id="about" className="about-section motion-section" data-motion-section>
      <div className="section-atmosphere about-atmosphere" aria-hidden="true">
        <span className="about-orbit about-orbit-one" />
        <span className="about-orbit about-orbit-two" />
      </div>
      <div className="wrap about-grid">
        <div className="about-copy-column">
          <span className="section-kicker reveal">{t.about.eyebrow}</span>
          <h2 className="reveal">{t.about.title}</h2>
          <div className="about-text reveal d1">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="stats reveal d2">
            {t.about.stats.map((stat, index) => (
              <div className="stat" data-parallax-card key={stat.value}>
                <span className="stat-index">0{index + 1}</span>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="timeline-shell reveal d1">
          <div className="timeline-progress" aria-hidden="true"><span /></div>
          <ol className="timeline" aria-label="Experience timeline">
            {t.about.timeline.map((item, index) => (
              <li
                className={index === 0 ? "on" : ""}
                data-timeline-item
                key={`${item.time}-${item.title}`}
              >
                <span className="timeline-index">0{index + 1}</span>
                <time>{item.time}</time>
                <h3>{item.title}</h3>
                <div className="where">{item.where}</div>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
