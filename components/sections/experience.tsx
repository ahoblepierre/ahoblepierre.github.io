import type { Dictionary } from "@/content";
import type { ExperienceEntry } from "@/content/types";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { Counter, ExternalLink, underlineLink } from "../ui";

function EntryBody({ entry }: { entry: ExperienceEntry }) {
  if (entry.roles) {
    return (
      <Stagger as="ul" stagger={0.08} className="m-0 flex max-w-[68ch] list-none flex-col gap-5 p-0">
        {entry.roles.map((role) => (
          <StaggerItem as="li" key={role.title}>
            <div className="font-display text-lg font-semibold">
              {role.title}{" "}
              <span className="font-mono text-[11px] tracking-[.12em] text-fg-3">{role.meta}</span>
            </div>
            <div className="mt-1 text-[15px] text-fg-2">{role.text}</div>
          </StaggerItem>
        ))}
      </Stagger>
    );
  }

  return (
    <div>
      {entry.title && (
        <h3 className="m-0 mb-1.5 font-display text-[clamp(21px,2.3vw,30px)] font-semibold tracking-[-.02em]">{entry.title}</h3>
      )}
      {entry.bullets && (
        <ul className="mt-4 mb-[18px] flex max-w-[68ch] list-disc flex-col gap-[9px] pl-5 text-fg-2 marker:text-accent-ink">
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {entry.text && (
        <p className={`max-w-[68ch] text-fg-2 ${entry.title ? "mt-4 mb-3.5" : "mt-0 mb-4"}`}>{entry.text}</p>
      )}
      {entry.tags && (
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-panel-2 px-[13px] py-1.5 font-mono text-[10.5px] tracking-[.1em] text-fg-2">
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
              <ExternalLink key={chip.label} href={chip.href} className="chip text-fg no-underline transition-colors hover:text-accent-ink">
                {chip.label} <span aria-hidden="true">↗</span>
              </ExternalLink>
            ) : (
              <span key={chip.label} className="chip text-fg-2">
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
    <section id="experience" className="section-space scroll-mt-24">
      <Reveal className="mb-[clamp(30px,4vw,56px)] flex flex-wrap items-end justify-between gap-5">
        <div>
          <Counter n={6} />
          <h2 className="m-0 font-display text-[clamp(30px,4vw,56px)] leading-none font-extrabold tracking-[-.03em]">
            {t.experience.title}
          </h2>
        </div>
        <p className="m-0 font-mono text-[11px] tracking-[.18em] text-fg-3 uppercase">{t.experience.range}</p>
      </Reveal>

      <div className="border-b border-line">
        {t.experience.entries.map((entry) => (
          <Reveal
            key={entry.period + entry.place}
            className={`grid grid-cols-1 gap-3 border-t py-[clamp(26px,3.2vw,40px)] lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-[clamp(16px,3vw,48px)] ${entry.current ? "border-accent" : "border-line"}`}
          >
            <div>
              <div className={`font-display text-2xl font-extrabold tracking-[-.02em] ${entry.current ? "text-accent-ink" : ""}`}>
                {entry.current && (
                  <span aria-hidden="true" className="relative mr-2 inline-flex size-2 -translate-y-1 align-middle">
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                    <span className="relative size-2 rounded-full bg-accent" />
                  </span>
                )}
                {entry.period}
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[.18em] text-fg-3 uppercase">{entry.place}</div>
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
      <Counter n={7} className="mb-[22px]" />
      <Stagger stagger={0.1} className="flex flex-wrap items-baseline gap-x-[26px] gap-y-3.5">
        <StaggerItem as="span">
          <h2 className="m-0 mr-[18px] font-display text-[clamp(26px,3vw,40px)] leading-none font-extrabold tracking-[-.03em]">
            {t.beyond.title}
          </h2>
        </StaggerItem>
        {t.beyond.traits.map((trait, i) => (
          <StaggerItem as="span" key={trait} className="flex items-baseline gap-x-[26px]">
            {i > 0 && <span aria-hidden="true" className="block size-[7px] self-center rounded-full bg-accent" />}
            <span className="font-display text-[clamp(20px,2.4vw,32px)] font-semibold tracking-[-.02em] text-fg-3 transition-colors hover:text-fg">
              {trait}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
