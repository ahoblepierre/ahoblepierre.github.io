import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";

// Self-hosted at build time by next/font — no request to Google from the visitor's browser.
const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], variable: "--font-bricolage", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
