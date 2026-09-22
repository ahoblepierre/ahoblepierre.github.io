import { images } from "./images";
import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "Simon Pierre AHOBLE — Full-Stack Developer",
    description:
      "Full-Stack Developer based in Abidjan. I build web and mobile applications, backend systems and APIs — from architecture to production.",
    ogDescription: "I build digital products from backend to mobile.",
    locale: "en_US",
  },
  nav: {
    work: "Work",
    about: "About",
    stack: "Stack",
    cv: "CV",
    contact: "Contact",
    toggleTheme: "Toggle light and dark mode",
    switchLang: "Passer en français",
    sections: "Sections",
    skip: "Skip to content",
  },
  hero: {
    kicker: "Full-Stack Developer",
    title: "I build digital products from *backend* to *mobile*.",
    text: "I take a business problem, design the API, build the web or mobile app, connect the services it needs and put it into production.",
    ctaWork: "See selected work",
    ctaCv: "Download CV",
    portraitAlt: "Portrait of Simon Pierre AHOBLE",
  },
  stats: [
    { value: "2019", label: "Working in the field since", highlight: true },
    { value: "Laravel · React Native", label: "Daily stack" },
    { value: "Abidjan, CI", label: "Based in" },
    { value: "Kori Money Transfer", label: "Currently at" },
  ],
  build: {
    title: "What I build",
    items: [
      {
        title: "Backend systems",
        text: "APIs, business logic, queues and jobs, webhooks, authentication and permissions. The part nobody sees and everything depends on.",
      },
      {
        title: "Web & mobile apps",
        text: "React, Inertia, Angular, Flutter, React Native — interfaces that end up on the App Store and Google Play, not in a demo folder.",
      },
      {
        title: "Production",
        text: "Ubuntu, Nginx, PHP-FPM, Supervisor, queue workers, schedulers, logs and deployments. Software isn't finished until it runs.",
      },
    ],
  },
  method: {
    title: "How I work",
    flow: "Idea → architecture → code → product → production",
    steps: [
      {
        title: "Understand",
        text: "Understand the problem before choosing the technology. Who uses it, what breaks today, what has to be true for it to work.",
      },
      {
        title: "Architect",
        text: "Design the data model, the flows and the technical structure — relations, states, business rules, and what happens when something fails.",
      },
      {
        title: "Build",
        text: "Build it so the next person can read it: service-oriented structure, actions, jobs, events, policies and resources.",
      },
      {
        title: "Integrate",
        text: "Connect payments, APIs, webhooks and third-party services — and handle the retries, duplicates and edge cases they bring.",
      },
      {
        title: "Ship",
        text: "Deploy, watch the logs, fix what production teaches you. Queue workers, schedulers, permissions, releases.",
      },
    ],
  },
  work: {
    title: "Selected work",
    summary: "Five projects · 2022 — today",
    labels: { role: "Role", stack: "Stack", focus: "Focus" },
    projects: [
      {
        name: "Kori Afrique",
        tag: "Fintech · Money Transfer",
        tagStyle: "solid",
        layout: "wide",
        image: { src: images.kori, alt: "City lights across the earth seen from orbit at night" },
        lead: "International money transfer across the UEMOA and CEMAC corridors, plus transfers to Canada and Europe. On the backend: Intercash card top-ups, virtual cards, transaction creation and retrieval, remitters, KYC, OTP, referrals and QR tracking, with asynchronous jobs and webhooks behind the money movement.",
        detail:
          "On mobile: payments, WebView redirections, PIN keypad, biometrics, Face ID and push notifications. In production: Ubuntu, Nginx, PHP-FPM, Supervisor, Laravel queues and scheduler, GitLab deployments, permissions and logs.",
        link: {
          label: "Google Play",
          href: "https://play.google.com/store/search?q=kori%20afrique&c=apps&hl=en",
        },
        role: "Full-Stack & Mobile Developer",
        stack: "Laravel · React Native · Inertia.js · Spring Boot · Angular · MySQL",
        focus: "Payments · Transactions · KYC & OTP · Queues · Webhooks · Production",
      },
      {
        name: "CRM Events",
        tag: "Mobile Application",
        tagStyle: "outline",
        layout: "media-right",
        image: { src: images.crmEvents, alt: "Close-up of a phone home screen showing a notification badge" },
        lead: "A cross-platform mobile application built with React Native and Expo, shipped to both iOS and Android. Push notifications, TestFlight and App Store Connect, Android builds and native configuration — including version numbers, build numbers, credentials and the native library compatibility problems that come with them.",
        role: "Mobile Developer",
        stack: "React Native · Expo · EAS · Hermes",
        focus: "iOS · Android · Push · Releases",
      },
      {
        name: "Pourpièces",
        tag: "Mobile · App Store",
        tagStyle: "outline",
        layout: "media-left",
        image: { src: images.pourpieces, alt: "Hands holding a phone beside an open laptop" },
        lead: "A mobile application taken all the way through Apple's review process: screenshots, metadata, seller and company association, In-App Purchase. A large part of the work had nothing to do with writing code — subscription handling and App Store compliance.",
        role: "Mobile Developer",
        stack: "React Native · iOS · In-App Purchase",
        focus: "Subscriptions · Store review · Compliance",
      },
      {
        name: "Cap-Secure",
        tag: "Enterprise · Security Platform",
        tagStyle: "outline",
        layout: "wide",
        image: { src: images.capSecure, alt: "Office towers photographed looking upward" },
        lead: "A security and management platform: mobile authentication with Sanctum, guards, roles and agent management, and the scheduling model underneath it — AgentTimeTable, TimeTable, TimeTableDay — rendered onto a working calendar with Syncfusion.",
        role: "Backend Developer",
        stack: "Laravel · Sanctum · Syncfusion · MySQL",
        focus: "Authentication · Roles & guards · Scheduling",
      },
      {
        name: "SikaExchange",
        tag: "Personal product · In progress",
        tagStyle: "dashed",
        layout: "media-right",
        image: { src: images.sikaExchange, alt: "Banknotes from several countries laid out together" },
        lead: "My own product: converting XOF and XAF into EUR and USD for users in West Africa, with Mobile Money, Orange Money, MTN, Moov and banks in scope. I'm designing the dashboard, the mobile-first UX, the notifications, the visual identity, the architecture and the business logic myself.",
        role: "Founder & Developer",
        stack: "Laravel · Inertia · React · PostgreSQL · Tailwind · shadcn/ui",
        focus: "Currency conversion · Mobile Money · Product design",
      },
    ],
  },
  stack: {
    title: "Technology",
    note: "Grouped by domain, not by logo wall",
    groups: [
      {
        name: "Backend",
        items: ["PHP", "Laravel", "Symfony", "Java", "Spring Boot", "Python", "Flask", "REST APIs", "Sanctum", "Eloquent", "Queues & Jobs", "Events", "Webhooks"],
      },
      {
        name: "Web",
        items: ["JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Inertia.js", "Vite", "Tailwind CSS", "shadcn/ui"],
      },
      {
        name: "Mobile",
        items: ["Flutter", "Dart", "React Native", "Expo · EAS", "iOS", "Android", "Push notifications", "Biometrics · Face ID"],
      },
      {
        name: "Infrastructure",
        items: ["Linux · Ubuntu", "Nginx", "PHP-FPM", "Supervisor", "Cron", "Git · GitLab", "AWS", "DigitalOcean"],
      },
      {
        name: "Data",
        items: ["PostgreSQL", "MySQL", "MariaDB", "SQL Server", "Relations & modelling"],
      },
    ],
  },
  about: {
    lead: "I'm a Full-Stack Developer passionate about building reliable web and mobile applications that solve real-world problems.",
    paragraphs: [
      "My experience spans backend development, web applications, mobile development, APIs, third-party integrations and production environments. I mainly work with Laravel, PHP, React, TypeScript, Flutter and React Native, while also working with technologies such as Spring Boot, Flask, Angular and Vue.js.",
      "I enjoy working across the entire software development lifecycle — from designing database structures and business logic to building user interfaces, integrating external services and deploying applications to production.",
      "I'm naturally curious and enjoy learning new technologies, switching between ecosystems and finding practical solutions to complex technical problems.",
    ],
    quote:
      "For me, being a developer is not only about writing code. It is about understanding the problem, designing the right solution and delivering software that people can actually use.",
    image: { src: images.about, alt: "A laptop on a dark desk lit by warm light" },
    facts: [
      {
        label: "Education",
        value: "Software Engineering degree — Institut Africain d'Informatique, Lomé (2015 — 2019)",
      },
    ],
  },
  experience: {
    title: "Experience",
    range: "Lomé → Abidjan · 2019 — 2026",
    entries: [
      {
        period: "2024 —",
        place: "Now · Abidjan",
        current: true,
        title: "Web & Mobile Developer — Kori Money Transfer",
        bullets: [
          "Built a full-stack control and audit solution — Spring Boot services with an Angular front end — for supervising and analysing business data.",
          "Built a cross-platform React Native application against a Laravel API, with a Laravel + Inertia.js admin dashboard as an integrated SPA.",
          "Maintained a full-stack Flask / Angular application in production: bug fixes, performance work and feature evolution.",
        ],
        tags: ["Laravel", "React Native", "Inertia.js", "Spring Boot", "Angular", "Flask"],
      },
      {
        period: "2023 — 2024",
        place: "Abidjan",
        title: "Web & Mobile Developer — Tinitz",
        bullets: [
          "Designed and built web applications and websites with PHP and Laravel, and mobile applications with Flutter.",
          "Shipped: Presse Côte d'Ivoire, Pharma Consult (web and mobile), Joobho (web and mobile) and TINITZ Display.",
        ],
        links: [
          { label: "pressecotedivoire.ci", href: "https://www.pressecotedivoire.ci/" },
          { label: "pharma-consults.net", href: "https://pharma-consults.net/" },
          { label: "joobho.com", href: "https://joobho.com/" },
        ],
      },
      {
        period: "2022 — 2023",
        place: "Abidjan",
        title: "Freelance Web & Mobile Developer — Firewall Agency",
        text: "Laravel web applications and websites, including the ahoundjue-tech e-commerce site.",
        links: [{ label: "ahoundjue-tech.com", href: "https://www.ahoundjue-tech.com/" }],
      },
      {
        period: "2022",
        place: "Lomé",
        title: "Web & Mobile Developer — Digital Deep Vision",
        text: "Laravel backend APIs for mobile, websites, and Flutter applications — including the eSugu e-commerce app.",
        links: [
          { label: "eSugu · Google Play", href: "https://play.google.com/store/apps/details?id=com.santechafrica.esugu" },
        ],
      },
      {
        period: "2019 — 2022",
        place: "Lomé · Early years",
        roles: [
          { title: "Developer — Roots-Technologie", meta: "2022", text: "Odoo websites and custom modules built with Odoo Studio." },
          { title: "IT Officer — Tout Va Bien SARL CI", meta: "2022 · Abidjan", text: "IT estate management and user support." },
          {
            title: "Web & Mobile Developer — KBE Technologie",
            meta: "2021 — 2022",
            text: "Laravel web applications: a laboratory management application and a file word-count application.",
          },
          { title: "IT Consultant — HIT-T SARL", meta: "2020 — 2021", text: "Web applications and consulting on IT projects." },
          {
            title: "Trainer & Web Developer — Sakacom IIMT",
            meta: "2019 — 2020",
            text: "Website development, and training in HTML5, CSS3 and WordPress.",
          },
        ],
      },
      {
        period: "Freelance",
        place: "Alongside",
        text: "Laravel sites and applications delivered independently.",
        chips: [
          { label: "Caddyl Cook", href: "https://caddyl.com" },
          { label: "Caddyl Feyd", href: "https://caddylfeyd.com" },
          { label: "Immobilier Was", href: "https://immobilier-was.com" },
          { label: "Gria" },
          { label: "Starbills" },
        ],
      },
    ],
  },
  beyond: {
    title: "Beyond code",
    traits: ["Curiosity", "Problem solving", "Learning", "Product thinking", "Adaptability"],
  },
  contact: {
    title: "Let's build something.",
    text: "Have an idea, a product or a technical challenge? Let's turn it into something real.",
    labels: { email: "Email", linkedin: "LinkedIn", github: "GitHub", phone: "Phone", cv: "CV" },
    cvLink: "Download (PDF)",
    form: {
      title: "Send a message",
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      success: "Thanks — your message is on its way. I'll get back to you soon.",
      error: "Something went wrong. Please try again or email me directly.",
      subject: "New message from the portfolio",
    },
  },
  footer: {
    role: "Full-Stack Developer · Abidjan, Côte d'Ivoire",
    tagline: "Designed & built with curiosity.",
    credit: "Photography: Unsplash",
  },
  notFound: {
    title: "Page not found.",
    text: "This page doesn't exist — or not anymore.",
    back: "Back to the portfolio",
  },
};
