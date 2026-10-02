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
      let rect = element.getBoundingClientRect();
      let frame = 0;
      let lastEvent: MouseEvent | null = null;
      const enter = () => { rect = element.getBoundingClientRect(); };
      const paint = () => {
        frame = 0;
        const event = lastEvent;
        if (!event) return;
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        element.style.setProperty("--mx", `${x * 100}%`);
        element.style.setProperty("--my", `${y * 100}%`);
        element.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 4.5}deg) rotateY(${(x - 0.5) * 5.5}deg) translateZ(0)`;
      };
      const move = (event: MouseEvent) => {
        lastEvent = event;
        if (!frame) frame = requestAnimationFrame(paint);
      };
      const leave = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        lastEvent = null;
        element.style.transform = "";
      };
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mousemove", move, { passive: true });
      element.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        leave();
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mousemove", move);
        element.removeEventListener("mouseleave", leave);
      });
    });

    magneticItems.forEach((element) => {
      let rect = element.getBoundingClientRect();
      let frame = 0;
      let lastEvent: MouseEvent | null = null;
      const enter = () => { rect = element.getBoundingClientRect(); };
      const paint = () => {
        frame = 0;
        const event = lastEvent;
        if (!event) return;
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        element.style.transform = `translate(${dx * 0.12}px, ${dy * 0.14}px)`;
      };
      const move = (event: MouseEvent) => {
        lastEvent = event;
        if (!frame) frame = requestAnimationFrame(paint);
      };
      const leave = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        lastEvent = null;
        element.style.transform = "";
      };
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mousemove", move, { passive: true });
      element.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        leave();
        element.removeEventListener("mouseenter", enter);
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

    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      glow.style.opacity = "1";
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
