import type { Dictionary } from "@/content";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { Counter } from "../ui";

export function WhatIBuild({ t }: { t: Dictionary }) {
  return (
    <section className="section-space">
      <Reveal className="mb-8">
        <Counter n={1} />
        <h2 className="m-0 max-w-[18ch] type-headline-l-emph text-on-surface">{t.build.title}</h2>
      </Reveal>
      <Stagger stagger={0.12} className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {t.build.items.map((item) => (
          <StaggerItem
            key={item.title}
            className="state-layer rounded-xl bg-surface-container-low p-6 text-on-surface transition-[border-radius] duration-500 ease-emphasized hover:rounded-2xl"
          >
            <h3 className="m-0 mb-3 type-title-l font-medium">{item.title}</h3>
            <p className="m-0 type-body-l text-pretty text-on-surface-variant">{item.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function HowIWork({ t }: { t: Dictionary }) {
  return (
    <Reveal as="section" className="mb-20 rounded-2xl bg-primary-container p-6 text-on-primary-container md:p-10 lg:mb-32 lg:p-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <Counter n={2} className="text-on-primary-container" />
          <h2 className="m-0 type-headline-l-emph">{t.method.title}</h2>
        </div>
        <p className="m-0 max-w-[40ch] type-label-l opacity-80">{t.method.flow}</p>
      </div>
      <Stagger as="ol" stagger={0.1} className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
        {t.method.steps.map((step, i) => (
          <StaggerItem as="li" key={step.title} className="flex gap-4 rounded-xl bg-surface-container-lowest p-5 text-on-surface">
            <span
              aria-hidden="true"
              className="grid size-12 flex-none place-items-center rounded-lg bg-primary type-title-l font-bold text-on-primary"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="m-0 mb-1 type-title-l font-medium">{step.title}</h3>
              <p className="m-0 type-body-m text-pretty text-on-surface-variant">{step.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
