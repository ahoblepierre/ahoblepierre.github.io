import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { MotionProvider } from "@/components/motion";
import { getDictionary } from "@/content";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { hasLocale, locales } from "@/lib/i18n";
import { themeScript } from "@/lib/theme-script";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}/`,
      languages: { fr: "/fr/", en: "/en/", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}/`,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.ogDescription,
      locale: t.meta.locale,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.ogDescription,
      images: ["/og-image.png"],
    },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
