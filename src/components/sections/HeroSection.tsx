import { site, type LocaleContent } from "../../data/content";

function AnimatedName() {
  let index = 0;
  return (
    <h1 className="name" aria-label={site.name}>
      {site.name.split(" ").map((word, wordIndex, words) => (
        <span className="word" key={`${word}-${wordIndex}`}>
          {word.split("").map((character) => {
            const delay = 0.25 + index * 0.055;
            index += 1;
            return (
              <span
                className="ch"
                style={{ animationDelay: `${delay}s` }}
                key={`${character}-${index}`}
              >
                {character}
              </span>
            );
          })}
          {wordIndex < words.length - 1 ? <>&nbsp;</> : null}
        </span>
      ))}
    </h1>
  );
}

export function HeroSection({
  t,
  typedText,
  scrollTo,
}: {
  t: LocaleContent;
  typedText: string;
  scrollTo: (id: string) => void;
}) {
  return (
    <section className="hero" id="home">
      <div className="wrap">
        <div className="hero-copy">
          <p className="hello hero-in" style={{ animationDelay: ".1s" }}>
            {t.hero.hello}
          </p>
          <AnimatedName />
          <p className="role hero-in" style={{ animationDelay: "1s" }}>
            {t.hero.rolePrefix} <span className="typed">{typedText}</span>
            <span className="cursor" aria-hidden="true" />
          </p>
          <p className="lead hero-in" style={{ animationDelay: "1.1s" }}>
            {t.hero.lead}
          </p>
          <div
            className="availability hero-in"
            style={{ animationDelay: "1.16s" }}
          >
            <span className="availability-dot" aria-hidden="true" />
            <span>{t.hero.availability}</span>
          </div>
          <div className="cta-row hero-in" style={{ animationDelay: "1.2s" }}>
            <button
              className="btn primary magnetic"
              type="button"
              onClick={() => scrollTo("projects")}
            >
              {t.hero.projects}
            </button>
            <a
              className="btn magnetic resume-btn"
              href={site.resume}
              download="Eduardo_De_La_Cruz_Resume.pdf"
            >
              {t.hero.resume} ↓
            </a>
            <button
              className="btn magnetic"
              type="button"
              onClick={() => scrollTo("contact")}
            >
              {t.hero.contact}
            </button>
          </div>
        </div>
      </div>
      <div className="scroll-cue hero-in" style={{ animationDelay: "1.5s" }}>
        <span>{t.hero.scroll}</span>
        <i />
      </div>
    </section>
  );
}
