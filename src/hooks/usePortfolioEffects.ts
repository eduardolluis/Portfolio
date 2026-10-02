import { useCallback, useEffect, useMemo, useState } from "react";
import type { Lang } from "../data/content";

const sectionIds = ["home", "stack", "projects", "about", "contact"];

export function usePortfolioEffects(lang: Lang, roles: string[]) {
    const [activeId, setActiveId] = useState("home");
    const [typedText, setTypedText] = useState("");

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
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            setTypedText(roles.join(" · "));
            return;
        }

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;
        let timeoutId = 0;

        const tick = () => {
            const current = roles[roleIndex];
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
                roleIndex = (roleIndex + 1) % roles.length;
                timeoutId = window.setTimeout(tick, 220);
            }
        };

        timeoutId = window.setTimeout(tick, 900);
        return () => window.clearTimeout(timeoutId);
    }, [roles]);

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

    return { activeId, marqueeItems, scrollTo, typedText };
}
