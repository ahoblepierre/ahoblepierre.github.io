export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const otherLocale = (lang: Locale): Locale => (lang === "fr" ? "en" : "fr");

// Shared with the root redirect page so the visitor's last choice sticks.
export const LANG_STORAGE_KEY = "ahoble-portfolio-lang";
export const THEME_STORAGE_KEY = "ahoble-portfolio-theme";
