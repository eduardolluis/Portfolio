import type { Lang } from "../data/content";
import { usePointerEffects } from "./portfolio/usePointerEffects";
import { usePremiumMotion } from "./portfolio/usePremiumMotion";
import { useRevealAnimations } from "./portfolio/useRevealAnimations";
import { useScrollTracking } from "./portfolio/useScrollTracking";
import { useTypedRoles } from "./portfolio/useTypedRoles";

const marqueeItems = [
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
];

export function usePortfolioEffects(lang: Lang, roles: string[]) {
  const typedText = useTypedRoles(roles);
  const { activeId, scrollTo } = useScrollTracking();

  useRevealAnimations(lang);
  usePointerEffects(lang);
  usePremiumMotion();

  return { activeId, marqueeItems, scrollTo, typedText };
}
