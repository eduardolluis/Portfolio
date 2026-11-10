import { useEffect, useState } from "react";
import type { Lang } from "../data/content";
import "../styles/miga-case-study.css";

const base = "/images/projects/miga/";
const screens = [
  { file: "onboarding.webp", en: "Welcome", es: "Bienvenida", enNote: "A calm introduction to planning meals", esNote: "Una bienvenida a la planificación de comidas" },
  { file: "home.webp", en: "Home", es: "Inicio", enNote: "Today's meals and weekly budget", esNote: "Comidas del día y presupuesto semanal" },
  { file: "recipes.webp", en: "Recipe discovery", es: "Explorar recetas", enNote: "Filters, servings and estimated prices", esNote: "Filtros, porciones y precios estimados" },
  { file: "recipe-detail.webp", en: "Recipe details", es: "Detalle de receta", enNote: "Ingredients, costs and instructions", esNote: "Ingredientes, costos e instrucciones" },
  { file: "what-can-i-cook.webp", en: "What can I cook?", es: "¿Qué puedo cocinar?", enNote: "Suggestions based on the pantry", esNote: "Sugerencias según la despensa" },
  { file: "weekly-plan.webp", en: "Weekly planning", es: "Plan semanal", enNote: "Randomized meals organized by day", esNote: "Comidas aleatorias organizadas por día" },
  { file: "ways-to-save.webp", en: "Ways to spend less", es: "Formas de ahorrar", enNote: "Lower-cost alternatives to planned meals", esNote: "Alternativas económicas a comidas del plan" },
  { file: "groceries.webp", en: "Grocery list", es: "Lista de compras", enNote: "Items, quantities and spending estimates", esNote: "Artículos, cantidades y costos estimados" },
  { file: "profile.webp", en: "Household settings", es: "Preferencias del hogar", enNote: "Profile, budget and pantry controls", esNote: "Perfil, presupuesto y despensa" },
  { file: "subscription.webp", en: "Miga Pro", es: "Miga Pro", enNote: "Subscription features and account controls", esNote: "Funciones de suscripción y controles de cuenta" },
];

