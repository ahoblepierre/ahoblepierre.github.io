import { THEME_STORAGE_KEY } from "./i18n";

// Runs before first paint so a saved light theme doesn't flash dark first.
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
