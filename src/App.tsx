import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { BackgroundScene } from "./components/BackgroundScene";
import { ProjectModal } from "./components/ProjectModal";
import { ProjectVisual } from "./components/ProjectVisual";
import { content, site, type Lang, type Project } from "./data/content";
import "./styles.css";

const sectionIds = ["home", "stack", "projects", "about", "contact"];

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
              <span className="ch" style={{ animationDelay: `${delay}s` }} key={`${character}-${index}`}>
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

function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("portfolio-language");
    return saved === "es" || saved === "en" ? saved : "en";
  });
  const [activeId, setActiveId] = useState("home");
  const [typedText, setTypedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", type: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "fallback" | "error">("idle");
  const t = content[lang];

  const marqueeItems = useMemo(
    () => [
      "Flutter",
      "React",
      "TypeScript",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Firebase",
      "Supabase",
      "Node.js",
      "Prisma",
      "Linux",
      "Vercel",
    ],
    [],
  );

  useEffect(() => {
    localStorage.setItem("portfolio-language", lang);
    document.documentElement.lang = lang;
    const title = lang === "en"
      ? "Eduardo De La Cruz | Full-Stack Software Developer"
      : "Eduardo De La Cruz | Desarrollador de Software Full-Stack";
    const description = lang === "en"
      ? "Portfolio of Eduardo De La Cruz, a full-stack software developer building web apps, mobile apps and business systems."
      : "Portfolio de Eduardo De La Cruz, desarrollador full-stack de aplicaciones web, apps móviles y sistemas para negocios.";
    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", description);
  }, [lang]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedText(t.hero.roles.join(" · "));
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId = 0;

    const tick = () => {
      const current = t.hero.roles[roleIndex];
      setTypedText(current.slice(0, charIndex));

      if (!deleting && charIndex < current.length) {
        charIndex += 1;
        timeoutId = window.setTimeout(tick, 90);
      } else if (!deleting) {
        deleting = true;
        timeoutId = window.setTimeout(tick, 1350);
      } else if (charIndex > 0) {
        charIndex -= 1;
        timeoutId = window.setTimeout(tick, 45);
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % t.hero.roles.length;
        timeoutId = window.setTimeout(tick, 220);
      }
    };

    timeoutId = window.setTimeout(tick, 900);
    return () => window.clearTimeout(timeoutId);
  }, [t.hero.roles]);

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".progress");
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;

      const midpoint = window.innerHeight * 0.5;
      let next = "home";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= midpoint && rect.bottom > midpoint) next = section.id;
      });
      setActiveId(next);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    const tiltItems = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const magneticItems = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const cleanups: Array<() => void> = [];

    tiltItems.forEach((element) => {
      const move = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        element.style.setProperty("--mx", `${x * 100}%`);
        element.style.setProperty("--my", `${y * 100}%`);
        element.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateZ(0)`;
      };
      const leave = () => { element.style.transform = ""; };
      element.addEventListener("mousemove", move);
      element.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        element.removeEventListener("mousemove", move);
        element.removeEventListener("mouseleave", leave);
      });
    });

    magneticItems.forEach((element) => {
      const move = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        element.style.transform = `translate(${dx * 0.2}px, ${dy * 0.26}px)`;
      };
      const leave = () => { element.style.transform = ""; };
      element.addEventListener("mousemove", move);
      element.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        element.removeEventListener("mousemove", move);
        element.removeEventListener("mouseleave", leave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [lang]);

  useEffect(() => {
    const glow = document.querySelector<HTMLElement>(".glow");
    if (!glow) return;
    const move = (event: MouseEvent) => {
      glow.style.opacity = "1";
      glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactStatus === "sending") return;

    const subject = `${contactForm.type || "Software project"} — ${contactForm.name || "Portfolio inquiry"}`;
    const body = [
      `${lang === "en" ? "Name" : "Nombre"}: ${contactForm.name}`,
      `${lang === "en" ? "Email" : "Correo"}: ${contactForm.email}`,
      `${lang === "en" ? "Project type" : "Tipo de proyecto"}: ${contactForm.type}`,
      "",
      contactForm.message,
    ].join("\n");

    const openEmailDraft = () => {
      setContactStatus("fallback");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    setContactStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          need: contactForm.type,
          message: contactForm.message,
          website: "",
        }),
      });

      if (response.ok) {
        setContactStatus("sent");
        setContactForm({ name: "", email: "", type: "", message: "" });
        return;
      }

      if (response.status === 400 || response.status === 429) {
        setContactStatus("error");
        return;
      }

      openEmailDraft();
    } catch {
      openEmailDraft();
    }
  };


  const isHomePath = window.location.pathname === "/" || window.location.pathname === "/index.html";
  if (!isHomePath) {
    return (
      <>
        <BackgroundScene activeId="home" />
        <main className="not-found-page">
          <div className="not-found-card">
            <span className="section-kicker">404</span>
            <h1>{t.notFound.title}</h1>
            <p>{t.notFound.text}</p>
            <a className="btn primary" href="/">{t.notFound.action}</a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      <BackgroundScene activeId={activeId} />

      <nav className="nav" aria-label="Primary">
        <button className="logo" onClick={() => scrollTo("home")} type="button">
          eduardo<b>.</b>dev
        </button>
        <button className={`nav-stack ${activeId === "stack" ? "active" : ""}`} onClick={() => scrollTo("stack")} type="button">{t.nav.stack}</button>
        <button className={`nav-projects ${activeId === "projects" ? "active" : ""}`} onClick={() => scrollTo("projects")} type="button">{t.nav.projects}</button>
        <button className={`nav-about ${activeId === "about" ? "active" : ""}`} onClick={() => scrollTo("about")} type="button">{t.nav.about}</button>
        <button className={`nav-contact ${activeId === "contact" ? "active" : ""}`} onClick={() => scrollTo("contact")} type="button">{t.nav.contact}</button>
        <button className="lang-switch" onClick={() => setLang((current) => current === "en" ? "es" : "en")} type="button" aria-label="Switch language">
          {lang === "en" ? "ES" : "EN"}
        </button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="wrap">
            <div className="hero-copy">
              <p className="hello hero-in" style={{ animationDelay: ".1s" }}>{t.hero.hello}</p>
              <AnimatedName />
              <p className="role hero-in" style={{ animationDelay: "1s" }}>
                {t.hero.rolePrefix} <span className="typed">{typedText}</span><span className="cursor" aria-hidden="true" />
              </p>
              <p className="lead hero-in" style={{ animationDelay: "1.1s" }}>{t.hero.lead}</p>
              <div className="availability hero-in" style={{ animationDelay: "1.16s" }}>
                <span className="availability-dot" aria-hidden="true" />
                <span>{t.hero.availability}</span>
              </div>
              <div className="cta-row hero-in" style={{ animationDelay: "1.2s" }}>
                <button className="btn primary magnetic" type="button" onClick={() => scrollTo("projects")}>{t.hero.projects}</button>
                <a className="btn magnetic resume-btn" href={site.resume} download="Eduardo_De_La_Cruz_Resume.pdf">{t.hero.resume} ↓</a>
                <button className="btn magnetic" type="button" onClick={() => scrollTo("contact")}>{t.hero.contact}</button>
              </div>
            </div>
          </div>
          <div className="scroll-cue hero-in" style={{ animationDelay: "1.5s" }}><span>{t.hero.scroll}</span><i /></div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span className={index % 3 === 0 ? "fill" : ""} key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="capabilities-section" aria-labelledby="capabilities-title">
          <div className="wrap">
            <span className="section-kicker reveal">{t.capabilities.eyebrow}</span>
            <h2 className="reveal d1" id="capabilities-title">{t.capabilities.title}</h2>
            <div className="capabilities-grid">
              {t.capabilities.items.map((item, index) => (
                <article className={`capability-item reveal d${Math.min(index, 3)}`} key={item.title}>
                  <span className="capability-number">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="stack">
          <div className="wrap">
            <h2 className="reveal">{t.stack.title}</h2>
            <p className="lead reveal d1 section-lead">{t.stack.lead}</p>
            <div className="stack-grid">
              {t.stack.groups.map((group, index) => (
                <div className={`panel tilt reveal d${Math.min(index, 3)}`} data-tilt key={group.title}>
                  <div className={`icon ${group.className}`}>{group.icon}</div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <h2 className="reveal">{t.projects.title}</h2>
            <p className="lead reveal d1 section-lead">{t.projects.lead}</p>
            <div className="projects">
              {t.projects.items.map((project, index) => (
                <article className={`card reveal ${index % 2 ? "d1" : ""} ${index === 0 ? "featured-card" : ""}`} key={project.id}>
                  <div className="panel tilt project-panel" data-tilt>
                    <ProjectVisual type={project.visual} />
                    <div className="card-body">
                      <span className="project-category">{project.category}</span>
                      <div className="project-heading-row">
                        <h3>{project.title}</h3>
                        <span className="project-index">0{index + 1}</span>
                      </div>
                      <p>{project.description}</p>
                      <div className="chips">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                      {project.disclaimer ? <p className="project-note">{project.disclaimer}</p> : null}
                      <div className="links">
                        <button className="project-explore" type="button" onClick={() => setSelectedProject(project)}>{t.projects.explore} →</button>
                        {project.caseStudy ? <a href={project.caseStudy} target="_blank" rel="noopener noreferrer">{t.projects.caseStudy}</a> : null}
                        {project.live ? <a href={project.live} target="_blank" rel="noopener noreferrer">{t.projects.viewLive}</a> : null}
                        {project.github ? <a href={project.github} target="_blank" rel="noopener noreferrer">{t.projects.viewCode}</a> : null}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <a className="more-projects reveal" href={site.github} target="_blank" rel="noopener noreferrer">{t.projects.more} ↗</a>
          </div>
        </section>

        <section id="about">
          <div className="wrap about-grid">
            <div>
              <h2 className="reveal">{t.about.title}</h2>
              <div className="about-text reveal d1">
                {t.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="stats reveal d2">
                {t.about.stats.map((stat) => (
                  <div className="stat" key={stat.value}><b>{stat.value}</b><span>{stat.label}</span></div>
                ))}
              </div>
            </div>
            <ol className="timeline" aria-label="Experience timeline">
              {t.about.timeline.map((item, index) => (
                <li className={`reveal ${index === 0 ? "on" : ""}`} key={`${item.time}-${item.title}`}>
                  <time>{item.time}</time>
                  <h3>{item.title}</h3>
                  <div className="where">{item.where}</div>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap">
            <div className="contact-layout">
              <div className="contact-copy">
                <h2 className="reveal">{t.contact.title}</h2>
                <p className="lead reveal d1">{t.contact.lead}</p>
                <a className="mail reveal d2" href={`mailto:${site.email}`}>{site.email}</a>
                <div className="cta-row reveal d3">
                  <button className="btn primary magnetic" type="button" onClick={copyEmail}>{copied ? t.contact.copied : t.contact.copy}</button>
                  <a className="btn magnetic" href={site.github} target="_blank" rel="noopener noreferrer">{t.contact.github}</a>
                  <a className="btn magnetic" href={site.linkedin} target="_blank" rel="noopener noreferrer">{t.contact.linkedin}</a>
                  <a className="btn magnetic" href={site.whatsapp} target="_blank" rel="noopener noreferrer">{t.contact.whatsapp}</a>
                  <a className="btn magnetic resume-btn" href={site.resume} download="Eduardo_De_La_Cruz_Resume.pdf">{t.hero.resume} ↓</a>
                </div>
              </div>

              <form className="contact-form reveal d1" onSubmit={submitContact}>
                <label>
                  <span>{t.contact.form.name}</span>
                  <input required minLength={2} maxLength={100} autoComplete="name" value={contactForm.name} onChange={(event) => setContactForm((current) => ({ ...current, name: event.target.value }))} />
                </label>
                <label>
                  <span>{t.contact.form.email}</span>
                  <input required type="email" maxLength={120} autoComplete="email" value={contactForm.email} onChange={(event) => setContactForm((current) => ({ ...current, email: event.target.value }))} />
                </label>
                <label>
                  <span>{t.contact.form.type}</span>
                  <select required value={contactForm.type} onChange={(event) => setContactForm((current) => ({ ...current, type: event.target.value }))}>
                    <option value="" disabled>—</option>
                    {t.contact.form.options.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
                <label>
                  <span>{t.contact.form.message}</span>
                  <textarea required minLength={5} maxLength={4000} rows={5} value={contactForm.message} onChange={(event) => setContactForm((current) => ({ ...current, message: event.target.value }))} />
                </label>
                <button className="btn primary" type="submit" disabled={contactStatus === "sending"}>
                  {contactStatus === "sending" ? t.contact.form.sending : t.contact.form.submit}
                </button>
                <small aria-live="polite" className={`contact-status ${contactStatus}`}>
                  {contactStatus === "sent"
                    ? t.contact.form.sent
                    : contactStatus === "fallback"
                      ? t.contact.form.fallback
                      : contactStatus === "error"
                        ? t.contact.form.error
                        : t.contact.form.note}
                </small>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© 2026 {site.name}. {t.footer}.</span>
          <button type="button" onClick={() => scrollTo("home")}>{lang === "en" ? "Back to top" : "Volver arriba"}</button>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        labels={{
          close: t.projects.close,
          overview: t.projects.overview,
          gallery: t.projects.gallery,
          highlights: t.projects.highlights,
          role: t.projects.role,
          proof: t.projects.proof,
          repository: t.projects.repository,
          viewCode: t.projects.viewCode,
          viewLive: t.projects.viewLive,
          caseStudy: t.projects.caseStudy,
        }}
        onClose={closeProject}
      />
    </>
  );
}

export default App;
