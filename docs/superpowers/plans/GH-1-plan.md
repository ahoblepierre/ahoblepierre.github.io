# GH-1 Material 3 Expressive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the bilingual portfolio in Material 3 Expressive: an Android-app look on phones, an M3 website on desktop, and a palette the visitor picks from 4 seed colours (lime by default).

**Architecture:** The palettes are generated ahead of time from 4 seeds with `@material/material-color-utilities` (`SchemeFidelity`) into a committed CSS file of `--md-sys-color-*` variables, keyed by `html[data-seed]` × `html[data-theme]`. Tailwind v4 maps those roles plus the M3 type, shape and motion tokens. The components are restyled in place. The old token names (`--ink`, `--accent`…) stay as temporary aliases of the M3 roles so the site works at every commit, and the last task removes them.

**Tech Stack:** Next.js 16 (static export), React 19, Tailwind CSS v4, Motion 13, `@material/material-color-utilities` (devDependency only), `node --test` (Node 20).

**Spec:** `docs/superpowers/specs/GH-1-spec.md`. Read it before starting. The M3 reference is https://github.com/hamen/material-3-skill (`skills/material-3/SKILL.md`, `references/`).

## Global Constraints

- Branch `feat/GH-1-material-3-expressive`. Every commit message ends with `(GH-1)`. One PR to `main` at the end; never push to `main`.
- Read the relevant guide in `node_modules/next/dist/docs/` before using any Next API (`AGENTS.md`).
- No runtime UI library (no MUI, no `@material/web`). `@material/material-color-utilities` is a **devDependency** and is never imported by app code.
- `content/` is frozen, except new labels added to **both** `content/fr.ts` and `content/en.ts` (plus `content/types.ts`).
- Seeds: `lime` `#cbf547` (default), `blue`, `violet`, `orange` (exact hex values are the builder's call: saturated and distinct).
- Dark is the default theme; light is `html[data-theme="light"]`. The seed is `html[data-seed]`; with no attribute or an unknown value, the page renders lime.
- Size classes: compact < 600px, medium 600–839px, expanded 840–1199px, large 1200–1599px, extra-large ≥ 1600px.
- Shape tokens (px): none 0, extra-small 4, small 8, medium 12, large 16, large-increased 20, extra-large 28, extra-large-increased 32, extra-extra-large 48, full 9999.
- State layers: hover 8 %, focus 10 %, pressed 10 % of the matching `on-*` colour. The focus ring stays visible.
- Font: Roboto Flex only, via `next/font/google`. Bricolage, Instrument Sans and JetBrains Mono are removed by the end.
- Keep working: FR/EN switch, Web3Forms form and its `mailto:` fallback, the CV download (`CvLink`), GoatCounter, the 404 page, `MotionConfig reducedMotion="user"`.
- Verification commands for every task: `npx tsc --noEmit`, `npm run lint` and `npm run build`, all clean. For UI tasks, also screenshots with the Playwright MCP of `npm run dev` at 390×844, 800×1000 and 1440×900, in dark and light.

## Review Focus

1. **Unknown or stale seed in `localStorage`** (old value, hand-edited): the page must render lime, not a palette-less page. Covered in Task 1 (`:root` holds lime) and Task 2 (the theme script allow-list).
2. **`localStorage` unavailable** (private mode, blocked): the colour and theme pickers still work for the current page view, without errors. Covered in Task 4.
3. **Anchors and the fixed bottom bar on phones**: jumping to `#contact` or `#experience` must not hide the heading under the top bar, and the last content (form submit button, footer) must not sit under the navigation bar or the FAB. Covered in Task 5.
4. **Light mode with the lime seed**: the text and buttons on `primary`/`primary-container` must meet 4.5:1, since lime on white is the riskiest pair. Covered in Task 1 (contrast test over all 8 combinations).
5. **Keyboard and reduced motion**: the colour menu opens and closes with Enter/Escape and keeps focus, the nav destinations are reachable with Tab and show the focus ring, and with `prefers-reduced-motion` the springs and shape morphs don't animate. Covered in Tasks 4 and 5.

---

### Task 1: Palette generation

**Files:**
- Create: `lib/m3-seeds.json`, `scripts/generate-palettes.mjs`, `scripts/generate-palettes.test.mjs`, `app/m3-palettes.css` (generated, committed)
- Modify: `package.json` (devDependency plus scripts `"palettes": "node scripts/generate-palettes.mjs"` and `"test": "node --test scripts/"`)

**Interfaces:**
- Produces:
  - `lib/m3-seeds.json`: `[{ "id": "lime", "hex": "#cbf547" }, { "id": "blue", … }, { "id": "violet", … }, { "id": "orange", … }]`, with lime first (the default).
  - `scripts/generate-palettes.mjs` exports `buildPalettes(seeds) -> { [id]: { dark: Record<role, "#rrggbb">, light: Record<role, "#rrggbb"> } }` and `toCss(palettes) -> string`. Run directly, it writes `app/m3-palettes.css`.
  - CSS selectors: `:root, html[data-seed="lime"]` (dark lime), `html[data-theme="light"], html[data-seed="lime"][data-theme="light"]` (light lime), then `html[data-seed="<id>"]` and `html[data-seed="<id>"][data-theme="light"]` for the other seeds.
  - Variables `--md-sys-color-<role>` with kebab-case roles: `primary on-primary primary-container on-primary-container secondary on-secondary secondary-container on-secondary-container tertiary on-tertiary tertiary-container on-tertiary-container error on-error error-container on-error-container surface on-surface surface-variant on-surface-variant surface-container-lowest surface-container-low surface-container surface-container-high surface-container-highest inverse-surface inverse-on-surface inverse-primary outline outline-variant scrim`.

- [ ] **Step 1: Install** `npm i -D @material/material-color-utilities` and read its exported API in `node_modules` (`SchemeFidelity`, `Hct`, `MaterialDynamicColors`, `argbFromHex`, `hexFromArgb`). Version 0.4.x may expose the dynamic colours as instance members; follow what is installed.
- [ ] **Step 2: Write failing tests** in `scripts/generate-palettes.test.mjs` (`node:test` + `node:assert/strict`):
  - `every seed has dark and light with all 32 roles as #rrggbb`
  - `lime dark primary keeps the seed hue`: the HCT hue of `palettes.lime.dark.primary` is within 15° of the HCT hue of `#cbf547`.
  - `on-* pairs reach 4.5:1 in all 8 combinations`: for each seed × mode and each of primary, primary-container, secondary-container, tertiary-container, error and surface, `contrast(on-X, X) >= 4.5`, using the WCAG relative luminance formula written in the test.
  - `toCss puts lime on :root`: the CSS contains `:root, html[data-seed="lime"] {` and `--md-sys-color-primary:`.
- [ ] **Step 3: Run** `npm test`. Expected: FAIL (module missing).
- [ ] **Step 4: Implement** `scripts/generate-palettes.mjs` with `new SchemeFidelity(Hct.fromInt(argbFromHex(hex)), isDark, 0)`. If a contrast pair fails, raise `contrastLevel` for that mode (0.5 then 1.0) rather than hand-editing colours.
- [ ] **Step 5: Run** `npm test` (PASS), then `npm run palettes`. Check that `app/m3-palettes.css` has 8 blocks.
- [ ] **Step 6: Commit** `Generate M3 palettes for 4 seed colours (GH-1)`.

### Task 2: M3 foundation tokens, font and theme script

**Files:**
- Modify: `app/globals.css`, `lib/fonts.ts`, `lib/theme-script.ts`, `lib/i18n.ts`, `app/[lang]/layout.tsx` (viewport), `app/global-not-found.tsx` (imports)

**Interfaces:**
- Consumes: `app/m3-palettes.css` and `lib/m3-seeds.json` (Task 1).
- Produces:
  - Tailwind colours `primary, on-primary, primary-container, …` (all Task 1 roles, under the same names) via `@theme inline { --color-<role>: var(--md-sys-color-<role>); }`.
  - Legacy aliases, kept until Task 7: `--ink → surface`, `--panel → surface-container-low`, `--panel-2 → surface-container-high`, `--line → outline-variant`, `--line-strong → outline`, `--accent → primary`, `--accent-ink → primary`, `--accent-hover → primary` (90 % mix with on-primary), `--accent-deep → primary-container`, `--text → on-surface`, `--text-2 → on-surface-variant`, `--text-3 → outline`, and `--color-on-accent → on-primary`.
  - Type utilities `type-display-l|m|s`, `type-headline-l|m|s`, `type-title-l|m|s`, `type-body-l|m|s`, `type-label-l|m|s`, each with the M3 baseline size, line height, weight and tracking from the skill's `references/typography-and-shape.md`. Add `type-display-l-emph` and `type-headline-l-emph` for the Expressive emphasized weight.
  - Radius tokens `--radius-xs|sm|md|lg|lg-plus|xl|xl-plus|2xl|full` with the Global Constraints values (`rounded-xl` = 28px and so on).
  - Utility `state-layer`: `position:relative` plus a `::before` filled with `currentColor` at opacity 0, then .08 on `:hover`, .10 on `:focus-visible` and `:active`.
  - CSS easing variables `--md-motion-emphasized`, `--md-motion-standard` (values from SKILL.md, section Motion), and `export const SPRING = { type: "spring", stiffness: 500, damping: 30 }` plus `EASE_EMPHASIZED` in `components/motion.tsx` (`EASE` becomes the emphasized curve).
  - Breakpoints `--breakpoint-md: 37.5rem` (600), `--breakpoint-lg: 52.5rem` (840), `--breakpoint-xl: 75rem` (1200), `--breakpoint-2xl: 100rem` (1600).
  - `lib/i18n.ts`: `SEED_STORAGE_KEY = "ahoble-portfolio-seed"`.
  - `lib/fonts.ts`: Roboto Flex with variable `--font-roboto-flex`. Keep the old three fonts loaded until Task 7. `--font-display`, `--font-body` and `--font-mono` all point to Roboto Flex from this task on.

- [ ] **Step 1:** Import `./m3-palettes.css` in `globals.css`, replace the hand-written `:root` and `html[data-theme="light"]` colour blocks with the aliases, and add the tokens and utilities above.
- [ ] **Step 2:** Extend `themeScript` so it also reads `SEED_STORAGE_KEY` and sets `data-seed` **only** when the value is one of the ids in `lib/m3-seeds.json`, inside the existing try/catch.
- [ ] **Step 3:** Set `viewport.themeColor` in `app/[lang]/layout.tsx` to the lime dark `surface` value from `app/m3-palettes.css`.
- [ ] **Step 4: Verify** with tsc, lint and build. In the dev server, set `localStorage["ahoble-portfolio-seed"]="nope"` and reload: the page renders lime. Set `"blue"` and reload: blue, with no flash of lime. Take screenshots: the layout is unchanged, with M3 colours and Roboto Flex everywhere.
- [ ] **Step 5: Commit** `Add M3 tokens, Roboto Flex and seed-aware theme script (GH-1)`.

### Task 3: M3 primitives and icons

**Files:**
- Create: `components/m3.tsx`
- Modify: `components/icons.tsx`

**Interfaces:**
- Produces (in `components/m3.tsx`, a `"use client"` file because of Motion):
  - `Button({ variant: "filled" | "tonal" | "outlined" | "text", href?: string, icon?: ReactNode, type?, onClick?, className?, children })`. It renders `<motion.a>` when there is an `href`, otherwise `<motion.button>`. Height 40px, `rounded-full`, `type-label-l`, `state-layer`. The Expressive press goes `whileTap={{ borderRadius: 12 }}` with `SPRING`.
  - `Fab({ href, label, icon, extended?: boolean, className? })`: 56px, `rounded-lg` (16px), `bg-primary-container text-on-primary-container`, shadow level 3, with press morph to 12px. `extended` shows the label next to the icon.
  - `IconButton({ label, onClick?, children, className?, …aria })`: a 40px circle with `aria-label={label}` and `title={label}`.
  - `Chip({ children })`: a static 32px assist-style chip, `rounded-sm`, `border border-outline-variant`, `type-label-l`.
  - `Card({ variant: "filled" | "elevated" | "outlined", className?, children })`: `rounded-xl` (28px), filled = `bg-surface-container-highest`, elevated = `bg-surface-container-low` plus a level-1 shadow, outlined = `border-outline-variant`.
- Icons added to `components/icons.tsx` (24px Material Symbols Rounded paths, same `P` props as the existing ones): `WorkIcon`, `StackIcon` (code), `PersonIcon`, `HistoryIcon` (CV/experience), `PaletteIcon`, `CheckIcon`, `ArrowForwardIcon`. `MailIcon` and `DownloadIcon` are kept.

- [ ] **Step 1:** Implement the primitives and icons. Nothing uses them yet.
- [ ] **Step 2: Verify:** tsc, lint and build are clean.
- [ ] **Step 3: Commit** `Add M3 primitives and Material Symbols icons (GH-1)`.

### Task 4: Top app bar and colour picker

**Files:**
- Modify: `components/header.tsx`, `components/header-controls.tsx`, `content/types.ts`, `content/fr.ts`, `content/en.ts`

**Interfaces:**
- Consumes: `IconButton`, `Button`, `PaletteIcon`, `CheckIcon` (Task 3), `SEED_STORAGE_KEY` and `lib/m3-seeds.json` (Tasks 1–2).
- Produces:
  - `SeedPicker({ label, names }: { label: string; names: Record<string, string> })` in `header-controls.tsx`.
  - New labels `t.nav.pickColor` (FR « Couleur du thème », EN "Theme colour") and `t.nav.colors: { lime, blue, violet, orange }` (FR Citron/Bleu/Violet/Orange, EN Lime/Blue/Violet/Orange).

- [ ] **Step 1:** Restyle `Header` as an M3 top app bar, 64px high. The background is `bg-surface`, and once `window.scrollY > 0` it switches to `bg-surface-container` (a passive scroll listener in a client wrapper, or toggle a `data-scrolled` attribute). Its contents are the logo, the `md`–`xl` links (`type-label-l` text buttons, no more uppercase mono), then `SeedPicker`, `ThemeToggle` (as an `IconButton`) and `LangSwitch` (an M3 segmented-style pill with the existing `layoutId` animation). It also holds a tonal or filled "Contact" `Button`, shown only from `md` up to below `xl`. On compact, the right side keeps only the picker, theme and language.
- [ ] **Step 2:** Implement `SeedPicker`. An `IconButton` with `aria-haspopup="menu"` and `aria-expanded` opens a `role="menu"` surface (`bg-surface-container`, `rounded-lg`, level-2 shadow). It holds 4 `role="menuitemradio"` swatches, each a 40px circle filled with the seed hex, with `aria-checked`, the colour's name as an accessible name, and a `CheckIcon` on the active one. Choosing a swatch sets `document.documentElement.dataset.seed` and writes localStorage inside try/catch, then closes the menu and returns focus to the button. Escape and a click outside close it too. Arrow Up/Down move focus between the swatches. On mount, read the current seed from `document.documentElement.dataset.seed ?? "lime"`.
- [ ] **Step 3: Verify:** tsc, lint, build and screenshots. Then, by hand in the dev server: switch through the 4 colours in dark and light; operate it with the keyboard only (Tab, Enter, Arrows, Escape); then run `Object.defineProperty(window, "localStorage", { get() { throw new Error() } })` in the console and pick a colour. The page recolours and nothing appears in the console.
- [ ] **Step 4: Commit** `M3 top app bar and seed colour picker (GH-1)`.

### Task 5: Adaptive navigation (navigation bar, rail, FABs)

**Files:**
- Modify: `components/header.tsx`, `components/header-controls.tsx`, `app/[lang]/page.tsx` (content offset on large screens), `app/globals.css` (scroll padding)

**Interfaces:**
- Consumes: `Fab`, `WorkIcon`, `StackIcon`, `PersonIcon`, `HistoryIcon`, `MailIcon` (Task 3).
- Produces:
  - `useActiveSection(ids: string[]): string | null`: the IntersectionObserver logic moved out of the current `SectionRail` unchanged.
  - `NavigationBar({ items, label })`: compact only (`md:hidden`).
  - `NavigationRail({ items, label, contact })`: `xl` and up. It replaces `SectionRail`, which is deleted.
  - `items` is `{ id, label, icon }[]` for the destinations `work`, `stack`, `about`, `experience`, with labels `t.nav.work`, `t.nav.stack`, `t.nav.about` and `t.nav.cv`. Contact is not a destination.

- [ ] **Step 1:** `NavigationBar`: fixed at the bottom, 80px high, full width, `bg-surface-container`. Each item is an icon above a `type-label-m` label. The active item gets a 64×32 `bg-secondary-container` pill behind its icon, animated with `layoutId="nav-indicator"` and `SPRING`, and `aria-current="true"`. Add `env(safe-area-inset-bottom)` padding.
- [ ] **Step 2:** `NavigationRail`: fixed on the left, 96px wide, full height, `bg-surface`. A `Fab` for Contact (`href="#contact"`, `MailIcon`) sits at the top, then the destinations stacked vertically (icon, pill indicator and label), centred.
- [ ] **Step 3:** Add the compact `Fab` for Contact: fixed `bottom: 80px + 16px`, `right: 16px`, `md:hidden`. From `md` to below `xl`, neither the bar nor the FAB shows (the top bar's Contact button covers it).
- [ ] **Step 4:** Handle the layout. On `xl` and up, the page content gets `padding-left: 96px` and stays centred in the remaining width. Below `md`, the body gets `padding-bottom` equal to the bar height plus the safe area. Set `html { scroll-padding-top: 72px }` and remove the per-section `scroll-mt-24`. The page side margins are 16px below `md` and 24px from `md` up (they replace `px-[clamp(18px,4vw,56px)]`).
- [ ] **Step 5: Verify:** tsc, lint, build and screenshots at the 3 sizes. At 390px, tap each destination: the section heading shows below the top bar and the indicator moves to it. Scroll to the bottom: the form's submit button and the footer are fully visible above the bar, and the FAB doesn't cover the submit button (if it does, hide the FAB while `#contact` is the active section). At 1440px: the rail shows, the content isn't covered, and the FAB's link reaches `#contact`. Tab through the nav: the focus ring is visible on every item.
- [ ] **Step 6: Commit** `Adaptive M3 navigation: bar, rail and FABs (GH-1)`.

### Task 6: Sections, part 1 (hero, work, build and method)

**Files:**
- Modify: `components/sections/hero.tsx`, `components/hero-title.tsx`, `components/sections/work.tsx`, `components/sections/build-and-method.tsx`, `components/motion.tsx` (`PhoneShowcase`, if its frames use the old tokens), `components/illustrations.tsx`, `components/ui.tsx`

- [ ] **Step 1: Hero.** The title uses `type-display-l-emph` (scaled down on compact) and the typed word is in `text-primary`. The CTAs are a `Button` "filled" for contact and a `CvLink` styled as a "tonal" button (keep `CvLink` as the element and pass the tonal classes through `className`, so the download tracking stays intact). The portrait sits in an `rounded-2xl` (48px) shape. Replace the kicker and eyebrows with `type-label-l text-primary`.
- [ ] **Step 2: Work.** Each project is a `Card` (filled), with the screens or illustration inside a `rounded-xl` inner surface, the title in `type-headline-m`, the tags as `Chip`s and the links as `Button` "text" or "outlined". Retint `.tint::before` with `var(--md-sys-color-primary)`. The illustrations (`ScheduleArt`, `ExchangeArt`) only use M3 role variables (`primary`, `secondary-container`, `surface-container-*`, `on-surface*`), never hard-coded colours or old tokens.
- [ ] **Step 3: Build and method.** Use cards in a responsive grid (1 column below `md`, 2 from `md`, 3 or 4 from `lg` as the content fits). `Counter` in `ui.tsx` becomes `type-label-l text-primary` without mono, and `underlineLink` uses `primary`.
- [ ] **Step 4: Verify:** tsc, lint, build and screenshots at the 3 sizes × 2 themes × 2 seeds (lime and violet). Running `grep -nE "font-mono|eyebrow|label-mono|accent|panel|ink\b|fg-" ` on these files returns nothing.
- [ ] **Step 5: Commit** `M3 Expressive hero, work and method sections (GH-1)`.

### Task 7: Sections, part 2, and removal of the legacy tokens

**Files:**
- Modify: `components/sections/stack-and-about.tsx`, `components/sections/experience.tsx`, `components/sections/contact.tsx`, `components/contact-form.tsx`, `components/sections/footer.tsx`, `app/global-not-found.tsx`, `app/(root)/*` (if styled), `app/globals.css`, `lib/fonts.ts`, `README.md`

- [ ] **Step 1: Stack and about.** The technologies become `Chip`s, the about block becomes a `Card` and the photo gets `rounded-2xl`.
- [ ] **Step 2: Experience.** Each role is an outlined `Card` or a list item with an M3 divider (`border-outline-variant`). Dates go in `type-label-l text-on-surface-variant`.
- [ ] **Step 3: Contact.** The form fields are M3 **outlined text fields**: a 56px height, `rounded-xs` (4px), `border-outline`, with a label that floats into the border on focus or when filled. Do it in CSS with `:placeholder-shown` and `placeholder=" "` so the field stays a native `<input>` with its `<label>`. The focused border is 2px `primary`, and an error shows as `error` plus helper text. The submit is a filled `Button` with `type="submit"`. Keep every behaviour of `ContactForm` (Web3Forms, `mailto:` fallback, states).
- [ ] **Step 4: Footer and 404.** Restyle both with M3 roles and type. The 404 page keeps its own document, so check it imports `globals.css` (which pulls in the palettes) and runs `themeScript`.
- [ ] **Step 5: Cleanup.** Delete the legacy aliases, the `eyebrow`, `label-mono` and old `chip` utilities, and the three old fonts. Running `grep -rnE "var\(--(ink|panel|panel-2|line|line-strong|accent|accent-ink|accent-hover|accent-deep|text|text-2|text-3)\)|font-(mono|display)|eyebrow|label-mono|on-accent|fg-[23]?\b|bg-ink|bg-panel" app components lib` returns nothing. Update the README's "Modifier le contenu" section with a short "Couleurs (Material 3)" paragraph: seeds live in `lib/m3-seeds.json`, then `npm run palettes`.
- [ ] **Step 6: Verify:** `npm test`, tsc, lint and build are clean. Take the full screenshot set (3 sizes × dark/light × lime/violet) plus the 404 page at 390px and 1440px. Run a quick a11y pass in the Playwright MCP (`browser_snapshot`): every interactive element has a name, and the landmarks are intact.
- [ ] **Step 7: Commit** `M3 Expressive remaining sections; remove legacy tokens and fonts (GH-1)`.

### Task 8: Hand-off

- [ ] **Step 1:** Push the branch and open a PR titled `Refonte Material 3 Expressive (GH-1)`, with `Closes #1` and the screenshot set in the description. Do not merge: Pierre validates it locally or from the screenshots first (spec, "Livraison et validation").
