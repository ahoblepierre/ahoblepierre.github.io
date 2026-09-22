import { LANG_STORAGE_KEY, defaultLocale } from "@/lib/i18n";

// GitHub Pages has no server redirects, so "/" picks the language in the browser:
// the visitor's last choice, else the browser language, else French.
const redirectScript = `(function(){var l;try{l=localStorage.getItem(${JSON.stringify(LANG_STORAGE_KEY)})}catch(e){}
if(l!=="fr"&&l!=="en"){var n=(navigator.languages&&navigator.languages[0])||navigator.language||"";l=/^en/i.test(n)?"en":${JSON.stringify(defaultLocale)}}
location.replace("/"+l+"/"+location.hash)})()`;

export default function RootRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      </noscript>
      {/* Plain links on purpose: this page has its own root layout, so navigation is a full load anyway. */}
      {/* eslint-disable @next/next/no-html-link-for-pages */}
      <p style={{ padding: 24 }}>
        <a href="/fr/" style={{ color: "#cbf547" }}>
          Français
        </a>{" "}
        ·{" "}
        <a href="/en/" style={{ color: "#cbf547" }}>
          English
        </a>
      </p>
      {/* eslint-enable @next/next/no-html-link-for-pages */}
    </>
  );
}
