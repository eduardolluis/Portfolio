import React, { useState, useEffect } from "react";
import { Locale } from "./types";
import { getLocaleContent, defaultLocale } from "./locales";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Capabilities } from "./components/Capabilities";
import { FeaturedWork } from "./components/FeaturedWork";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { PrivacyModal } from "./components/PrivacyModal";
import { NotFound } from "./components/NotFound";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/portfolio.css";

export const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem("portfolio-language");
      if (saved === "es" || saved === "en") return saved;
    } catch {
      // ignore storage errors
    }
    return defaultLocale;
  });

  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  const t = getLocaleContent(locale);

  // Sync language with localStorage, html lang tag and metadata
  useEffect(() => {
    try {
      localStorage.setItem("portfolio-language", locale);
    } catch {
      // ignore storage errors
    }

    document.documentElement.lang = locale;
    document.title = t.meta.title;

    // Update meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", t.meta.description);
    }

    // Update og:title & og:description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", t.meta.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", t.meta.description);
    }
  }, [locale, t]);

  // Handle browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      if (window.location.pathname === "/privacy") {
        setPrivacyOpen(true);
      }
    };
    window.addEventListener("popstate", handlePopState);
    if (window.location.pathname === "/privacy") {
      setPrivacyOpen(true);
    }
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleToggleLocale = () => {
    setLocale((prev) => (prev === "en" ? "es" : "en"));
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenPrivacy = () => {
    setPrivacyOpen(true);
    window.history.pushState({}, "", "/privacy");
  };

  const handleClosePrivacy = () => {
    setPrivacyOpen(false);
    if (window.location.pathname === "/privacy") {
      window.history.pushState({}, "", "/");
    }
  };

  // Route: 404 handler
  if (currentPath !== "/" && currentPath !== "" && currentPath !== "/privacy") {
    return (
      <NotFound
        content={t.notFound}
        onReturnHome={() => {
          window.history.pushState({}, "", "/");
          setCurrentPath("/");
        }}
      />
    );
  }

  return (
    <div className="portfolio-app-root">
      {/* Top Navigation */}
      <Navbar
        locale={locale}
        onToggleLocale={handleToggleLocale}
        content={t.nav}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1}>
        <Hero content={t.hero} onNavigate={handleNavigate} />
        <Capabilities content={t.capabilities} />
        <FeaturedWork content={t.work} />
        <Services content={t.services} onNavigate={handleNavigate} />
        <About content={t.about} />
        <Process content={t.process} />
        <Contact content={t.contact} />
      </main>

      {/* Footer */}
      <Footer content={t.footer} onOpenPrivacy={handleOpenPrivacy} />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={privacyOpen}
        onClose={handleClosePrivacy}
        content={t.privacy}
      />
    </div>
  );
};

export default App;
