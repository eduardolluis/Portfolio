import type { CSSProperties } from "react";
import type { LocaleContent } from "../../data/content";

export function StackSection({ t }: { t: LocaleContent }) {
  return (
    <section id="stack" className="stack-section motion-section" data-motion-section>
      <div className="section-atmosphere stack-atmosphere" aria-hidden="true">
        <span className="stack-constellation stack-constellation-a" />
        <span className="stack-constellation stack-constellation-b" />
        <span className="stack-constellation stack-constellation-c" />
      </div>
      <div className="wrap">
        <div className="stack-heading-grid">
          <div>
            <span className="section-kicker reveal">{t.stack.eyebrow}</span>
            <h2 className="reveal d1">{t.stack.title}</h2>
            <p className="lead reveal d2 section-lead">{t.stack.lead}</p>
          </div>
          <div className="stack-radar reveal d2" aria-hidden="true">
            <span className="stack-radar-ring ring-one" />
            <span className="stack-radar-ring ring-two" />
            <span className="stack-radar-ring ring-three" />
            <span className="stack-radar-core">&lt;/&gt;</span>
            <i className="stack-radar-dot dot-one" />
            <i className="stack-radar-dot dot-two" />
            <i className="stack-radar-dot dot-three" />
          </div>
        </div>
        <div className="stack-grid">
          {t.stack.groups.map((group, index) => (
            <div
              className={`panel stack-panel tilt reveal d${Math.min(index, 3)}`}
              data-tilt
              data-parallax-card
              key={group.title}
            >
              <div className="stack-panel-head">
                <div className={`icon ${group.className}`}>{group.icon}</div>
                <span className="stack-panel-index">0{index + 1}</span>
              </div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul>
                {group.items.map((item, itemIndex) => (
                  <li style={{ "--chip-i": itemIndex } as CSSProperties} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              <span className="stack-panel-beam" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