const translations = {
  en: {
    return: "Back to portfolio",
    kicker: "INDEPENDENT MOBILE PRODUCT · CASE STUDY",
    heroTitle: "Good food starts with a good plan.",
    lead: "Miga brings recipes, meal planning, grocery shopping and food budgets into one calm mobile experience.",
    stat1: "Recipe discovery",
    stat2: "Randomized weekly planning",
    stat3: "Grocery & savings tools",
    stack: "Flutter · Supabase · RevenueCat",
    storyKicker: "PRODUCT THINKING",
    storyTitle: "From “what should I cook?” to a practical plan.",
    storyCopy: "Explore recipes, build meals from ingredients already in your pantry, generate a randomized week, then turn that plan into a shopping list. Estimated prices and lower-cost swaps keep the budget visible.",
    detail1: "Discover",
    detail1Text: "Browse recipes, adjust servings and check ingredient requirements.",
    detail2: "Plan",
    detail2Text: "Create a randomized meal plan or choose dishes one day at a time.",
    detail3: "Save",
    detail3Text: "Review approximate costs and switch to cheaper alternatives.",
    detail4: "Shop",
    detail4Text: "Organize grocery items, quantities and a running estimated total.",
    previewKicker: "QUICK LOOK",
    previewTitle: "Five screens at a glance.",
    allKicker: "THE FULL PRODUCT",
    allTitle: "Ten real app screens, in order.",
    allText: "Every image comes from the Miga app screenshots supplied for this portfolio — not AI-generated mockups.",
    buildKicker: "ENGINEERING",
    buildTitle: "Made with Flutter, built as a product.",
    buildText: "I developed the mobile experience, integrated Supabase sign-in and RevenueCat subscriptions, and handled iOS builds with Codemagic and TestFlight. The app was submitted for App Store review in November 2026.",
    note: "Budget amounts shown in the app are estimates, not live store quotes. The weekly generator uses randomized selection — not AI.",
    privacy: "Personal account details are obscured in the profile screenshot.",
    portfolio: "Return to selected projects",
    viewScreen: "View full screen",
    close: "Close image",
    previous: "Previous screen",
    next: "Next screen",
  },
  es: {
    return: "Volver al portafolio",
    kicker: "PRODUCTO MÓVIL INDEPENDIENTE · CASO DE ESTUDIO",
    heroTitle: "Comer bien empieza con un buen plan.",
    lead: "Miga reúne recetas, planificación, lista de compras y presupuesto en una experiencia móvil sencilla y agradable.",
    stat1: "Exploración de recetas",
    stat2: "Planes semanales aleatorios",
    stat3: "Compras y ahorro",
    stack: "Flutter · Supabase · RevenueCat",
    storyKicker: "EL PRODUCTO",
    storyTitle: "Del «¿qué cocino?» a un plan práctico.",
    storyCopy: "Explora recetas, aprovecha lo que tienes en la despensa, genera una semana aleatoria y conviértela en una lista de compras. Los costos estimados y las alternativas más económicas ayudan a cuidar el presupuesto.",
    detail1: "Descubre",
    detail1Text: "Explora recetas, ajusta porciones y consulta los ingredientes.",
    detail2: "Planifica",
    detail2Text: "Genera un plan aleatorio o elige las comidas de cada día.",
    detail3: "Ahorra",
    detail3Text: "Revisa costos aproximados y cambia a alternativas más económicas.",
    detail4: "Compra",
    detail4Text: "Organiza artículos, cantidades y un total de compras estimado.",
    previewKicker: "VISTA RÁPIDA",
    previewTitle: "Cinco pantallas para conocerla.",
    allKicker: "EL PRODUCTO COMPLETO",
    allTitle: "Diez pantallas reales, en orden.",
    allText: "Todas las imágenes son capturas reales de Miga compartidas para este portafolio, no mockups generados por IA.",
    buildKicker: "INGENIERÍA",
    buildTitle: "Desarrollada en Flutter como producto real.",
    buildText: "Desarrollé la experiencia móvil, integré autenticación con Supabase y suscripciones con RevenueCat, y gestioné las builds iOS con Codemagic y TestFlight. La app fue enviada a revisión de App Store en noviembre de 2026.",
    note: "Los precios que aparecen son estimaciones, no cotizaciones en tiempo real. El generador semanal funciona mediante selección aleatoria, sin IA.",
    privacy: "Los datos personales de la cuenta están ocultos en la captura del perfil.",
    portfolio: "Regresar a los proyectos",
    viewScreen: "Ampliar pantalla",
    close: "Cerrar imagen",
    previous: "Pantalla anterior",
    next: "Pantalla siguiente",
  },
};

