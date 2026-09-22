// Language-independent details. Edit here, not in the components.
export const site = {
  url: "https://ahoblepierre.github.io",
  name: "Simon Pierre AHOBLE",
  email: "pierreahoble.dev@gmail.com",
  phone: { label: "+225 01 53 81 57 03", href: "tel:+2250153815703" },
  linkedin: { label: "in/pierreahoble", href: "https://www.linkedin.com/in/pierreahoble/" },
  github: { label: "github.com/ahoblepierre", href: "https://github.com/ahoblepierre" },

  // Drop the PDF into `public/cv/` and set its path, e.g. "/cv/simon-pierre-ahoble-cv.pdf".
  // While this is null, every "Download CV" link is hidden.
  cvPath: "/cv/AHOBLE-CV.pdf" as string | null,
  // Name the file gets when downloaded.
  cvFileName: "Simon-Pierre-AHOBLE-CV.pdf",

  // Web3Forms access key (https://web3forms.com). Injected at build time from the
  // WEB3FORMS_KEY repository secret. Without it, the form falls back to opening an email.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
};
