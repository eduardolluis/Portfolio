import { useCallback, useState } from "react";
import { BackgroundScene } from "./BackgroundScene";
import { PortfolioFooter } from "./PortfolioFooter";
import { PortfolioNav } from "./PortfolioNav";
import { ProjectModal } from "./ProjectModal";
import { AboutSection } from "./sections/AboutSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { Marquee } from "./sections/Marquee";
import { ProjectsSection } from "./sections/ProjectsSection";
import { StackSection } from "./sections/StackSection";
import { type Lang, type LocaleContent, type Project } from "../data/content";
import { useContactForm } from "../hooks/useContactForm";

type PortfolioPageProps = {
  lang: Lang;
  t: LocaleContent;
  activeId: string;
  marqueeItems: string[];
  scrollTo: (id: string) => void;
  typedText: string;
  onToggleLanguage: () => void;
};

export function PortfolioPage({
  lang,
  t,
  activeId,
  marqueeItems,
  scrollTo,
  typedText,
  onToggleLanguage,
}: PortfolioPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const contact = useContactForm(lang);

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      <BackgroundScene activeId={activeId} />

      <PortfolioNav
        lang={lang}
        t={t}
        activeId={activeId}
        scrollTo={scrollTo}
        onToggleLanguage={onToggleLanguage}
      />

      <main>
        <HeroSection t={t} typedText={typedText} scrollTo={scrollTo} />
        <Marquee items={marqueeItems} />
        <CapabilitiesSection t={t} />
        <StackSection t={t} />
        <ProjectsSection t={t} onSelectProject={setSelectedProject} />
        <AboutSection t={t} />
        <ContactSection t={t} {...contact} />
      </main>

      <PortfolioFooter lang={lang} t={t} scrollTo={scrollTo} />

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
