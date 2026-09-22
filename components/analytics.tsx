"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, type ReactNode } from "react";

type GoatCounter = { count: (vars: { path: string; title?: string; event?: boolean }) => void };

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

/**
 * GoatCounter page views (no cookies, so no consent banner needed).
 * Automatic counting is turned off so that client-side navigations
 * (e.g. switching FR ⇄ EN) are counted too.
 */
export function Analytics({ code }: { code: string }) {
  const pathname = usePathname();

  // Once the script is loaded, count every navigation. (This component can remount when the
  // language segment changes, so rely on the global rather than local state.)
  useEffect(() => {
    window.goatcounter?.count({ path: pathname });
  }, [pathname]);

  if (!code) return null;
  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      data-goatcounter-settings='{"no_onload": true}'
      strategy="afterInteractive"
      // First page view: the effect above ran before the script existed.
      onLoad={() => window.goatcounter?.count({ path: window.location.pathname })}
    />
  );
}

const NOTIFIED_KEY = "ahoble-cv-notified";

function describeVisit() {
  const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  let from = "accès direct ou inconnu";
  try {
    const ref = document.referrer ? new URL(document.referrer).hostname : "";
    if (ref && ref !== window.location.hostname) from = ref;
  } catch {
    /* keep the default */
  }
  return { device: mobile ? "mobile" : "ordinateur", from };
}

/**
 * CV download link. Besides downloading, it records a GoatCounter event and
 * emails the owner (via Web3Forms) — at most once per browser session.
 */
export function CvLink({
  href,
  fileName,
  lang,
  accessKey,
  className,
  children,
}: {
  href: string;
  fileName: string;
  lang: string;
  accessKey: string;
  className?: string;
  children: ReactNode;
}) {
  function onClick() {
    window.goatcounter?.count({ path: `cv-download-${lang}`, title: "CV téléchargé", event: true });

    if (!accessKey) return;
    try {
      if (sessionStorage.getItem(NOTIFIED_KEY)) return;
      sessionStorage.setItem(NOTIFIED_KEY, "1");
    } catch {
      /* storage unavailable: still notify */
    }

    const { device, from } = describeVisit();
    const date = new Date().toLocaleString("fr-FR", { timeZone: "Africa/Abidjan", dateStyle: "full", timeStyle: "short" });
    // Owner-facing email, always in French. No personal data about the visitor.
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "📄 Ton CV vient d'être téléchargé",
        from_name: "Portfolio",
        message: [
          "Quelqu'un vient de télécharger ton CV depuis ton portfolio.",
          "",
          `Date : ${date} (heure d'Abidjan)`,
          `Version du site : ${lang.toUpperCase()}`,
          `Appareil : ${device}`,
          `Arrivé depuis : ${from}`,
        ].join("\n"),
      }),
    }).catch(() => {
      /* never block the download */
    });
  }

  return (
    <a href={href} download={fileName} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
