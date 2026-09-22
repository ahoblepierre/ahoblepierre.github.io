import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import { fr } from "./fr";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];

export type { Dictionary };
