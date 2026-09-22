import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (output in `out/`).
  output: "export",
  // Emit `/fr/index.html` instead of `/fr.html` so GitHub Pages serves `/fr/`.
  trailingSlash: true,
  // No image optimization server on GitHub Pages.
  images: { unoptimized: true },
  // Pin the project root (a stray lockfile in the home directory confuses detection).
  turbopack: { root: __dirname },
  experimental: {
    // The root layout lives under `app/[lang]`, so the 404 page needs its own document.
    globalNotFound: true,
  },
};

export default nextConfig;
