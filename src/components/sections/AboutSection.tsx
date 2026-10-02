import type { LocaleContent } from "../../data/content";

export function AboutSection({ t }: { t: LocaleContent }) {
  return (
    <section id="about">
      <div className="wrap about-grid">
        <div>
          <h2 className="reveal">{t.about.title}</h2>
          <div className="about-text reveal d1">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="stats reveal d2">
            {t.about.stats.map((stat) => (
              <div className="stat" key={stat.value}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <ol className="timeline" aria-label="Experience timeline">
          {t.about.timeline.map((item, index) => (
            <li
              className={`reveal ${index === 0 ? "on" : ""}`}
              key={`${item.time}-${item.title}`}
            >
              <time>{item.time}</time>
              <h3>{item.title}</h3>
              <div className="where">{item.where}</div>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
