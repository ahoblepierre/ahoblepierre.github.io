import type { Dictionary } from "@/content";
import { site } from "@/content/site";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../icons";

const iconLink =
  "state-layer inline-flex size-12 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant transition-[border-radius] duration-300 motion-reduce:transition-none hover:rounded-full";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="px-4 pt-8 pb-6 md:px-6 md:pb-12">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div>
          <div className="type-headline-s font-bold text-on-surface">{site.name}</div>
          <div className="mt-1 type-label-l text-on-surface-variant">{t.footer.role}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={site.github.href} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className={iconLink}>
            <GitHubIcon size={19} />
          </a>
          <a href={site.linkedin.href} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className={iconLink}>
            <LinkedInIcon size={19} />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email" title={site.email} className={iconLink}>
            <MailIcon size={19} />
          </a>
          <a href={site.phone.href} aria-label={t.contact.labels.phone} title={site.phone.label} className={iconLink}>
            <PhoneIcon size={19} />
          </a>
        </div>
        <div className="flex w-full flex-wrap justify-between gap-x-6 gap-y-2 border-t border-outline-variant pt-5 type-body-s text-on-surface-variant">
          <span>
            © {new Date().getFullYear()} {site.name} · {t.footer.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
