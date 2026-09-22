# Portfolio — Simon Pierre AHOBLE

Site personnel bilingue (FR / EN), généré en statique avec Next.js et publié sur GitHub Pages :
**https://ahoblepierre.github.io**

- Next.js 16 (App Router, `output: "export"`), TypeScript
- Tailwind CSS v4
- Motion (ex-Framer Motion) pour les animations au scroll
- Formulaire de contact via [Web3Forms](https://web3forms.com)

## Développer en local

```bash
npm install
npm run dev        # http://localhost:3000 → redirige vers /fr/ ou /en/
npm run build      # génère le site statique dans out/
npm run lint
```

## Modifier le contenu

Tout le texte est dans `content/`, pas dans les composants :

| Fichier | Contenu |
| --- | --- |
| `content/fr.ts` / `content/en.ts` | Tous les textes, projets et expériences, par langue |
| `content/site.ts` | Email, téléphone, LinkedIn, GitHub, lien du CV |
| `content/images.ts` | Photos des projets (actuellement des images Unsplash temporaires) |
| `content/types.ts` | La structure commune aux deux langues |

Ajouter un projet = ajouter une entrée dans `work.projects` des **deux** fichiers de langue
(TypeScript signale une erreur si l'un des deux est incomplet).

Dans un titre, entourer un mot d'astérisques (`*backend*`) l'affiche en couleur d'accent.

### Le CV

1. Exporter le CV en PDF et le déposer dans `public/cv/`, par ex. `public/cv/simon-pierre-ahoble-cv.pdf`.
2. Dans `content/site.ts`, renseigner `cvPath: "/cv/simon-pierre-ahoble-cv.pdf"`.

Tant que `cvPath` vaut `null`, les boutons « Télécharger le CV » sont masqués.

### Les images de projets

Déposer les captures dans `public/images/` (WebP conseillé) et remplacer les URL dans `content/images.ts`
par des chemins du type `"/images/kori.webp"`.

## Mise en ligne (GitHub Pages)

Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.

Configuration unique :

1. Créer le dépôt **`ahoblepierre.github.io`** sur GitHub (public) et y pousser ce projet.
2. **Settings → Pages → Build and deployment → Source : GitHub Actions**.
3. Créer une clé gratuite sur [web3forms.com](https://web3forms.com) avec l'adresse qui doit recevoir les messages,
   puis l'ajouter dans **Settings → Secrets and variables → Actions → New repository secret**,
   nom : `WEB3FORMS_KEY`. Sans cette clé, le formulaire ouvre simplement la messagerie du visiteur.

## Structure

```
app/
  [lang]/layout.tsx     Document HTML, métadonnées SEO par langue
  [lang]/page.tsx       La page du portfolio (/fr/ et /en/)
  (root)/page.tsx       "/" : redirige selon la langue du navigateur
  global-not-found.tsx  Page 404 bilingue
  sitemap.ts, robots.ts
components/
  sections/             Une section de la page par fichier
  motion.tsx            Briques d'animation (Reveal, Stagger, Parallax…)
  header*.tsx           En-tête, thème clair/sombre, sélecteur de langue, rail de navigation
  contact-form.tsx      Formulaire Web3Forms
content/                Textes et données (voir plus haut)
```
