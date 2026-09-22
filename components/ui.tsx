import type { ReactNode } from "react";

/** "01 / 07" section counter. */
export function Counter({ n, total = 7, className = "" }: { n: number; total?: number; className?: string }) {
  const pad = (v: number) => String(v).padStart(2, "0");
  return (
    <div className={`eyebrow mb-4 text-accent-ink ${className}`}>
      {pad(n)} / {pad(total)}
    </div>
  );
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export const underlineLink =
  "text-accent-ink no-underline border-b border-[color-mix(in_srgb,var(--accent-ink)_35%,transparent)] transition-colors hover:text-accent-hover hover:border-accent-hover";
