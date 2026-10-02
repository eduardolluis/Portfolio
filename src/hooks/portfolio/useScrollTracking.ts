import { useCallback, useEffect, useState } from "react";

const sectionIds = ["home", "stack", "projects", "about", "contact"];

export function useScrollTracking() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".progress");
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progressValue =
        maxScroll > 0
          ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
          : 0;
      if (progress) progress.style.transform = `scaleX(${progressValue})`;

      const midpoint = window.innerHeight * 0.5;
      let next = sections[0]?.id ?? "home";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= midpoint) {
          next = section.id;
        }
      });
      setActiveId(next);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return { activeId, scrollTo };
}
