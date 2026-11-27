import { Roboto_Flex } from "next/font/google";

// Self-hosted at build time by next/font — no request to Google from the visitor's browser.
// Variable font: the wdth/opsz axes give the Expressive emphasized styles.
const roboto = Roboto_Flex({ subsets: ["latin"], axes: ["opsz", "wdth"], variable: "--font-roboto-flex", display: "swap" });

export const fontVariables = roboto.variable;
