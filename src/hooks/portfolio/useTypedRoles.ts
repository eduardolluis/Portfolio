import { useEffect, useState } from "react";

export function useTypedRoles(roles: string[]) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (roles.length === 0) {
      setTypedText("");
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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

  return typedText;
}
