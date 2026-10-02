import { useEffect } from "react";
import type { Lang } from "../../data/content";

export function usePointerEffects(lang: Lang) {
  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduceMotion) return;

    const tiltItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt]"),
    );
    const magneticItems = Array.from(
      document.querySelectorAll<HTMLElement>(".magnetic"),
    );
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
      const leave = () => {
        element.style.transform = "";
      };
      element.addEventListener("mousemove", move);
      element.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        leave();
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
      const leave = () => {
        element.style.transform = "";
      };
      element.addEventListener("mousemove", move);
      element.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        leave();
        element.removeEventListener("mousemove", move);
        element.removeEventListener("mouseleave", leave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [lang]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const glow = document.querySelector<HTMLElement>(".glow");
    if (!glow) return;
    const move = (event: MouseEvent) => {
      glow.style.opacity = "1";
      glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
}