export function MigaCaseStudy({
  lang,
  onToggleLanguage,
}: {
  lang: Lang;
  onToggleLanguage: () => void;
}) {
  const t = translations[lang];
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((i) => (i === null ? null : (i + 1) % screens.length));
      }
      if (event.key === "ArrowLeft") {
        setActive((i) => (i === null ? null : (i - 1 + screens.length) % screens.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const featured = [1, 2, 4, 5, 7];

  return (
    <div className="miga-case">
      <nav className="miga-nav miga-container" aria-label="Case study navigation">
        <a href="/#projects" className="miga-back">← {t.return}</a>
        <a className="miga-wordmark" href="/miga/" aria-label="Miga">miga<span className="miga-wordmark-dot">.</span></a>
        <button className="miga-language" type="button" onClick={onToggleLanguage} aria-label="Change language">
          {lang === "en" ? "ES" : "EN"}
        </button>
      </nav>

      <main>
        <header className="miga-hero miga-container">
          <div className="miga-hero-copy">
            <span className="miga-eyebrow">{t.kicker}</span>
            <h1>{t.heroTitle}</h1>
            <p>{t.lead}</p>
            <div className="miga-pill-list">
              <span>{t.stat1}</span><span>{t.stat2}</span><span>{t.stat3}</span>
            </div>
            <div className="miga-built-with">{t.stack}</div>
          </div>
          <div className="miga-hero-media">
            <div className="miga-hero-blob" aria-hidden="true" />
            <img
              src={base + "home.webp"}
              alt={lang === "en" ? "Miga real app home screen" : "Pantalla de inicio real de Miga"}
              className="miga-hero-phone"
              fetchPriority="high"
            />
            <span className="miga-hero-photo-credit">{lang === "en" ? "Real Miga app screenshot" : "Captura real de Miga"}</span>
          </div>
        </header>

        <section className="miga-story miga-container">
          <div className="miga-story-intro">
            <span className="miga-eyebrow">{t.storyKicker}</span>
            <h2>{t.storyTitle}</h2>
            <p>{t.storyCopy}</p>
          </div>
          <div className="miga-feature-grid">
            {[
              [t.detail1, t.detail1Text],
              [t.detail2, t.detail2Text],
              [t.detail3, t.detail3Text],
              [t.detail4, t.detail4Text],
            ].map(([title, body], index) => (
              <article className="miga-feature" key={title}>
                <span className="miga-feature-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="miga-preview-band">
          <div className="miga-container">
            <span className="miga-eyebrow">{t.previewKicker}</span>
            <h2>{t.previewTitle}</h2>
            <div className="miga-featured-screens">
              {featured.map((i) => (
                <button key={screens[i].file} type="button" className="miga-phone-preview" onClick={() => setActive(i)} aria-label={t.viewScreen + ": " + screens[i][lang]}>
                  <img src={base + screens[i].file} alt={screens[i][lang]} loading="lazy" decoding="async" />
                  <span>{screens[i][lang]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="miga-full-gallery miga-container">
          <span className="miga-eyebrow">{t.allKicker}</span>
          <h2>{t.allTitle}</h2>
          <p className="miga-section-lead">{t.allText}</p>
          <div className="miga-gallery-grid">
            {screens.map((screen, i) => (
              <button key={screen.file} type="button" className="miga-gallery-item" onClick={() => setActive(i)} aria-label={t.viewScreen + ": " + screen[lang]}>
                <span className="miga-screen-number">{String(i + 1).padStart(2, "0")}</span>
                <img src={base + screen.file} alt={screen[lang]} loading="lazy" decoding="async" />
                <strong>{screen[lang]}</strong>
                <small>{lang === "en" ? screen.enNote : screen.esNote}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="miga-tech-band">
          <div className="miga-container miga-tech-layout">
            <div>
              <span className="miga-eyebrow">{t.buildKicker}</span>
              <h2>{t.buildTitle}</h2>
              <p>{t.buildText}</p>
              <p className="miga-tech-fineprint">{t.note}</p>
              <p className="miga-tech-fineprint">{t.privacy}</p>
            </div>
            <div className="miga-tech-list" aria-label="Technology stack">
              <span>Flutter / Dart</span>
              <span>Supabase</span>
              <span>RevenueCat</span>
              <span>Codemagic / TestFlight</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="miga-footer miga-container">
        <a href="/#projects">← {t.portfolio}</a>
        <span>Eduardo De La Cruz · Miga</span>
      </footer>

      {active !== null ? (
        <div className="miga-lightbox-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <div className="miga-lightbox" role="dialog" aria-modal="true" aria-label={screens[active][lang]}>
            <div className="miga-lightbox-header">
              <span>{String(active + 1).padStart(2, "0")} / 10 · {screens[active][lang]}</span>
              <button type="button" onClick={() => setActive(null)} aria-label={t.close}>✕</button>
            </div>
            <div className="miga-lightbox-body">
              <button type="button" className="miga-lightbox-arrow" onClick={() => setActive((active - 1 + screens.length) % screens.length)} aria-label={t.previous}>←</button>
              <img src={base + screens[active].file} alt={screens[active][lang]} />
              <button type="button" className="miga-lightbox-arrow" onClick={() => setActive((active + 1) % screens.length)} aria-label={t.next}>→</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
