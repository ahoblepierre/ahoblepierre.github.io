import type { Dictionary } from "@/content";
import { ParallaxImage, Reveal, Stagger, StaggerItem } from "../motion";
import { Counter } from "../ui";

export function Stack({ t }: { t: Dictionary }) {
  return (
    <section id="stack" className="section-space">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <Counter n={4} />
          <h2 className="m-0 type-headline-l-emph text-on-surface">
            {t.stack.title}
          </h2>
        </div>
        <p className="m-0 max-w-[40ch] type-label-l text-on-surface-variant">
          {t.stack.note}
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {t.stack.groups.map((group) => (
          <Reveal
            key={group.name}
            className="rounded-xl bg-surface-container-low p-5 md:p-6"
          >
            <h3 className="m-0 mb-4 type-title-m text-primary">{group.name}</h3>
            <Stagger stagger={0.035} className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <StaggerItem
                  as="span"
                  key={item}
                  className="state-layer inline-flex h-8 cursor-default items-center rounded-sm border border-outline-variant px-4 type-label-l text-on-surface-variant"
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
    <section id="about" className="section-space">
      <Counter n={5} />
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,.6fr)] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="m-0 mb-6 max-w-[26ch] type-headline-l-emph text-pretty text-on-surface">
              {about.lead}
            </h2>
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className={`m-0 max-w-[64ch] type-body-l text-pretty text-on-surface-variant ${i === about.paragraphs.length - 1 ? "mb-8" : "mb-4"}`}>{p}</p>
            </Reveal>
          ))}
          <Reveal as="figure" className="m-0 max-w-[56ch] rounded-2xl rounded-tl-sm bg-tertiary-container p-6 text-on-tertiary-container md:p-8">
            <blockquote className="m-0">
              <p className="m-0 type-title-l font-medium text-pretty md:text-2xl md:leading-8">
                {about.quote}
              </p>
            </blockquote>
          </Reveal>
        </div>
        <div className="flex flex-col gap-6">
          <ParallaxImage
            src={about.image.src}
            alt={about.image.alt}
            tint={false}
            position="50% 25%"
            className="aspect-[4/5] rounded-2xl max-lg:aspect-[4/3]"
          />
          <Reveal as="dl" className="m-0 overflow-hidden rounded-xl bg-surface-container-low">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-t border-outline-variant px-5 py-3 first:border-t-0">
                <dt className="mb-1 type-label-m text-on-surface-variant">{fact.label}</dt>
                <dd className="m-0 type-body-l text-on-surface">{fact.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
