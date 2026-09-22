import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { LangSwitch, SectionRail, ThemeToggle } from "./header-controls";

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

      <header className="sticky top-0 z-40 flex items-center gap-3 bg-[color-mix(in_srgb,var(--ink)_78%,transparent)] px-[clamp(18px,4vw,56px)] py-4 backdrop-blur-[16px] sm:gap-5">
        <a href="#top" className="mr-auto flex items-center gap-2.5 text-fg no-underline">
          <span aria-hidden="true" className="block size-2.5 rounded-full bg-accent" />
          <span className="font-mono text-[12.5px] font-bold tracking-[.18em] uppercase">Ahoble</span>
        </a>
        <nav className="hidden gap-[22px] font-mono text-[11px] tracking-[.16em] uppercase md:flex">
          {barLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-fg-3 no-underline transition-colors hover:text-accent-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <ThemeToggle label={t.nav.toggleTheme} />
        <LangSwitch lang={lang} label={t.nav.switchLang} />
        <a
          href="#contact"
          className="hidden items-center rounded-full bg-accent px-5 py-[9px] font-mono text-[11px] font-bold tracking-[.14em] text-on-accent uppercase no-underline transition-colors hover:bg-accent-deep sm:inline-flex"
        >
          {t.nav.contact}
        </a>
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
