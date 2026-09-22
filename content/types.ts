// Shape of one language's content. `content/fr.ts` and `content/en.ts` must both satisfy it.
// In titles, wrap a word in *asterisks* to render it in the accent color.

export type Link = { label: string; href: string };

// Coded illustrations for products that can't be screenshotted yet (not public / in progress).
export type ScheduleIllustration = {
  kind: "schedule";
  badge: string;
  days: string[];
  shifts: string[];
  models: string[];
  modelsCaption: string;
};

export type ExchangeIllustration = {
  kind: "exchange";
  badge: string;
  send: string;
  receive: string;
  rateLabel: string;
  methods: string[];
  cta: string;
  // Number formatting locale, e.g. "fr-FR".
  numberLocale: string;
};

export type Project = {
  name: string;
  tag: string;
  tagStyle: "solid" | "outline" | "dashed";
  // "wide": full-width photo above the text; "media-right"/"media-left": photo beside the text.
  layout: "wide" | "media-right" | "media-left";
  // A photo, or phone screenshots (transparent device mockups) shown side by side instead.
  image?: { src: string; alt: string };
  screens?: { src: string; alt: string }[];
  // "mockup": cut-out device frames (default); "store": full-bleed App Store screenshots, shown as rounded cards.
  screenStyle?: "mockup" | "store";
  illustration?: ScheduleIllustration | ExchangeIllustration;
  lead: string;
  detail?: string;
  link?: Link;
  role: string;
  stack: string;
  focus: string;
};

export type ExperienceEntry = {
  period: string;
  place: string;
  current?: boolean;
  title?: string;
  bullets?: string[];
  text?: string;
  tags?: string[];
  links?: Link[];
  // Chips under the entry; those with an href are links.
  chips?: { label: string; href?: string }[];
  // Grouped smaller roles (the early years).
  roles?: { title: string; meta: string; text: string }[];
};

export type Dictionary = {
  meta: { title: string; description: string; ogDescription: string; locale: string };
  nav: {
    work: string;
    about: string;
    stack: string;
    cv: string;
    contact: string;
    toggleTheme: string;
    switchLang: string;
    sections: string;
    skip: string;
  };
  hero: {
    kicker: string;
    title: string;
    text: string;
    ctaWork: string;
    ctaCv: string;
    portraitAlt: string;
  };
  stats: { value: string; label: string; highlight?: boolean }[];
  build: { title: string; items: { title: string; text: string }[] };
  method: { title: string; flow: string; steps: { title: string; text: string }[] };
  work: {
    title: string;
    summary: string;
    labels: { role: string; stack: string; focus: string };
    projects: Project[];
  };
  stack: { title: string; note: string; groups: { name: string; items: string[] }[] };
  about: {
    lead: string;
    paragraphs: string[];
    quote: string;
    image: { src: string; alt: string };
    facts: { label: string; value: string }[];
  };
  experience: { title: string; range: string; entries: ExperienceEntry[] };
  beyond: { title: string; traits: string[] };
  contact: {
    title: string;
    text: string;
    labels: { email: string; linkedin: string; github: string; phone: string; cv: string };
    cvLink: string;
    form: {
      title: string;
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      subject: string;
    };
  };
  footer: { role: string; tagline: string };
  notFound: { title: string; text: string; back: string };
};
