"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { LANG_STORAGE_KEY, THEME_STORAGE_KEY, otherLocale, type Locale } from "@/lib/i18n";
import { MoonIcon, SunIcon } from "./icons";

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
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      whileTap={{ scale: 0.9, rotate: -20 }}
      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-transparent p-0 text-fg-2 transition-colors hover:border-accent-ink hover:text-accent-ink"
    >
      <SunIcon size={17} className="icon-sun" />
      <MoonIcon size={17} className="icon-moon" />
    </motion.button>
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
      className="relative inline-flex items-center rounded-full border border-line-strong p-[3px] font-mono text-[10.5px] font-bold tracking-[.14em] no-underline"
    >
      {(["en", "fr"] as const).map((code) => (
        <span
          key={code}
          className={`relative rounded-full px-[11px] py-[5px] ${code === lang ? "text-on-accent" : "text-fg-3"}`}
        >
          {code === lang && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-accent"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
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
