import type { LocaleContent } from "../../data/content";

export function StackSection({ t }: { t: LocaleContent }) {
  return (
    <section id="stack">
      <div className="wrap">
        <h2 className="reveal">{t.stack.title}</h2>
        <p className="lead reveal d1 section-lead">{t.stack.lead}</p>
        <div className="stack-grid">
          {t.stack.groups.map((group, index) => (
            <div
              className={`panel tilt reveal d${Math.min(index, 3)}`}
              data-tilt
              key={group.title}
            >
              <div className={`icon ${group.className}`}>{group.icon}</div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
