import type { Dictionary } from "@/content";
import { site } from "@/content/site";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../icons";

const iconLink =
  "inline-flex size-[46px] items-center justify-center rounded-full border border-line-strong text-fg-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-ink hover:bg-accent hover:text-on-accent";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="px-[clamp(18px,4vw,56px)] pt-[clamp(28px,4vw,56px)] pb-[82px] md:pb-[clamp(40px,4vw,60px)]">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div>
          <div className="font-display text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-[-.03em]">{site.name}</div>
          <div className="mt-2 font-mono text-[10.5px] tracking-[.18em] text-fg-3 uppercase">{t.footer.role}</div>
        </div>
        <div className="flex flex-wrap gap-2.5">
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
        <div className="flex w-full flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-5 text-[12.5px] text-fg-3">
          <span>
            © {new Date().getFullYear()} {site.name} · {t.footer.tagline}
          </span>
          <span>{t.footer.credit}</span>
        </div>
      </div>
    </footer>
  );
}
