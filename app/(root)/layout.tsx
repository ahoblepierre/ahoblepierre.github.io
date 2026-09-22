import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/site";

// Separate root layout for "/", which only redirects to /fr/ or /en/.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Full-Stack Developer`,
  alternates: { canonical: "/", languages: { fr: "/fr/", en: "/en/" } },
  robots: { index: false, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "#0a0a0b", color: "#f3f3f0", fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
