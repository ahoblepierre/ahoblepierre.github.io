import type { Metadata } from "next";
import { en } from "@/content/en";
import { fr } from "@/content/fr";
import { fontVariables } from "@/lib/fonts";
import { buttonClass } from "@/components/m3-styles";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Simon Pierre AHOBLE",
  robots: { index: false },
};

// Served by GitHub Pages as 404.html for any unknown URL, so it speaks both languages.
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className="mx-auto grid min-h-dvh max-w-[1400px] content-center gap-10 px-4 py-16 md:px-6">
          <div className="w-fit rounded-2xl bg-primary-container px-8 py-4 text-[clamp(96px,22vw,280px)] leading-[.9] font-bold tracking-[-.04em] text-on-primary-container [font-stretch:88%]">
            404
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {[
              { lang: "fr", t: fr.notFound },
              { lang: "en", t: en.notFound },
            ].map(({ lang, t }) => (
              <div key={lang} lang={lang}>
                <h1 className="m-0 mb-3 type-headline-l-emph text-on-surface">
                  {t.title}
                </h1>
                <p className="m-0 mb-6 type-body-l text-on-surface-variant">{t.text}</p>
                <a
                  href={`/${lang}/`}
                  className={buttonClass("filled", "h-14 px-7 type-title-m")}
                >
                  {t.back} →
                </a>
              </div>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
