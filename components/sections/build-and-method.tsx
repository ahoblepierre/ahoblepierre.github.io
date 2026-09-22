import type { Dictionary } from "@/content";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { Counter } from "../ui";

export function WhatIBuild({ t }: { t: Dictionary }) {
  return (
    <section className="section-space grid grid-cols-1 gap-[clamp(28px,5vw,88px)] lg:grid-cols-[minmax(0,.46fr)_minmax(0,1fr)]">
      <Reveal>
        <Counter n={1} />
        <h2 className="m-0 max-w-[11ch] font-display text-[clamp(30px,4vw,56px)] leading-none font-extrabold tracking-[-.03em]">
          {t.build.title}
        </h2>
      </Reveal>
      <Stagger stagger={0.12} className="flex flex-col border-b border-line">
        {t.build.items.map((item) => (
          <StaggerItem key={item.title} className="group border-t border-line py-[clamp(24px,3vw,38px)]">
            <h3 className="m-0 mb-3 font-display text-[clamp(23px,2.4vw,32px)] leading-[1.1] font-semibold tracking-[-.02em] transition-colors group-hover:text-accent-ink">
              {item.title}
            </h3>
            <p className="m-0 max-w-[56ch] text-pretty text-fg-2">{item.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function HowIWork({ t }: { t: Dictionary }) {
  const last = t.method.steps.length - 1;
  return (
    <Reveal
      as="section"
      className="mx-[calc(50%-50vw)] mb-[clamp(88px,13vw,180px)] bg-accent px-[calc(50vw-50%+clamp(18px,4vw,56px))] py-[clamp(52px,8vw,110px)] text-on-accent"
    >
      <div className="mb-[clamp(30px,4vw,56px)] flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="eyebrow mb-4 text-[rgba(10,10,11,.6)]">02 / 07</div>
          <h2 className="m-0 font-display text-[clamp(34px,5vw,72px)] leading-[.98] font-extrabold tracking-[-.035em]">
            {t.method.title}
          </h2>
        </div>
        <p className="m-0 max-w-[34ch] font-mono text-[11.5px] leading-[1.9] tracking-[.06em] text-[rgba(10,10,11,.66)] uppercase">
          {t.method.flow}
        </p>
      </div>
      <Stagger as="ol" stagger={0.1} className="m-0 list-none border-b border-[rgba(10,10,11,.22)] p-0">
        {t.method.steps.map((step, i) => (
          <StaggerItem
            as="li"
            key={step.title}
            className="grid grid-cols-1 items-start gap-[clamp(16px,3vw,56px)] border-t border-[rgba(10,10,11,.22)] py-[clamp(24px,3.2vw,40px)] lg:grid-cols-[minmax(0,.34fr)_minmax(0,1fr)]"
          >
            <div className="flex items-baseline gap-[18px]">
              <span
                aria-hidden="true"
                className={`font-display text-[clamp(40px,5vw,72px)] leading-[.9] font-extrabold ${i === last ? "text-on-accent" : "text-transparent [-webkit-text-stroke:1.4px_#0a0a0b]"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 font-display text-[clamp(22px,2.2vw,30px)] font-semibold tracking-[-.02em]">
                {step.title}
              </h3>
            </div>
            <p className="m-0 max-w-[58ch] text-pretty text-[rgba(10,10,11,.74)]">{step.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
