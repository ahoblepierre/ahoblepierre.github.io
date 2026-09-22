import type { Metadata } from "next";
import { en } from "@/content/en";
import { fr } from "@/content/fr";
import { fontVariables } from "@/lib/fonts";
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
        <main className="mx-auto grid min-h-dvh max-w-[1400px] content-center gap-10 px-[clamp(18px,4vw,56px)] py-16">
          <div className="font-display text-[clamp(96px,22vw,280px)] leading-[.85] font-extrabold tracking-[-.05em] text-accent-ink">
            404
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {[
              { lang: "fr", t: fr.notFound },
              { lang: "en", t: en.notFound },
            ].map(({ lang, t }) => (
              <div key={lang} lang={lang}>
                <h1 className="m-0 mb-3 font-display text-[clamp(28px,3.4vw,44px)] leading-none font-extrabold tracking-[-.03em]">
                  {t.title}
                </h1>
                <p className="m-0 mb-6 text-fg-2">{t.text}</p>
                <a
                  href={`/${lang}/`}
                  className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-[15px] text-[15px] font-semibold text-on-accent no-underline transition-colors hover:bg-accent-deep"
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
