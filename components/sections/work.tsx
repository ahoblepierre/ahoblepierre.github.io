import type { Dictionary } from "@/content";
import type { Project } from "@/content/types";
import { ExchangeArt, ScheduleArt } from "../illustrations";
import { ParallaxImage, PhoneShowcase, Reveal, Stagger, StaggerItem } from "../motion";
import { buttonClass } from "../m3-styles";
import { Counter, ExternalLink } from "../ui";

type Labels = Dictionary["work"]["labels"];

const tagClass: Record<Project["tagStyle"], string> = {
  solid: "bg-primary text-on-primary",
  outline: "bg-secondary-container text-on-secondary-container",
  dashed: "border border-outline-variant text-on-surface-variant",
};

function ProjectHeader({ project, index, wide }: { project: Project; index: number; wide: boolean }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
      <span className="grid size-10 place-items-center rounded-full bg-primary type-label-l text-on-primary">{String(index + 1).padStart(2, "0")}</span>
      <h3
        className={`m-0 text-on-surface ${wide ? "type-headline-l-emph" : "type-headline-m font-semibold"}`}
      >
        {project.name}
      </h3>
      <span className={`inline-flex h-8 items-center rounded-sm px-3 type-label-l ${tagClass[project.tagStyle]}`}>
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
      className={`m-0 grid content-start ${columns ? "grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-6" : "grid-cols-1"}`}
    >
      {rows.map((row) => (
        <StaggerItem key={row.label} className="border-t border-outline-variant py-3">
          <dt className="mb-1 type-label-m text-on-surface-variant">{row.label}</dt>
          <dd className="m-0 type-body-l text-on-surface">{row.value}</dd>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function Lead({ project, compact }: { project: Project; compact: boolean }) {
  return (
    <>
      <p
        className={`m-0 max-w-[58ch] type-body-l text-pretty text-on-surface md:text-lg md:leading-7 ${project.detail || project.link ? "mb-4" : compact ? "mb-6" : ""}`}
      >
        {project.lead}
      </p>
      {project.detail && <p className="m-0 mb-5 max-w-[58ch] type-body-m text-pretty text-on-surface-variant">{project.detail}</p>}
      {project.link && (
        <ExternalLink
          href={project.link.href}
          className={buttonClass("outlined")}
        >
          {project.link.label} <span aria-hidden="true">↗</span>
        </ExternalLink>
      )}
    </>
  );
}

/** The visual of a project card: coded illustration, phone screens or photo, in that order of preference. */
function ProjectMedia({ project, wide }: { project: Project; wide: boolean }) {
  const frame = wide
    ? "mb-6 rounded-xl md:aspect-[16/9] lg:aspect-[21/10]"
    : "rounded-xl lg:aspect-[4/5]";
  const art = project.illustration;
  if (art?.kind === "schedule") return <ScheduleArt data={art} className={frame} />;
  if (art?.kind === "exchange") return <ExchangeArt data={art} className={frame} />;
  if (project.screens)
    return (
      <PhoneShowcase
        screens={project.screens}
        compact={!wide}
        framed={project.screenStyle === "store"}
        className={`${frame} aspect-[5/4]`}
      />
    );
  if (project.image)
    return (
      <ParallaxImage
        src={project.image.src}
        alt={project.image.alt}
        className={wide ? "mb-6 aspect-[16/10] rounded-xl md:aspect-[21/9]" : "aspect-[4/3] rounded-xl lg:aspect-[4/5]"}
      />
    );
  return null;
}

function ProjectCard({ project, index, labels, last }: { project: Project; index: number; labels: Labels; last: boolean }) {
  const card = `rounded-2xl bg-surface-container-low p-5 md:p-8 lg:p-12 ${last ? "mb-20 lg:mb-32" : "mb-3 md:mb-4"}`;

  if (project.layout === "wide") {
    return (
      <Reveal as="article" className={card}>
        <ProjectHeader project={project} index={index} wide />
        <ProjectMedia project={project} wide />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,.66fr)] lg:gap-14">
          <div>
            <Lead project={project} compact={false} />
          </div>
          <Meta project={project} labels={labels} columns={false} />
        </div>
      </Reveal>
    );
  }

  const mediaLeft = project.layout === "media-left";
  const figure = <ProjectMedia project={project} wide={false} />;
  return (
    <Reveal
      as="article"
      className={`${card} grid grid-cols-1 items-center gap-8 lg:gap-14 ${mediaLeft ? "lg:grid-cols-[minmax(0,.78fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,.78fr)]"}`}
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
    <section id="work">
      <Reveal className="pb-8 md:pb-12">
        <Counter n={3} />
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="m-0 type-headline-l-emph text-on-surface">
            {t.work.title}
          </h2>
          <p className="m-0 type-label-l text-on-surface-variant">{t.work.summary}</p>
        </div>
      </Reveal>
      {projects.map((project, i) => (
        <ProjectCard key={project.name} project={project} index={i} labels={labels} last={i === projects.length - 1} />
      ))}
    </section>
  );
}
