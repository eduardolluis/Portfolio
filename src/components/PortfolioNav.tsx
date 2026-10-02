import type { Lang, LocaleContent } from "../data/content";

type PortfolioNavProps = {
  lang: Lang;
  t: LocaleContent;
  activeId: string;
  scrollTo: (id: string) => void;
  onToggleLanguage: () => void;
};

export function PortfolioNav({
  lang,
  t,
  activeId,
  scrollTo,
  onToggleLanguage,
}: PortfolioNavProps) {
  return (
    <nav className="nav" aria-label="Primary">
      <button className="logo" onClick={() => scrollTo("home")} type="button">
        eduardo<b>.</b>dev
      </button>
      <button
        className={`nav-stack ${activeId === "stack" ? "active" : ""}`}
        onClick={() => scrollTo("stack")}
        type="button"
      >
        {t.nav.stack}
      </button>
      <button
        className={`nav-projects ${activeId === "projects" ? "active" : ""}`}
        onClick={() => scrollTo("projects")}
        type="button"
      >
        {t.nav.projects}
      </button>
      <button
        className={`nav-about ${activeId === "about" ? "active" : ""}`}
        onClick={() => scrollTo("about")}
        type="button"
      >
        {t.nav.about}
      </button>
      <button
        className={`nav-contact ${activeId === "contact" ? "active" : ""}`}
        onClick={() => scrollTo("contact")}
        type="button"
      >
        {t.nav.contact}
      </button>
      <button
        className="lang-switch"
        onClick={onToggleLanguage}
        type="button"
        aria-label="Switch language"
      >
        {lang === "en" ? "ES" : "EN"}
      </button>
    </nav>
  );
}
