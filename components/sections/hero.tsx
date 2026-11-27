import type { Dictionary } from "@/content";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { CvLink } from "../analytics";
import { ArrowForwardIcon, DownloadIcon } from "../icons";
import { Button } from "../m3";
import { buttonClass } from "../m3-styles";
import { Entrance, Parallax } from "../motion";
import { HeroTitle } from "../hero-title";

export function Hero({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <>
      <section className="grid grid-cols-1 items-center gap-10 pt-8 pb-12 md:pt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-16 lg:pb-20">
        <div>
          <Entrance delay={0.04} className="mb-6">
            <span className="inline-flex h-8 items-center gap-2 rounded-sm bg-secondary-container px-3 type-label-l text-on-secondary-container">
              <span aria-hidden="true" className="block size-2 rounded-full bg-primary" />
              {t.hero.kicker}
            </span>
          </Entrance>
          <h1 className="mb-6 max-w-[16ch] type-display-l-emph text-pretty text-on-surface">
            <HeroTitle lead={t.hero.titleLead} words={t.hero.titleWords} end={t.hero.titleEnd} />
          </h1>
          <Entrance delay={0.22}>
            <p className="mb-8 max-w-[50ch] type-body-l text-pretty text-on-surface-variant md:text-lg md:leading-7">
              {t.hero.text}
            </p>
          </Entrance>
          <Entrance delay={0.3} className="flex flex-wrap items-center gap-3">
            <Button href="#work" className="h-14 px-7 type-title-m" icon={<ArrowForwardIcon size={20} className="rotate-90" />}>
              {t.hero.ctaWork}
            </Button>
            {site.cvPath && (
              <CvLink
                href={site.cvPath}
                fileName={site.cvFileName}
                lang={lang}
                accessKey={site.web3formsKey}
                className={buttonClass("tonal", "h-14 px-7 type-title-m")}
              >
                <DownloadIcon size={18} />
                {t.hero.ctaCv}
              </CvLink>
            )}
          </Entrance>
        </div>

        <Entrance
          delay={0.18}
          className="relative aspect-square w-full max-w-[min(340px,78vw)] justify-self-center lg:max-w-[520px] lg:justify-self-end"
        >
          <figure className="relative m-0 grid size-full place-items-center">
            {/* Expressive shapes: a tilted primary tile behind a softly squared portrait. */}
            <div aria-hidden="true" className="absolute inset-[6%] rotate-[8deg] rounded-2xl bg-primary-container" />
            <div aria-hidden="true" className="absolute inset-[10%] -rotate-[4deg] rounded-2xl bg-primary opacity-90" />
            <Parallax distance={24} className="relative aspect-square w-[78%] overflow-hidden rounded-2xl bg-surface-container-highest shadow-3">
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

      <Entrance delay={0.4} className="mb-20 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mb-32 lg:grid-cols-4">
        {t.stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl p-6 ${s.highlight ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface"}`}
          >
            <div className={s.highlight ? "type-display-s font-bold" : "type-headline-s font-semibold"}>{s.value}</div>
            <div className={`mt-2 type-label-l ${s.highlight ? "" : "text-on-surface-variant"}`}>{s.label}</div>
          </div>
        ))}
      </Entrance>
    </>
  );
}
