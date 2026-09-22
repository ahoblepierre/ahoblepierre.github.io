import type { Dictionary } from "@/content";
import type { Project } from "@/content/types";
import { ParallaxImage, PhoneShowcase, Reveal, Stagger, StaggerItem } from "../motion";
import { Counter, ExternalLink } from "../ui";

type Labels = Dictionary["work"]["labels"];

const tagClass: Record<Project["tagStyle"], string> = {
  solid: "bg-accent text-on-accent px-3.5 py-1.5",
  outline: "text-accent-ink border border-[color-mix(in_srgb,var(--accent-ink)_45%,transparent)] px-[13px] py-[5px]",
  dashed: "text-fg-2 border border-dashed border-line-strong px-[13px] py-[5px]",
};

function ProjectHeader({ project, index, wide }: { project: Project; index: number; wide: boolean }) {
  return (
    <div className={`flex flex-wrap items-baseline gap-x-[22px] gap-y-3 ${wide ? "mb-[clamp(24px,3vw,38px)]" : "mb-[22px]"}`}>
      <span className="font-mono text-xs tracking-[.2em] text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
      <h3
        className={`m-0 font-display leading-none font-extrabold ${wide ? "text-[clamp(30px,4.8vw,64px)] tracking-[-.035em]" : "text-[clamp(28px,4vw,52px)] tracking-[-.03em]"}`}
      >
        {project.name}
      </h3>
      <span className={`rounded-full font-mono text-[10.5px] tracking-[.16em] uppercase ${tagClass[project.tagStyle]}`}>
        {project.tag}
      </span>
    </div>
  );
}

function Meta({ project, labels, columns }: { project: Project; labels: Labels; columns: boolean }) {
  const rows = [
    { label: labels.role, value: project.role },
    { label: labels.stack, value: project.stack },
    { label: labels.focus, value: project.focus },
  ];
  return (
    <Stagger
      as="dl"
      stagger={0.07}
      className={`m-0 grid content-start ${columns ? "grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-7" : "grid-cols-1 border-b border-line"}`}
    >
      {rows.map((row) => (
        <StaggerItem key={row.label} className="border-t border-line py-3.5">
          <dt className="label-mono mb-[7px]">{row.label}</dt>
          <dd className="m-0 text-[15.5px]">{row.value}</dd>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function Lead({ project, compact }: { project: Project; compact: boolean }) {
  return (
    <>
      <p
        className={`m-0 max-w-[58ch] text-[clamp(16.5px,1.2vw,18.5px)] text-pretty text-fg ${project.detail || project.link ? "mb-4" : compact ? "mb-[26px]" : ""}`}
      >
        {project.lead}
      </p>
      {project.detail && <p className="m-0 mb-[22px] max-w-[58ch] text-pretty text-fg-3">{project.detail}</p>}
      {project.link && (
        <ExternalLink
          href={project.link.href}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-[22px] py-3 font-mono text-[11px] tracking-[.14em] text-fg uppercase no-underline transition-colors hover:border-accent-ink hover:text-accent-ink"
        >
          {project.link.label} <span aria-hidden="true">↗</span>
        </ExternalLink>
      )}
    </>
  );
}

function ProjectCard({ project, index, labels, last }: { project: Project; index: number; labels: Labels; last: boolean }) {
  const card = `rounded-[28px] bg-panel p-[clamp(24px,3.6vw,56px)] ${last ? "mb-[clamp(88px,13vw,180px)]" : "mb-[clamp(20px,2.4vw,32px)]"}`;

  if (project.layout === "wide") {
    return (
      <Reveal as="article" className={card}>
        <ProjectHeader project={project} index={index} wide />
        {project.screens ? (
          <PhoneShowcase screens={project.screens} framed={project.screenStyle === "store"} className="mb-[clamp(24px,3vw,38px)] aspect-[5/4] rounded-[20px] md:aspect-[16/9] lg:aspect-[21/10]" />
        ) : (
          project.image && (
            <ParallaxImage src={project.image.src} alt={project.image.alt} className="mb-[clamp(24px,3vw,38px)] aspect-[16/10] rounded-[20px] md:aspect-[21/9]" />
          )
        )}
        <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,.66fr)]">
          <div>
            <Lead project={project} compact={false} />
          </div>
          <Meta project={project} labels={labels} columns={false} />
        </div>
      </Reveal>
    );
  }

  const mediaLeft = project.layout === "media-left";
  const figure = project.screens ? (
    <PhoneShowcase
      screens={project.screens}
      compact
      framed={project.screenStyle === "store"}
      className="aspect-[4/5] rounded-[20px] max-lg:aspect-[5/4]"
    />
  ) : (
    project.image && (
      <ParallaxImage src={project.image.src} alt={project.image.alt} className="aspect-[4/5] rounded-[20px] max-lg:aspect-[4/3]" />
    )
  );
  return (
    <Reveal
      as="article"
      className={`${card} grid grid-cols-1 items-center gap-[clamp(24px,4vw,64px)] ${mediaLeft ? "lg:grid-cols-[minmax(0,.78fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,.78fr)]"}`}
    >
      {mediaLeft && figure}
      <div>
        <ProjectHeader project={project} index={index} wide={false} />
        <Lead project={project} compact />
        <Meta project={project} labels={labels} columns />
      </div>
      {!mediaLeft && figure}
    </Reveal>
  );
}

export function SelectedWork({ t }: { t: Dictionary }) {
  const { projects, labels } = t.work;
  return (
    <section id="work" className="scroll-mt-24">
      <Reveal className="pb-[clamp(40px,6vw,72px)]">
        <Counter n={3} />
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="m-0 font-display text-[clamp(34px,5.6vw,80px)] leading-[.98] font-extrabold tracking-[-.035em]">
            {t.work.title}
          </h2>
          <p className="m-0 font-mono text-[11px] tracking-[.18em] text-fg-3 uppercase">{t.work.summary}</p>
        </div>
      </Reveal>
      {projects.map((project, i) => (
        <ProjectCard key={project.name} project={project} index={i} labels={labels} last={i === projects.length - 1} />
      ))}
    </section>
  );
}
