import { useEffect, useState } from "react";
import { BackgroundScene } from "./components/BackgroundScene";
import { PortfolioPage } from "./components/PortfolioPage";
import { content, type Lang } from "./data/content";
import { usePortfolioEffects } from "./hooks/usePortfolioEffects";
import "./styles.css";

function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("portfolio-language");
    return saved === "es" || saved === "en" ? saved : "en";
  });
  const t = content[lang];
  const { activeId, marqueeItems, scrollTo, typedText } = usePortfolioEffects(
    lang,
    t.hero.roles,
  );

  useEffect(() => {
    localStorage.setItem("portfolio-language", lang);
    document.documentElement.lang = lang;
    const title =
      lang === "en"
        ? "Eduardo De La Cruz | Full-Stack Software Developer"
        : "Eduardo De La Cruz | Desarrollador de Software Full-Stack";
    const description =
      lang === "en"
        ? "Portfolio of Eduardo De La Cruz, a full-stack software developer building web apps, mobile apps and business systems."
        : "Portfolio de Eduardo De La Cruz, desarrollador full-stack de aplicaciones web, apps móviles y sistemas para negocios.";
    document.title = title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:description"]')
      ?.setAttribute("content", description);
  }, [lang]);

  if (
    window.location.pathname !== "/" &&
    window.location.pathname !== "/index.html"
  ) {
    return (
      <>
        <BackgroundScene activeId="home" />
        <main className="not-found-page">
          <div className="not-found-card">
            <span className="section-kicker">404</span>
            <h1>{t.notFound.title}</h1>
            <p>{t.notFound.text}</p>
            <a className="btn primary" href="/">
              {t.notFound.action}
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <PortfolioPage
      lang={lang}
      t={t}
      activeId={activeId}
      marqueeItems={marqueeItems}
      scrollTo={scrollTo}
      typedText={typedText}
      onToggleLanguage={() =>
        setLang((current) => (current === "en" ? "es" : "en"))
      }
    />
  );
}

export default App;
