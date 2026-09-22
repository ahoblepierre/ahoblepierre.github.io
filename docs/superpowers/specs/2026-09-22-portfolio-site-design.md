# Portfolio site — design

Date: 2026-09-22

## Goal

Turn the "Portfolio Simon Pierre AHOBLE v2" mockup into a real, maintainable, bilingual website
hosted for free on GitHub Pages.

## Decisions

- **Next.js 16, static export** (`output: "export"`, `trailingSlash: true`): no server; `out/` is published.
- **Tailwind CSS v4**, with the mockup's colors/fonts as theme tokens (`app/globals.css`).
  Dark is the default theme; light is `html[data-theme="light"]`, saved in localStorage.
- **Bilingual routes** `/fr/` and `/en/` via `app/[lang]` (root layout under the dynamic segment),
  pre-rendered with `generateStaticParams`. `/` redirects in the browser: saved choice → browser language → French.
  Each page has its own `lang`, title, description, canonical and hreflang alternates.
- **Content separated from code**: `content/fr.ts` and `content/en.ts` both satisfy `content/types.ts`.
- **Motion** for animation: scroll reveals, staggered lists, hero entrance, parallax portrait and project photos,
  reading-progress bar, animated language pill. `MotionConfig reducedMotion="user"` honors the OS setting.
- **Contact form** posts to Web3Forms; the access key comes from the `WEB3FORMS_KEY` repository secret at build.
  Without a key it falls back to `mailto:`.
- **CV download** is hidden until a PDF path is set in `content/site.ts`.
- **404**: `app/global-not-found.tsx` (experimental `globalNotFound`), bilingual, emitted as `404.html`.
- **Deploy**: GitHub Actions → `actions/deploy-pages` on every push to `main`.

## Differences from the mockup

- "How I work" step titles are translated in the French page.
- The "Languages" row (a placeholder in the mockup) is omitted until the information is available.
- The footer's placeholder note became a simple photo credit.

## Open items (content, not code)

- CV as PDF.
- Real project screenshots to replace the Unsplash placeholders.
- Web3Forms access key.
