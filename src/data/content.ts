import { en } from "./locales/en.ts";
import { es } from "./locales/es.ts";

export { site } from "./site.ts";
export type { Lang, Project, ProjectFact } from "./types.ts";

export const content = { en, es };

export type LocaleContent = typeof en;
