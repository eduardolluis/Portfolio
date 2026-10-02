import { site, type Lang, type LocaleContent } from "../data/content";

export function PortfolioFooter({
  lang,
  t,
  scrollTo,
}: {
  lang: Lang;
  t: LocaleContent;
  scrollTo: (id: string) => void;
}) {
  return (
    <footer>
      <div className="wrap">
        <span>
          © 2026 {site.name}. {t.footer}.
        </span>
        <button type="button" onClick={() => scrollTo("home")}>
          {lang === "en" ? "Back to top" : "Volver arriba"}
        </button>
      </div>
    </footer>
  );
}
