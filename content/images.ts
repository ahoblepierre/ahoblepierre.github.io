// Placeholder photography from Unsplash — replace with real project screens
// (put them in `public/images/` and use paths like "/images/kori.webp").
const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;

export const images = {
  // Real app screens (device mockups with transparent background).
  koriScreens: {
    home: "/images/kori/home.webp",
    welcome: "/images/kori/welcome.webp",
    send: "/images/kori/send.webp",
  },
  crmEventsScreens: {
    login: "/images/crm-events/login.webp",
    vendors: "/images/crm-events/vendors.webp",
    events: "/images/crm-events/events.webp",
  },
  // App Store marketing screenshots (full-bleed, not cut out).
  pourpiecesScreens: {
    categories: "/images/pourpieces/categories.webp",
    home: "/images/pourpieces/home.webp",
    filters: "/images/pourpieces/filters.webp",
  },
  capSecure: unsplash("photo-1486406146926-c627a92ad1ab", 1800),
  sikaExchange: unsplash("photo-1580519542036-c47de6196ba5", 900),
  about: unsplash("photo-1531297484001-80022131f5a1", 900),
};
