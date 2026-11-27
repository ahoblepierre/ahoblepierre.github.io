"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { LANG_STORAGE_KEY, SEED_STORAGE_KEY, THEME_STORAGE_KEY, otherLocale, type Locale } from "@/lib/i18n";
import seeds from "@/lib/m3-seeds.json";
import { CheckIcon, MoonIcon, PaletteIcon, SunIcon } from "./icons";
import { IconButton } from "./m3";
import { SPRING } from "./motion";

/** Light/dark toggle. The icon swap is pure CSS so the server HTML is always right. */
export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable: the choice lasts for this page view */
    }
  }

  return (
    <IconButton label={label} onClick={toggle}>
      <SunIcon size={20} className="icon-sun" />
      <MoonIcon size={20} className="icon-moon" />
    </IconButton>
  );
}

/** Toggles html[data-scrolled] so the top app bar can switch to its scrolled surface (M3). */
export function ScrollFlag() {
  useEffect(() => {
    const update = () => document.documentElement.toggleAttribute("data-scrolled", window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}

type SeedId = "lime" | "blue" | "violet" | "orange";

/** Material You–style colour picker: the whole M3 palette follows the chosen seed. */
export function SeedPicker({ label, names }: { label: string; names: Record<SeedId, string> }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("lime");
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    items.current[Math.max(0, seeds.findIndex((s) => s.id === current))]?.focus();
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, current]);

  function close() {
    setOpen(false);
    button.current?.focus();
  }

  function pick(id: string) {
    document.documentElement.setAttribute("data-seed", id);
    try {
      localStorage.setItem(SEED_STORAGE_KEY, id);
    } catch {
      /* storage unavailable: the choice lasts for this page view */
    }
    setCurrent(id);
    close();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") return close();
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const i = items.current.indexOf(document.activeElement as HTMLButtonElement);
    const next = (i + (e.key === "ArrowDown" ? 1 : -1) + seeds.length) % seeds.length;
    items.current[next]?.focus();
  }

  return (
    <div ref={root} className="relative" onKeyDown={onKeyDown}>
      <IconButton
        ref={button}
        label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          setCurrent(document.documentElement.getAttribute("data-seed") ?? "lime");
          setOpen((o) => !o);
        }}
      >
        <PaletteIcon size={20} />
      </IconButton>
      {open && (
        <motion.div
          role="menu"
          aria-label={label}
          initial={{ opacity: 0, scale: 0.9, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={SPRING}
          className="absolute top-12 right-0 z-50 flex origin-top-right gap-2 rounded-lg bg-surface-container p-3 shadow-2"
        >
          {seeds.map((s, i) => {
            const on = s.id === current;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  items.current[i] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={on}
                aria-label={names[s.id as SeedId]}
                title={names[s.id as SeedId]}
                onClick={() => pick(s.id)}
                style={{ background: s.hex }}
                className={`grid size-10 cursor-pointer place-items-center text-black/80 transition-[border-radius] duration-300 ${on ? "rounded-md" : "rounded-full"}`}
              >
                {on && <CheckIcon size={20} />}
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

/** EN | FR pill. Links to the other language's page, keeping the current section. */
export function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const target = otherLocale(lang);
  const router = useRouter();

  function go(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    try {
      localStorage.setItem(LANG_STORAGE_KEY, target);
    } catch {
      /* ignore */
    }
    router.push(`/${target}/${window.location.hash}`);
  }

  return (
    <a
      href={`/${target}/`}
      hrefLang={target}
      onClick={go}
      aria-label={label}
      title={label}
      className="relative inline-flex h-10 items-center rounded-full border border-outline p-1 type-label-l no-underline"
    >
      {(["en", "fr"] as const).map((code) => (
        <span
          key={code}
          className={`relative rounded-full px-3 py-1.5 ${code === lang ? "text-on-secondary-container" : "text-on-surface-variant"}`}
        >
          {code === lang && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-secondary-container"
              transition={SPRING}
            />
          )}
          <span className="relative">{code.toUpperCase()}</span>
        </span>
      ))}
    </a>
  );
}

/** The section currently in view, among `ids` (in page order). */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const list = key.split(",");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActive(id);
          } else if (entry.boundingClientRect.top > 0) {
            // Scrolled back up past this section's top: fall back to the previous one (or none).
            const index = list.indexOf(id);
            setActive((current) => (current === id ? (list[index - 1] ?? null) : current));
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    for (const id of list) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [key]);

  return active;
}

export type NavItem = { id: string; label: string; icon: ReactNode };

function Destination({ item, on, vertical }: { item: NavItem; on: boolean; vertical: boolean }) {
  return (
    <a
      href={`#${item.id}`}
      aria-current={on ? "true" : undefined}
      className={`group flex flex-col items-center gap-1 rounded-lg no-underline outline-offset-2 ${vertical ? "w-full py-1" : "flex-1 pt-3 pb-4"}`}
    >
      <span className="relative grid h-8 w-16 place-items-center">
        {on && (
          <motion.span
            layoutId={vertical ? "rail-indicator" : "bar-indicator"}
            className="absolute inset-0 rounded-full bg-secondary-container"
            transition={SPRING}
          />
        )}
        <span
          className={`relative grid h-8 w-16 place-items-center rounded-full transition-colors group-hover:bg-on-surface/8 ${on ? "text-on-secondary-container" : "text-on-surface-variant"}`}
        >
          {item.icon}
        </span>
      </span>
      <span className={`type-label-m ${on ? "font-bold text-on-surface" : "text-on-surface-variant"}`}>{item.label}</span>
    </a>
  );
}

/** M3 navigation bar: compact windows only, with the Contact FAB above it. */
export function NavigationBar({ items, label, contact }: { items: NavItem[]; label: string; contact: ReactNode }) {
  const active = useActiveSection(items.map((i) => i.id));
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* The FAB steps aside once the contact section (and its submit button) is on screen. */}
      <div
        className={`fixed right-4 bottom-[calc(96px+env(safe-area-inset-bottom))] z-45 transition-[opacity,scale] duration-300 md:hidden ${contactInView ? "pointer-events-none scale-75 opacity-0" : ""}`}
      >
        {contact}
      </div>
      <nav
        aria-label={label}
        className="fixed inset-x-0 bottom-0 z-45 flex bg-surface-container pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {items.map((item) => (
          <Destination key={item.id} item={item} on={active === item.id} vertical={false} />
        ))}
      </nav>
    </>
  );
}

/** M3 navigation rail: large windows, Contact FAB on top. */
export function NavigationRail({ items, label, contact }: { items: NavItem[]; label: string; contact: ReactNode }) {
  const active = useActiveSection(items.map((i) => i.id));
  return (
    <nav
      aria-label={label}
      className="fixed inset-y-0 left-0 z-45 hidden w-24 flex-col items-center gap-10 bg-surface pt-5 xl:flex"
    >
      {contact}
      <div className="flex w-full flex-col items-center gap-3">
        {items.map((item) => (
          <Destination key={item.id} item={item} on={active === item.id} vertical />
        ))}
      </div>
    </nav>
  );
}
