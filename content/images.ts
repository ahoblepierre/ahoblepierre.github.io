// Placeholder photography from Unsplash — replace with real project screens
// (put them in `public/images/` and use paths like "/images/kori.webp").
const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;

export const images = {
  kori: unsplash("photo-1451187580459-43490279c0fa", 1800),
  crmEvents: unsplash("photo-1596526131083-e8c633c948d2", 900),
  pourpieces: unsplash("photo-1563986768609-322da13575f3", 900),
  capSecure: unsplash("photo-1486406146926-c627a92ad1ab", 1800),
  sikaExchange: unsplash("photo-1580519542036-c47de6196ba5", 900),
  about: unsplash("photo-1531297484001-80022131f5a1", 900),
};
