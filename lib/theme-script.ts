import seeds from "./m3-seeds.json";
import { SEED_STORAGE_KEY, THEME_STORAGE_KEY } from "./i18n";

// Runs before first paint so a saved theme or seed colour doesn't flash the defaults first.
// Unknown seeds are ignored: :root already holds the default (lime) palette.
export const themeScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark")d.setAttribute("data-theme",t);var s=localStorage.getItem(${JSON.stringify(
  SEED_STORAGE_KEY,
)});if(${JSON.stringify(seeds.map((x) => x.id))}.indexOf(s)>-1)d.setAttribute("data-seed",s)}catch(e){}})()`;
