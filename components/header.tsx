import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { LangSwitch, ScrollFlag, SectionRail, SeedPicker, ThemeToggle } from "./header-controls";
import { Button } from "./m3";

export function Header({ t, lang }: { t: Dictionary; lang: Locale }) {
  const barLinks = [
    { id: "work", label: t.nav.work },
    { id: "about", label: t.nav.about },
    { id: "stack", label: t.nav.stack },
    { id: "experience", label: t.nav.cv },
  ];
  // Order follows the page, used by the side rail and the mobile bar.
  const sections = [
    { id: "work", label: t.nav.work },
    { id: "stack", label: t.nav.stack },
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.cv },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {t.nav.skip}
      </a>

      <ScrollFlag />
      <header className="sticky top-0 z-40 flex h-16 items-center gap-1 bg-surface px-4 transition-colors duration-300 md:px-6 [html[data-scrolled]_&]:bg-surface-container">
        <a href="#top" className="mr-auto flex items-center gap-2.5 rounded-full px-2 py-1 text-on-surface no-underline">
          <span aria-hidden="true" className="block size-3 rounded-full bg-primary" />
          <span className="type-title-l font-semibold">Ahoble</span>
        </a>
        <nav className="mr-2 hidden gap-1 md:flex">
          {barLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="state-layer inline-flex h-10 items-center rounded-full px-3 type-label-l text-on-surface-variant no-underline"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <SeedPicker label={t.nav.pickColor} names={t.nav.colors} />
        <ThemeToggle label={t.nav.toggleTheme} />
        <LangSwitch lang={lang} label={t.nav.switchLang} />
        <div className="ml-2 hidden md:block xl:hidden">
          <Button href="#contact">{t.nav.contact}</Button>
        </div>
      </header>

      <SectionRail items={sections} label={t.nav.sections} />

      <nav
        aria-label={t.nav.sections}
        className="fixed bottom-3.5 left-1/2 z-45 flex max-w-[calc(100vw-24px)] -translate-x-1/2 gap-[3px] overflow-x-auto rounded-full border border-line bg-[color-mix(in_srgb,var(--panel-2)_94%,transparent)] p-[5px] backdrop-blur-[16px] md:hidden"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`flex-none rounded-full px-[15px] py-[9px] font-mono text-[10.5px] tracking-[.14em] uppercase no-underline ${s.id === "contact" ? "text-accent-ink" : "text-fg-2"}`}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </>
  );
}
