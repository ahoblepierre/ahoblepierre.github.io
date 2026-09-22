import type { ReactNode } from "react";
import type { Dictionary } from "@/content";
import { site } from "@/content/site";
import { ContactForm } from "../contact-form";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../icons";
import { Reveal, Stagger, StaggerItem } from "../motion";

const rowLink =
  "text-fg no-underline border-b border-[color-mix(in_srgb,var(--accent-ink)_50%,transparent)] transition-colors hover:text-accent-ink";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <StaggerItem className="flex flex-wrap justify-between gap-x-[18px] gap-y-2 border-t border-line py-4">
      <dt className="label-mono flex items-center gap-[9px]">
        {icon}
        {label}
      </dt>
      <dd className="m-0">{children}</dd>
    </StaggerItem>
  );
}

export function Contact({ t }: { t: Dictionary }) {
  const { contact } = t;
  const icon = { className: "flex-none" };
  return (
    <section id="contact" className="px-[clamp(18px,4vw,56px)] pb-[clamp(24px,3vw,40px)]">
      <Reveal className="mx-auto max-w-[1400px] rounded-[clamp(24px,3vw,40px)] bg-panel p-[clamp(28px,5vw,88px)]">
        <div className="grid grid-cols-1 items-start gap-[clamp(32px,5vw,88px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)]">
          <div>
            <h2 className="m-0 mb-[26px] max-w-[13ch] font-display text-[clamp(38px,6.6vw,96px)] leading-[.95] font-extrabold tracking-[-.04em]">
              {contact.title}
            </h2>
            <p className="m-0 mb-[clamp(30px,4vw,44px)] max-w-[44ch] text-[clamp(16.5px,1.3vw,19.5px)] text-pretty text-fg-2">
              {contact.text}
            </p>
            <Stagger as="dl" stagger={0.08} className="m-0 border-b border-line">
              <Row icon={<MailIcon {...icon} />} label={contact.labels.email}>
                <a href={`mailto:${site.email}`} className={rowLink}>
                  {site.email}
                </a>
              </Row>
              <Row icon={<LinkedInIcon {...icon} />} label={contact.labels.linkedin}>
                <a href={site.linkedin.href} target="_blank" rel="noopener noreferrer" className={rowLink}>
                  {site.linkedin.label} ↗
                </a>
              </Row>
              <Row icon={<GitHubIcon {...icon} />} label={contact.labels.github}>
                <a href={site.github.href} target="_blank" rel="noopener noreferrer" className={rowLink}>
                  {site.github.label} ↗
                </a>
              </Row>
              <Row icon={<PhoneIcon {...icon} />} label={contact.labels.phone}>
                <a href={site.phone.href} className={rowLink}>
                  {site.phone.label}
                </a>
              </Row>
              {site.cvPath && (
                <Row icon={<DownloadIcon {...icon} />} label={contact.labels.cv}>
                  <a href={site.cvPath} download className={rowLink}>
                    {contact.cvLink}
                  </a>
                </Row>
              )}
            </Stagger>
          </div>
          <ContactForm t={contact.form} accessKey={site.web3formsKey} email={site.email} />
        </div>
      </Reveal>
    </section>
  );
}
