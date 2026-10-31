import { en } from "./en";
import type { Locale } from "./site";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export * from "./site";
export type * from "./types";
