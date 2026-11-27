import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { LangSwitch, NavigationBar, NavigationRail, ScrollFlag, SeedPicker, ThemeToggle } from "./header-controls";
import { HistoryIcon, MailIcon, PersonIcon, StackIcon, WorkIcon } from "./icons";
import { Button, Fab } from "./m3";

export function Header({ t, lang }: { t: Dictionary; lang: Locale }) {
  const barLinks = [
    { id: "work", label: t.nav.work },
    { id: "about", label: t.nav.about },
    { id: "stack", label: t.nav.stack },
    { id: "experience", label: t.nav.cv },
  ];
  // Order follows the page; Contact is the FAB, not a destination.
  const destinations = [
    { id: "work", label: t.nav.work, icon: <WorkIcon size={22} /> },
    { id: "stack", label: t.nav.stack, icon: <StackIcon size={22} /> },
    { id: "about", label: t.nav.about, icon: <PersonIcon size={22} /> },
    { id: "experience", label: t.nav.cv, icon: <HistoryIcon size={22} /> },
  ];
  const fab = <Fab href="#contact" label={t.nav.contact} icon={<MailIcon size={22} />} />;

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
        <nav className="mr-2 hidden gap-1 md:flex xl:hidden">
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

      <NavigationRail items={destinations} label={t.nav.sections} contact={fab} />
      <NavigationBar items={destinations} label={t.nav.sections} contact={fab} />
    </>
  );
}
