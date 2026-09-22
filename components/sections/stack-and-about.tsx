import type { Dictionary } from "@/content";
import { ParallaxImage, Reveal, Stagger, StaggerItem } from "../motion";
import { Counter } from "../ui";

export function Stack({ t }: { t: Dictionary }) {
  return (
    <section id="stack" className="section-space scroll-mt-24">
      <Reveal className="mb-[clamp(30px,4vw,56px)] flex flex-wrap items-end justify-between gap-5">
        <div>
          <Counter n={4} />
          <h2 className="m-0 font-display text-[clamp(30px,4vw,56px)] leading-none font-extrabold tracking-[-.03em]">
            {t.stack.title}
          </h2>
        </div>
        <p className="m-0 max-w-[32ch] font-mono text-[11px] leading-[1.9] tracking-[.18em] text-fg-3 uppercase">
          {t.stack.note}
        </p>
      </Reveal>
      <div className="border-b border-line">
        {t.stack.groups.map((group) => (
          <Reveal
            key={group.name}
            className="grid grid-cols-1 gap-3 border-t border-line py-[clamp(22px,2.8vw,34px)] lg:grid-cols-[minmax(0,.24fr)_minmax(0,1fr)] lg:gap-[clamp(14px,3vw,48px)]"
          >
            <h3 className="m-0 font-mono text-xs font-bold tracking-[.2em] text-accent-ink uppercase">{group.name}</h3>
            <Stagger stagger={0.035} className="flex flex-wrap gap-[9px]">
              {group.items.map((item) => (
                <StaggerItem
                  as="span"
                  key={item}
                  className="chip cursor-default transition-colors duration-200 hover:bg-accent hover:text-on-accent"
                >
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function About({ t }: { t: Dictionary }) {
  const { about } = t;
  return (
    <section id="about" className="section-space scroll-mt-24">
      <Counter n={5} />
      <div className="grid grid-cols-1 items-start gap-[clamp(28px,5vw,80px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,.6fr)]">
        <div>
          <Reveal>
            <h2 className="m-0 mb-7 max-w-[26ch] font-display text-[clamp(26px,3.2vw,44px)] leading-[1.08] font-extrabold tracking-[-.03em] text-pretty">
              {about.lead}
            </h2>
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className={`m-0 max-w-[64ch] text-pretty text-fg-2 ${i === about.paragraphs.length - 1 ? "mb-8" : "mb-4"}`}>{p}</p>
            </Reveal>
          ))}
          <Reveal as="figure" className="m-0 max-w-[56ch] rounded-3xl bg-accent p-[clamp(22px,2.6vw,34px)] text-on-accent">
            <blockquote className="m-0">
              <p className="m-0 font-display text-[clamp(18px,1.9vw,25px)] leading-[1.24] font-semibold tracking-[-.02em] text-pretty">
                {about.quote}
              </p>
            </blockquote>
          </Reveal>
        </div>
        <div className="flex flex-col gap-[26px]">
          <ParallaxImage src={about.image.src} alt={about.image.alt} className="aspect-[4/5] rounded-3xl max-lg:aspect-[4/3]" />
          <Reveal as="dl" className="m-0 border-b border-line">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-t border-line py-[15px]">
                <dt className="label-mono mb-[7px]">{fact.label}</dt>
                <dd className="m-0 text-[15.5px]">{fact.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
