import { images } from "./images";
import type { Dictionary } from "./types";

export const fr: Dictionary = {
  meta: {
    title: "Simon Pierre AHOBLE — Développeur Full-Stack",
    description:
      "Développeur Full-Stack basé à Abidjan. Je construis des applications web et mobiles, des systèmes backend et des APIs — de l'architecture à la production.",
    ogDescription: "Je construis des produits numériques, du backend au mobile.",
    locale: "fr_FR",
  },
  nav: {
    work: "Projets",
    about: "À propos",
    stack: "Stack",
    cv: "CV",
    contact: "Contact",
    toggleTheme: "Basculer entre mode clair et sombre",
    switchLang: "Switch to English",
    sections: "Sections",
    skip: "Aller au contenu",
  },
  hero: {
    kicker: "Développeur Full-Stack",
    title: "Je construis des produits numériques, du *backend* au *mobile*.",
    text: "Je pars d'un problème métier, je conçois l'API, je développe l'application web ou mobile, je connecte les services nécessaires et je la mets en production.",
    ctaWork: "Voir les projets",
    ctaCv: "Télécharger le CV",
    portraitAlt: "Portrait de Simon Pierre AHOBLE",
  },
  stats: [
    { value: "2019", label: "Dans le métier depuis", highlight: true },
    { value: "Laravel · React Native", label: "Stack au quotidien" },
    { value: "Abidjan, CI", label: "Basé à" },
    { value: "Kori Money Transfer", label: "Actuellement chez" },
  ],
  build: {
    title: "Ce que je construis",
    items: [
      {
        title: "Systèmes backend",
        text: "APIs, logique métier, queues et jobs, webhooks, authentification et permissions. La partie que personne ne voit et dont tout dépend.",
      },
      {
        title: "Applications web & mobiles",
        text: "React, Inertia, Angular, Flutter, React Native — des interfaces qui finissent sur l'App Store et Google Play, pas dans un dossier de démo.",
      },
      {
        title: "Mise en production",
        text: "Ubuntu, Nginx, PHP-FPM, Supervisor, queue workers, schedulers, logs et déploiements. Un logiciel n'est pas fini tant qu'il ne tourne pas.",
      },
    ],
  },
  method: {
    title: "Ma méthode",
    flow: "Idée → architecture → code → produit → production",
    steps: [
      {
        title: "Comprendre",
        text: "Comprendre le problème avant de choisir la technologie. Qui l'utilise, ce qui casse aujourd'hui, ce qui doit être vrai pour que ça fonctionne.",
      },
      {
        title: "Concevoir",
        text: "Concevoir le modèle de données, les flux et la structure technique — relations, états, règles métier, et ce qui se passe quand ça échoue.",
      },
      {
        title: "Développer",
        text: "Développer de façon lisible pour le suivant : architecture orientée services, actions, jobs, events, policies et resources.",
      },
      {
        title: "Intégrer",
        text: "Connecter paiements, APIs, webhooks et services tiers — et gérer les retries, les doublons et les cas limites qui vont avec.",
      },
      {
        title: "Livrer",
        text: "Déployer, surveiller les logs, corriger ce que la production enseigne. Queue workers, schedulers, permissions, releases.",
      },
    ],
  },
  work: {
    title: "Projets sélectionnés",
    summary: "Cinq projets · 2022 — aujourd'hui",
    labels: { role: "Rôle", stack: "Stack", focus: "Focus" },
    projects: [
      {
        name: "Kori Afrique",
        tag: "Fintech · Transfert d'argent",
        tagStyle: "solid",
        layout: "wide",
        screens: [
          { src: images.koriScreens.home, alt: "Écran d'accueil de l'app Kori avec le bouton Envoyer de l'argent" },
          { src: images.koriScreens.welcome, alt: "Écran de bienvenue de l'app Kori avec les boutons Inscription et Connexion" },
          { src: images.koriScreens.send, alt: "Écran de transfert de l'app Kori : 70 000 XOF convertis en 105 EUR" },
        ],
        lead: "Transfert d'argent international sur les corridors UEMOA et CEMAC, plus les transferts vers le Canada et l'Europe. Côté backend : recharge de carte Intercash, cartes virtuelles, création et récupération des transactions, remitters, KYC, OTP, referrals et QR tracking, avec les jobs asynchrones et les webhooks derrière les mouvements d'argent.",
        detail:
          "Côté mobile : paiements, redirections WebView, PIN keypad, biométrie, Face ID et notifications push. En production : Ubuntu, Nginx, PHP-FPM, Supervisor, queues et scheduler Laravel, déploiement GitLab, permissions et logs.",
        link: {
          label: "Google Play",
          href: "https://play.google.com/store/search?q=kori%20afrique&c=apps&hl=fr",
        },
        role: "Développeur Full-Stack & Mobile",
        stack: "Laravel · React Native · Inertia.js · Spring Boot · Angular · MySQL",
        focus: "Paiements · Transactions · KYC & OTP · Queues · Webhooks · Production",
      },
      {
        name: "CRM Events",
        tag: "Application mobile",
        tagStyle: "outline",
        layout: "media-right",
        screens: [
          { src: images.crmEventsScreens.login, alt: "Écran de connexion de CRM Events" },
          { src: images.crmEventsScreens.vendors, alt: "Liste des prestataires de CRM Events avec lieux, prix et devis" },
          { src: images.crmEventsScreens.events, alt: "Écran d'accueil de CRM Events listant les événements à venir" },
        ],
        lead: "Application mobile cross-platform développée avec React Native et Expo, livrée sur iOS et Android. Notifications push, TestFlight et App Store Connect, builds Android et configuration native — versions, build numbers, credentials et les problèmes de compatibilité des librairies natives qui vont avec.",
        role: "Développeur mobile",
        stack: "React Native · Expo · EAS · Hermes",
        focus: "iOS · Android · Push · Releases",
      },
      {
        name: "Pourpièces",
        tag: "Mobile · App Store",
        tagStyle: "outline",
        layout: "media-left",
        screenStyle: "store",
        screens: [
          { src: images.pourpiecesScreens.categories, alt: "Capture App Store de Pourpièces : toutes les catégories" },
          { src: images.pourpiecesScreens.home, alt: "Capture App Store de Pourpièces : la 1ère plateforme dédiée aux objets cassés" },
          { src: images.pourpiecesScreens.filters, alt: "Capture App Store de Pourpièces : filtres de recherche par ville, code postal et pays" },
        ],
        lead: "Application mobile menée jusqu'au bout du processus de review Apple : screenshots, metadata, association seller et société, In-App Purchase. Une grande part du travail n'avait rien à voir avec le code — gestion des abonnements et conformité App Store.",
        role: "Développeur mobile",
        stack: "React Native · iOS · In-App Purchase",
        focus: "Abonnements · Review · Conformité",
      },
      {
        name: "Cap-Secure",
        tag: "Entreprise · Plateforme de sécurité",
        tagStyle: "outline",
        layout: "wide",
        image: { src: images.capSecure, alt: "Tours de bureaux photographiées en contre-plongée" },
        lead: "Plateforme de sécurité et de gestion : authentification mobile avec Sanctum, guards, rôles et gestion des agents, et le modèle d'horaires en dessous — AgentTimeTable, TimeTable, TimeTableDay — rendu dans un calendrier fonctionnel avec Syncfusion.",
        role: "Développeur backend",
        stack: "Laravel · Sanctum · Syncfusion · MySQL",
        focus: "Authentification · Rôles & guards · Planification",
      },
      {
        name: "SikaExchange",
        tag: "Produit personnel · En cours",
        tagStyle: "dashed",
        layout: "media-right",
        image: { src: images.sikaExchange, alt: "Billets de plusieurs pays disposés ensemble" },
        lead: "Mon propre produit : convertir le XOF et le XAF en EUR et USD pour des utilisateurs d'Afrique de l'Ouest, avec Mobile Money, Orange Money, MTN, Moov et les banques dans le périmètre. Je conçois moi-même le dashboard, l'UX mobile-first, les notifications, l'identité visuelle, l'architecture et la logique métier.",
        role: "Fondateur & développeur",
        stack: "Laravel · Inertia · React · PostgreSQL · Tailwind · shadcn/ui",
        focus: "Conversion de devises · Mobile Money · Design produit",
      },
    ],
  },
  stack: {
    title: "Technologies",
    note: "Groupées par domaine, pas en mur de logos",
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
        items: ["Flutter", "Dart", "React Native", "Expo · EAS", "iOS", "Android", "Notifications push", "Biométrie · Face ID"],
      },
      {
        name: "Infrastructure",
        items: ["Linux · Ubuntu", "Nginx", "PHP-FPM", "Supervisor", "Cron", "Git · GitLab", "AWS", "DigitalOcean"],
      },
      {
        name: "Données",
        items: ["PostgreSQL", "MySQL", "MariaDB", "SQL Server", "Relations & modélisation"],
      },
    ],
  },
  about: {
    lead: "Je suis développeur Full-Stack, passionné par la construction d'applications web et mobiles fiables qui résolvent de vrais problèmes.",
    paragraphs: [
      "Mon expérience couvre le développement backend, les applications web, le mobile, les APIs, les intégrations de services tiers et les environnements de production. Je travaille principalement avec Laravel, PHP, React, TypeScript, Flutter et React Native, ainsi qu'avec Spring Boot, Flask, Angular et Vue.js.",
      "J'aime travailler sur tout le cycle de vie du logiciel — de la conception des structures de données et de la logique métier à la construction des interfaces, l'intégration de services externes et le déploiement en production.",
      "Je suis curieux de nature et j'aime apprendre de nouvelles technologies, passer d'un écosystème à l'autre et trouver des solutions pratiques à des problèmes techniques complexes.",
    ],
    quote:
      "Pour moi, être développeur ne consiste pas seulement à écrire du code. C'est comprendre le problème, concevoir la bonne solution et livrer un logiciel que les gens peuvent réellement utiliser.",
    image: { src: images.about, alt: "Un ordinateur portable sur un bureau sombre, éclairé d'une lumière chaude" },
    facts: [
      {
        label: "Formation",
        value:
          "Ingénieur des travaux informatiques, option Génie Logiciel — Institut Africain d'Informatique, Lomé (2015 — 2019)",
      },
    ],
  },
  experience: {
    title: "Expérience",
    range: "Lomé → Abidjan · 2019 — 2026",
    entries: [
      {
        period: "2024 —",
        place: "Aujourd'hui · Abidjan",
        current: true,
        title: "Développeur web & mobile — Kori Money Transfer",
        bullets: [
          "Développement d'une solution full-stack de contrôle et d'audit — services Spring Boot et front-end Angular — pour superviser et analyser les données métier.",
          "Développement d'une application mobile cross-platform React Native connectée à une API Laravel, avec un dashboard d'administration Laravel + Inertia.js en SPA intégrée.",
          "Maintenance d'une application full-stack Flask / Angular en production : correction d'anomalies, performances et évolutions fonctionnelles.",
        ],
        tags: ["Laravel", "React Native", "Inertia.js", "Spring Boot", "Angular", "Flask"],
      },
      {
        period: "2023 — 2024",
        place: "Abidjan",
        title: "Développeur web & mobile — Tinitz",
        bullets: [
          "Conception et développement d'applications web et de sites avec PHP et Laravel, et d'applications mobiles avec Flutter.",
          "Livrés : Presse Côte d'Ivoire, Pharma Consult (web et mobile), Joobho (web et mobile) et TINITZ Display.",
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
        title: "Développeur web & mobile freelance — Firewall Agency",
        text: "Applications et sites web Laravel, dont le site e-commerce ahoundjue-tech.",
        links: [{ label: "ahoundjue-tech.com", href: "https://www.ahoundjue-tech.com/" }],
      },
      {
        period: "2022",
        place: "Lomé",
        title: "Développeur web & mobile — Digital Deep Vision",
        text: "APIs backend Laravel pour le mobile, sites web et applications Flutter — dont l'application e-commerce eSugu.",
        links: [
          { label: "eSugu · Google Play", href: "https://play.google.com/store/apps/details?id=com.santechafrica.esugu" },
        ],
      },
      {
        period: "2019 — 2022",
        place: "Lomé · Premières années",
        roles: [
          { title: "Développeur — Roots-Technologie", meta: "2022", text: "Sites web Odoo et modules sur mesure avec Odoo Studio." },
          { title: "Informaticien — Tout Va Bien SARL CI", meta: "2022 · Abidjan", text: "Gestion du parc informatique et assistance aux utilisateurs." },
          {
            title: "Développeur web & mobile — KBE Technologie",
            meta: "2021 — 2022",
            text: "Applications web Laravel : une application pour un laboratoire et une application de comptage de mots dans un fichier.",
          },
          { title: "Consultant informatique — HIT-T SARL", meta: "2020 — 2021", text: "Réalisation d'applications web et consultation de projets informatiques." },
          {
            title: "Formateur & développeur web — Sakacom IIMT",
            meta: "2019 — 2020",
            text: "Développement de sites web et formation en HTML5, CSS3 et WordPress.",
          },
        ],
      },
      {
        period: "En freelance",
        place: "En parallèle",
        text: "Sites et applications Laravel livrés en indépendant.",
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
    title: "Au-delà du code",
    traits: ["Curiosité", "Résolution de problèmes", "Apprentissage", "Vision produit", "Adaptabilité"],
  },
  contact: {
    title: "Construisons quelque chose.",
    text: "Une idée, un produit ou un défi technique ? Transformons-le en quelque chose de réel.",
    labels: { email: "Email", linkedin: "LinkedIn", github: "GitHub", phone: "Téléphone", cv: "CV" },
    cvLink: "Télécharger (PDF)",
    form: {
      title: "Envoyer un message",
      name: "Nom",
      email: "Email",
      message: "Message",
      submit: "Envoyer le message",
      sending: "Envoi…",
      success: "Merci — votre message est bien parti. Je vous réponds rapidement.",
      error: "L'envoi a échoué. Réessayez ou écrivez-moi directement par email.",
      subject: "Nouveau message depuis le portfolio",
    },
  },
  footer: {
    role: "Développeur Full-Stack · Abidjan, Côte d'Ivoire",
    tagline: "Conçu & développé avec curiosité.",
    credit: "Photos : Unsplash",
  },
  notFound: {
    title: "Page introuvable.",
    text: "Cette page n'existe pas — ou plus.",
    back: "Retour au portfolio",
  },
};
