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
      <body style={{ margin: 0, background: "#12140a", color: "#e2e4d2", fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
