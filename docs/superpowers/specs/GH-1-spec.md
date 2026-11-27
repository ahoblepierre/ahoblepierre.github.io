# GH-1 — Refonte du portfolio en Material 3 Expressive

Date : 2026-11-27 · Ticket : [#1](https://github.com/ahoblepierre/ahoblepierre.github.io/issues/1) ·
Branche : `feat/GH-1-material-3-expressive`

## Intention

Pierre est développeur Flutter/Android. Le portfolio doit **incarner Material 3 Expressive** et prouver
qu'on peut l'appliquer fidèlement au web : un site M3 sur ordinateur, une vraie apparence d'appli Android
sur mobile. Le site lui-même devient la démonstration du savoir-faire.

## Objectifs

- Tout le site passe en M3 Expressive : couleurs, typographie, formes, élévation, états, mouvement.
- Layout adaptatif selon les classes de taille M3 (voir « Layout »).
- **Couleur dynamique** : le visiteur choisit la couleur de base parmi 4 ; toute la palette se recalcule.
- L'ancienne version reste récupérable à tout moment (déjà fait, voir « Retour arrière »).

## Hors objectifs

- Aucun changement de contenu (textes, projets, expériences) : `content/` ne bouge pas, sauf les libellés
  nouveaux nécessaires (sélecteur de couleur, noms des couleurs) ajoutés dans `fr.ts` et `en.ts`.
- Pas de nouvelle page, pas de nouvelle section.

## Anti-objectifs (échec même si « ça marche »)

- Un site qui ressemble à du Bootstrap avec des coins arrondis : si un dev Android ne reconnaît pas M3
  Expressive au premier coup d'œil, c'est raté.
- Un flash de couleur ou de thème au chargement.
- Une régression d'accessibilité (contraste, focus clavier, `prefers-reduced-motion`) ou de perf
  (bibliothèque lourde, JS de calcul de couleur chargé par le visiteur).
- Casser FR/EN, le formulaire Web3Forms, le téléchargement du CV ou GoatCounter.

## Contraintes

- Next.js 16 en export statique (`output: "export"`), GitHub Pages, Tailwind v4, Motion. Pas de serveur.
- Lire `node_modules/next/dist/docs/` avant d'utiliser une API Next (voir `AGENTS.md`).
- Thème clair/sombre existant (`data-theme` sur `<html>`, `lib/theme-script.ts`) conservé et étendu.
- Référence M3 : le skill [hamen/material-3-skill](https://github.com/hamen/material-3-skill)
  (`skills/material-3/SKILL.md` et `references/`), en particulier les tokens `--md-sys-*`, les arrondis
  Expressive et les classes de taille.

## Approches envisagées

| Approche | Verdict |
|---|---|
| **Tokens M3 en variables CSS dans Tailwind + composants maison** | **Retenue.** Seule voie qui permet Expressive sur le web, zéro dépendance côté visiteur, garde le stack. |
| `@material/web` | Écartée : en maintenance, **n'implémente pas Expressive**, web components mal rendus en export statique (flash sans style). |
| MUI | Écartée : lourd, moteur de styles en conflit avec Tailwind, pas d'Expressive. |

## Décisions de Pierre

- **M3 Expressive** (pas M3 classique).
- **Mobile = apparence appli Android**, ordinateur = site web M3.
- **Couleur dynamique au choix du visiteur (option C)**, vert citron `#cbf547` par défaut.
- Validation de la proposition ci-dessous telle quelle (layout, 4 couleurs, FAB, Roboto Flex).

## Design

### Couleur

- 4 couleurs de base : **citron `#cbf547`** (défaut), **bleu**, **violet**, **orange** (valeurs exactes
  au choix du builder, saturées et bien distinctes).
- **La couleur choisie doit rester reconnaissable à l'écran** (le citron doit se voir en citron).
  `SchemeExpressive` fait tourner la teinte du primary loin de la couleur de base, et `SchemeTonalSpot`
  la délave : on utilise donc **`SchemeFidelity`**, qui garde la couleur de base comme primary
  (avec une version plus sombre en mode clair pour le contraste, comme l'actuel `--accent-ink`).
  Le côté « Expressive » vient des formes, de la typo et du mouvement, pas de la rotation de teinte.
  Vérifier le contraste AA des paires on-* / * pour les 8 combinaisons.
- Palettes générées avec `@material/material-color-utilities`,
  **à l'avance, pas dans le navigateur** : un script
  `scripts/generate-palettes.mjs` (devDependency) produit un fichier CSS commité, par ex.
  `app/m3-palettes.css`, avec un bloc par couleur × mode :
  `html[data-seed="lime"]`, `html[data-seed="lime"][data-theme="light"]`, etc.
- Rôles exposés en `--md-sys-color-*` (primary, on-primary, primary-container, secondary…, tertiary…,
  surface, surface-container-lowest → highest, on-surface, on-surface-variant, outline, outline-variant,
  error…) puis mappés dans `@theme inline` pour Tailwind (`bg-primary`, `text-on-surface`…).
- Le sombre reste le thème par défaut (comme aujourd'hui).
- `lib/theme-script.ts` applique aussi `data-seed` depuis `localStorage` **avant le rendu** (pas de flash).
- `viewport.themeColor` : suit au mieux la surface de la palette par défaut.

### Sélecteur de couleur

- Bouton icône 🎨 dans la barre du haut, à côté du thème et de la langue.
- Ouvre un menu M3 avec 4 pastilles rondes ; la pastille active est marquée (coche + forme).
- Choix enregistré dans `localStorage` (try/catch comme l'existant), appliqué immédiatement
  sur `<html data-seed>`.
- Accessible : bouton avec `aria-label`, menu navigable au clavier, Échap pour fermer, libellés FR/EN.

### Typographie

- **Roboto Flex** (via `next/font/google`, auto-hébergée) remplace Bricolage, Instrument Sans et
  JetBrains Mono. Supprimer les trois anciennes polices.
- Échelle M3 en tokens : display L/M/S, headline L/M/S, title L/M/S, body L/M/S, label L/M/S
  (+ variantes « emphasized » Expressive pour le hero et les titres de section).
- Les labels mono en majuscules espacées disparaissent au profit des styles `label`.
- La convention `*mot*` en couleur d'accent dans les titres est conservée (en `primary`).

### Formes, élévation, états

- Arrondis M3 en tokens : none 0, extra-small 4, small 8, medium 12, large 16, large-increased 20,
  extra-large 28, extra-large-increased 32, extra-extra-large 48, full.
- Élévation par **tons de surface** (surface-container-*), ombres légères seulement pour le FAB et les menus.
- Calques d'état M3 sur tout ce qui est interactif : survol 8 %, focus 10 %, pressé 10 % de la couleur
  « on-* ». Anneau de focus visible.
- Expressive : les boutons changent de forme à l'appui (pilule → coins moins arrondis), en ressort.

### Mouvement

- Interactions (appui, survol, indicateur actif, sélecteur) : **ressorts** Motion.
- Apparitions au scroll et transitions : courbes M3 emphasized / standard
  (valeurs CSS du skill, section « Motion »).
- `MotionConfig reducedMotion="user"` conservé.

### Layout (classes de taille M3)

| Classe | Largeur | Navigation |
|---|---|---|
| Compact | < 600px | Top app bar + **navigation bar** en bas (icônes + libellés, pastille active) + **FAB** Contact |
| Medium / Expanded | 600–1199px | Top app bar avec liens + bouton Contact ; contenu multi-colonnes ; pas de barre du bas, pas de FAB |
| Large+ | ≥ 1200px | **Navigation rail** à gauche (remplace `SectionRail`) avec un **FAB Contact en haut du rail** (motif M3), top app bar réduite au logo + réglages |

- Destinations (barre du bas et rail) : Projets, Stack, À propos, CV — avec les **libellés existants**
  (`t.nav.*`), aucun nouveau texte. « CV » défile vers `#experience` comme aujourd'hui (le téléchargement
  du PDF reste le bouton dédié). Contact = le FAB.
- Le contenu se décale de la largeur du rail sur Large+ et reste centré dans l'espace restant.

- Breakpoints Tailwind redéfinis sur ces valeurs (600 / 840 / 1200 / 1600), remplaçant 720 / 1000 / 1180.
- La section active (navigation bar et rail) est suivie au scroll, comme le fait déjà `SectionRail`.
- La top app bar passe de `surface` à `surface-container` quand on défile (comportement M3).
- Mobile : marges 16px ; ordinateur : 24px (tableau du skill).

Croquis mobile :

```
┌──────────────────────────┐
│ ●Ahoble        🎨 ☀ FR   │  top app bar
├──────────────────────────┤
│  Bonjour, je suis        │
│  Simon Pierre            │  display Expressive
│  [ Me contacter ]  (CV)  │  filled + tonal
│ ╭──────────────────────╮ │
│ │ Projet Kori          │ │  cartes 28dp
│ ╰──────────────────────╯ │
│                   ╭───╮  │
│                   │ ✉ │  │  FAB
│                   ╰───╯  │
├──────────────────────────┤
│  ▣     ◇     ☺     ≡     │  navigation bar
│ Projets Stack  Moi  CV   │
└──────────────────────────┘
```

### Composants à restyler

Tous les composants de `components/` et `components/sections/` : header + contrôles, hero et titre animé,
work (cartes projets, écrans, illustrations), build-and-method, stack-and-about, experience, contact
(formulaire → champs « outlined » M3, bouton filled), footer, page 404 (`app/global-not-found.tsx`),
`components/ui.tsx`. Les illustrations codées (Cap-Secure, SikaExchange) prennent les couleurs de la
palette active. Boutons : filled, tonal, outlined, text selon l'importance. Chips pour les technos de la stack.

## Retour arrière

- Ancienne version : branche `legacy/editorial-v1` et tag `editorial-v1` (déjà poussés).
- Le déploiement ne se déclenche que sur `main` ; revenir = remettre `main` sur ce tag (ou revert du merge)
  puis push.

## Livraison et validation

- Tout sur la branche `feat/GH-1-material-3-expressive`, **une seule PR** vers `main` : jamais de site
  moitié M3, moitié ancien en ligne.
- Validation par Pierre en local (`npm run dev` / `npm run build`) et sur des captures aux 3 classes de
  taille (mobile ~390px, tablette ~800px, ordinateur ~1440px), en clair et en sombre, avant le merge.

## Laissé au builder

- Valeurs exactes des 3 couleurs non-citron.
- Icônes (Material Symbols en SVG inline, cohérent avec `components/icons.tsx`).
- Découpage en composants partagés (`Button`, `Card`…) tant qu'il reste minimal.
- Ordre de migration des sections.
- Image OG (`public/og-image.png`) et favicon : à mettre à jour si simple, sinon hors périmètre de ce ticket.
