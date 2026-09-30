import type { Locale, LocaleContent } from "../types/index.ts";
import { en } from "./en.ts";
import { es } from "./es.ts";


export const locales: Record<Locale, LocaleContent> = {
  en,
  es,
};

export const defaultLocale: Locale = "en";

export function getLocaleContent(locale: Locale): LocaleContent {
  return locales[locale] || locales[defaultLocale];
}

export { en, es };
