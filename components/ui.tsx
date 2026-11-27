import type { ReactNode } from "react";

/** "01 / 07" section counter. */
export function Counter({ n, total = 7, className = "text-primary" }: { n: number; total?: number; className?: string }) {
  const pad = (v: number) => String(v).padStart(2, "0");
  return (
    <div className={`mb-3 type-label-l ${className}`}>
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
  "text-primary underline decoration-[color-mix(in_srgb,var(--md-sys-color-primary)_40%,transparent)] underline-offset-4 transition-colors hover:decoration-current";
