"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
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

/** Fixed section rail on wide screens; highlights the section currently in view. */
export function SectionRail({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActive(id);
          } else if (entry.boundingClientRect.top > 0) {
            // Scrolled back up past this section's top: fall back to the previous one (or none).
            const index = items.findIndex((item) => item.id === id);
            setActive((current) => (current === id ? (items[index - 1]?.id ?? null) : current));
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="fixed top-1/2 right-[clamp(16px,2.4vw,34px)] z-35 hidden -translate-y-1/2 flex-col items-end gap-5 xl:flex"
    >
      {items.map(({ id, label: text }) => {
        const on = active === id;
        return (
          <a key={id} href={`#${id}`} className="group flex items-center gap-3 text-fg-2 no-underline">
            <span
              className={`rounded-full bg-[color-mix(in_srgb,var(--ink)_85%,transparent)] px-2 py-0.5 font-mono text-[10px] tracking-[.18em] uppercase backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${on ? "translate-x-0 opacity-100" : "translate-x-1.5 opacity-0"}`}
            >
              {text}
            </span>
            <motion.i
              className="block h-0.5 rounded-sm"
              animate={{ width: on ? 26 : 16, backgroundColor: on ? "var(--accent-ink)" : "var(--line-strong)" }}
              transition={{ duration: 0.28 }}
            />
          </a>
        );
      })}
    </nav>
  );
}
