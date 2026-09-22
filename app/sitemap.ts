import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${site.url}/${lang}/`,
    changeFrequency: "monthly",
    priority: lang === "fr" ? 1 : 0.9,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}/`])) },
  }));
}
