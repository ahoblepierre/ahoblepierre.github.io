import type { Dictionary } from "@/content";
import type { ExperienceEntry } from "@/content/types";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { buttonClass } from "../m3-styles";
import { Counter, ExternalLink, underlineLink } from "../ui";

function EntryBody({ entry }: { entry: ExperienceEntry }) {
  if (entry.roles) {
    return (
      <Stagger as="ul" stagger={0.08} className="m-0 flex max-w-[68ch] list-none flex-col gap-5 p-0">
        {entry.roles.map((role) => (
          <StaggerItem as="li" key={role.title}>
            <div className="type-title-m text-on-surface">
              {role.title}{" "}
              <span className="type-label-m text-on-surface-variant">{role.meta}</span>
            </div>
            <div className="mt-1 type-body-m text-on-surface-variant">{role.text}</div>
          </StaggerItem>
        ))}
      </Stagger>
    );
  }

  return (
    <div>
      {entry.title && (
        <h3 className="m-0 mb-1.5 type-title-l font-medium text-on-surface md:text-2xl">{entry.title}</h3>
      )}
      {entry.bullets && (
        <ul className="mt-4 mb-4 flex max-w-[68ch] list-disc flex-col gap-2 pl-5 type-body-l text-on-surface-variant marker:text-primary">
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {entry.text && (
        <p className={`max-w-[68ch] text-on-surface-variant ${entry.title ? "mt-4 mb-3.5" : "mt-0 mb-4"}`}>{entry.text}</p>
      )}
      {entry.tags && (
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span key={tag} className="inline-flex h-8 items-center rounded-sm border border-outline-variant px-3 type-label-l text-on-surface-variant">
              {tag}
            </span>
          ))}
        </div>
      )}
      {entry.links && (
        <div className="flex flex-wrap gap-4 text-sm">
          {entry.links.map((link) => (
            <ExternalLink key={link.href} href={link.href} className={underlineLink}>
              {link.label} <span aria-hidden="true">↗</span>
            </ExternalLink>
          ))}
        </div>
      )}
      {entry.chips && (
        <div className="flex flex-wrap gap-[9px]">
          {entry.chips.map((chip) =>
            chip.href ? (
              <ExternalLink key={chip.label} href={chip.href} className={buttonClass("tonal")}>
                {chip.label} <span aria-hidden="true">↗</span>
              </ExternalLink>
            ) : (
              <span key={chip.label} className="inline-flex h-10 items-center rounded-full bg-surface-container-high px-5 type-label-l text-on-surface-variant">
                {chip.label}
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
}

export function Experience({ t }: { t: Dictionary }) {
  return (
    <section id="experience" className="section-space">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <Counter n={6} />
          <h2 className="m-0 type-headline-l-emph text-on-surface">
            {t.experience.title}
          </h2>
        </div>
        <p className="m-0 type-label-l text-on-surface-variant">{t.experience.range}</p>
      </Reveal>

      <div className="flex flex-col gap-3">
        {t.experience.entries.map((entry) => (
          <Reveal
            key={entry.period + entry.place}
            className={`grid grid-cols-1 gap-3 rounded-xl p-5 md:p-8 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-10 ${entry.current ? "bg-secondary-container/60 ring-2 ring-primary" : "border border-outline-variant"}`}
          >
            <div>
              <div className={`type-headline-s font-bold ${entry.current ? "text-primary" : "text-on-surface"}`}>
                {entry.current && (
                  <span aria-hidden="true" className="relative mr-2 inline-flex size-2 -translate-y-1 align-middle">
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                    <span className="relative size-2 rounded-full bg-primary" />
                  </span>
                )}
                {entry.period}
              </div>
              <div className="mt-1 type-label-l text-on-surface-variant">{entry.place}</div>
            </div>
            <EntryBody entry={entry} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Beyond({ t }: { t: Dictionary }) {
  return (
    <section id="beyond" className="section-space">
      <Counter n={7} />
      <Stagger stagger={0.1} className="flex flex-wrap items-baseline gap-x-[26px] gap-y-3.5">
        <StaggerItem as="span">
          <h2 className="m-0 mr-4 type-headline-l-emph text-on-surface">
            {t.beyond.title}
          </h2>
        </StaggerItem>
        {t.beyond.traits.map((trait, i) => (
          <StaggerItem as="span" key={trait} className="flex items-baseline gap-x-[26px]">
            {i > 0 && <span aria-hidden="true" className="block size-[7px] self-center rounded-full bg-primary" />}
            <span className="type-headline-s text-on-surface-variant transition-colors hover:text-on-surface">
              {trait}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
