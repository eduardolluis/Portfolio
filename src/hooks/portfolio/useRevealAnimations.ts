import { useEffect } from "react";
import type { Lang } from "../../data/content";

export function useRevealAnimations(lang: Lang) {
  useEffect(() => {
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );
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
}
