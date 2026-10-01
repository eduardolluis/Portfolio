import type { Locale, LocaleContent } from "../types/index";
import { en } from "./en";
import { es } from "./es";


export const locales: Record<Locale, LocaleContent> = {
  en,
  es,
};

export const defaultLocale: Locale = "en";

export function getLocaleContent(locale: Locale): LocaleContent {
  return locales[locale] || locales[defaultLocale];
}

export { en, es };
