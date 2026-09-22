import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ScrollProgress } from "@/components/motion";
import { WhatIBuild, HowIWork } from "@/components/sections/build-and-method";
import { Contact } from "@/components/sections/contact";
import { Beyond, Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { About, Stack } from "@/components/sections/stack-and-about";
import { SelectedWork } from "@/components/sections/work";
import { getDictionary } from "@/content";
import { hasLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    // `clip` (not `hidden`) keeps the sticky header working while hiding the full-bleed overflow.
    <div className="overflow-x-clip">
      <ScrollProgress />
      <Header t={t} lang={lang} />
      <main id="top" className="mx-auto max-w-[1400px] px-[clamp(18px,4vw,56px)]">
        <Hero t={t} />
        <WhatIBuild t={t} />
        <HowIWork t={t} />
        <SelectedWork t={t} />
        <Stack t={t} />
        <About t={t} />
        <Experience t={t} />
        <Beyond t={t} />
      </main>
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
