import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Globe } from "lucide-react";
import { siteConfig } from "../config/site";
import { Locale, LocaleContent } from "../types";

interface NavbarProps {
  locale: Locale;
  onToggleLocale: () => void;
  content: LocaleContent["nav"];
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  locale,
  onToggleLocale,
  content,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand identity */}
        <a
          href="#top"
          className="brand-link"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("top");
          }}
          aria-label="Eduardo De La Cruz - Home"
        >
          <span className="brand-monogram">{siteConfig.monogram}</span>
          <span className="brand-fullname">Eduardo De La Cruz</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li>
              <button
                type="button"
                className="nav-link"
                onClick={() => handleNavClick("work")}
              >
                {content.work}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="nav-link"
                onClick={() => handleNavClick("services")}
              >
                {content.services}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="nav-link"
                onClick={() => handleNavClick("about")}
              >
                {content.about}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="nav-link"
                onClick={() => handleNavClick("process")}
              >
                {content.process}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="nav-link"
                onClick={() => handleNavClick("contact")}
              >
                {content.contact}
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Language Switcher */}
          <button
            type="button"
            className="lang-switcher"
            onClick={onToggleLocale}
            aria-label={`Switch language to ${locale === "en" ? "Spanish" : "English"}`}
            title={`Switch to ${locale === "en" ? "Español" : "English"}`}
          >
            <Globe size={14} className="globe-icon" aria-hidden="true" />
            <span className={locale === "en" ? "active-lang" : ""}>EN</span>
            <span className="lang-sep">/</span>
            <span className={locale === "es" ? "active-lang" : ""}>ES</span>
          </button>

          {/* Desktop CTA */}
          <button
            type="button"
            className="btn btn-primary btn-navbar"
            onClick={() => handleNavClick("contact")}
          >
            <span>{content.cta}</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div
            className="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer-header">
              <span className="mobile-brand-title">Eduardo De La Cruz</span>
              <button
                type="button"
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-nav-list">
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("work")}
              >
                <span className="mobile-link-num">01</span>
                <span>{content.work}</span>
              </button>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("services")}
              >
                <span className="mobile-link-num">02</span>
                <span>{content.services}</span>
              </button>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("about")}
              >
                <span className="mobile-link-num">03</span>
                <span>{content.about}</span>
              </button>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("process")}
              >
                <span className="mobile-link-num">04</span>
                <span>{content.process}</span>
              </button>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("contact")}
              >
                <span className="mobile-link-num">05</span>
                <span>{content.contact}</span>
              </button>
            </nav>

            <div className="mobile-drawer-footer">
              <button
                type="button"
                className="mobile-lang-btn"
                onClick={() => {
                  onToggleLocale();
                }}
              >
                <Globe size={16} />
                <span>{locale === "en" ? "ES" : "EN"}</span>
              </button>

              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => handleNavClick("contact")}
              >
                <span>{content.cta}</span>
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
