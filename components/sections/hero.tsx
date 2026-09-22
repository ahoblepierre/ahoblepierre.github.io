import type { Dictionary } from "@/content";
import { site } from "@/content/site";
import { DownloadIcon } from "../icons";
import { Entrance, Parallax } from "../motion";
import { Accented } from "../ui";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <>
      <section className="grid grid-cols-1 items-center gap-[clamp(32px,5vw,80px)] pt-[clamp(40px,7vw,96px)] pb-[clamp(48px,7vw,104px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)]">
        <div>
          <Entrance delay={0.04} className="mb-[clamp(24px,3.4vw,40px)] flex items-center gap-3.5">
            <span aria-hidden="true" className="block h-px w-[34px] bg-accent" />
            <span className="eyebrow text-accent-ink uppercase">{t.hero.kicker}</span>
          </Entrance>
          <Entrance delay={0.12}>
            <h1 className="mb-[clamp(24px,3vw,36px)] max-w-[16ch] font-display text-[clamp(42px,7.6vw,116px)] leading-[.94] font-extrabold tracking-[-.035em] text-pretty">
              <Accented text={t.hero.title} />
            </h1>
          </Entrance>
          <Entrance delay={0.22}>
            <p className="mb-[clamp(30px,4vw,44px)] max-w-[50ch] text-[clamp(16.5px,1.3vw,19.5px)] text-pretty text-fg-2">
              {t.hero.text}
            </p>
          </Entrance>
          <Entrance delay={0.3} className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-[15px] text-[15px] font-semibold text-on-accent no-underline transition-colors hover:bg-accent-deep"
            >
              {t.hero.ctaWork}
              <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            {site.cvPath && (
              <a
                href={site.cvPath}
                download={site.cvFileName}
                className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-[26px] py-[15px] text-[15px] font-semibold text-fg no-underline transition-colors hover:border-accent-ink hover:text-accent-ink"
              >
                <DownloadIcon size={16} />
                {t.hero.ctaCv}
              </a>
            )}
          </Entrance>
        </div>

        <Entrance
          delay={0.18}
          className="relative aspect-square w-full max-w-[min(340px,62vw)] justify-self-start lg:max-w-[540px] lg:justify-self-end"
        >
          <figure className="relative m-0 grid size-full place-items-center">
            <div aria-hidden="true" className="absolute inset-[7%_4%_7%_14%] rounded-full bg-accent" />
            <div
              aria-hidden="true"
              className="absolute -inset-[1%] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-[color-mix(in_srgb,var(--accent-ink)_32%,transparent)] motion-reduce:animate-none"
            />
            <Parallax distance={24} className="relative aspect-square w-[80%] overflow-hidden rounded-full bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
              <img
                src="/images/portrait.webp"
                alt={t.hero.portraitAlt}
                width={900}
                height={900}
                fetchPriority="high"
                className="size-full scale-110 object-cover"
              />
            </Parallax>
          </figure>
        </Entrance>
      </section>

      <Entrance
        delay={0.4}
        className="mb-[clamp(88px,13vw,180px)] grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-px overflow-hidden rounded-[22px] bg-line"
      >
        {t.stats.map((s) => (
          <div key={s.label} className="bg-panel p-[clamp(22px,2.6vw,34px)]">
            <div
              className={`font-display leading-[1.12] font-extrabold tracking-[-.02em] ${s.highlight ? "text-[clamp(32px,3.4vw,44px)] leading-none tracking-[-.03em] text-accent-ink" : "text-[clamp(22px,2.2vw,28px)]"}`}
            >
              {s.value}
            </div>
            <div className="mt-2.5 font-mono text-[10.5px] tracking-[.18em] text-fg-3 uppercase">{s.label}</div>
          </div>
        ))}
      </Entrance>
    </>
  );
}
