import { useEffect } from "react";

export function usePremiumMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    const root = document.documentElement;
    const nav = document.querySelector<HTMLElement>(".nav");
    const showcase = document.querySelector<HTMLElement>(".hero-showcase");
    const motionSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion-section]"),
    );

    let scrollFrame = 0;
    const updateScroll = () => {
      scrollFrame = 0;
      const viewportHeight = Math.max(1, window.innerHeight);
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - viewportHeight,
      );
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      // Read layout first, then write styles. This avoids repeated layout flushes.
      const sectionProgress = motionSections.map((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < -viewportHeight * 0.25 || rect.top > viewportHeight * 1.25) {
          return null;
        }
        const travel = rect.height + viewportHeight;
        return Math.min(1, Math.max(0, (viewportHeight - rect.top) / travel));
      });

      root.style.setProperty("--page-scroll", ratio.toFixed(4));
      nav?.classList.toggle("nav-scrolled", window.scrollY > 36);

      sectionProgress.forEach((progress, index) => {
        if (progress === null) return;
        const section = motionSections[index];
        section.style.setProperty("--section-progress", progress.toFixed(4));
        section.style.setProperty(
          "--section-shift",
          `${((progress - 0.5) * 34).toFixed(2)}px`,
        );
      });
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScroll();

    let pointerFrame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let pointerRunning = false;

    const paintPointer = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      showcase?.style.setProperty("--hero-px", currentX.toFixed(3));
      showcase?.style.setProperty("--hero-py", currentY.toFixed(3));

      if (
        Math.abs(targetX - currentX) > 0.004 ||
        Math.abs(targetY - currentY) > 0.004
      ) {
        pointerFrame = requestAnimationFrame(paintPointer);
      } else {
        pointerRunning = false;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer || reduceMotion || window.scrollY > window.innerHeight * 1.1) return;
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!pointerRunning) {
        pointerRunning = true;
        pointerFrame = requestAnimationFrame(paintPointer);
      }
    };

    if (finePointer && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const timelineItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-timeline-item]"),
    );
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timelineItems.forEach((item) => item.classList.remove("is-active"));
            (entry.target as HTMLElement).classList.add("is-active");
          }
        });
      },
      { rootMargin: "-32% 0px -48% 0px", threshold: 0.15 },
    );
    timelineItems.forEach((item) => timelineObserver.observe(item));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      timelineObserver.disconnect();
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      root.style.removeProperty("--page-scroll");
      nav?.classList.remove("nav-scrolled");
      motionSections.forEach((section) => {
        section.style.removeProperty("--section-progress");
        section.style.removeProperty("--section-shift");
      });
    };
  }, []);
}
