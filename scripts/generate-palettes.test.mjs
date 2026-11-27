import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Hct, argbFromHex } from "@material/material-color-utilities";
import { ROLES, buildPalettes, toCss } from "./generate-palettes.mjs";

const seeds = JSON.parse(readFileSync(new URL("../lib/m3-seeds.json", import.meta.url)));
const palettes = buildPalettes(seeds);

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

test("every seed has dark and light with all 32 roles as #rrggbb", () => {
  assert.equal(ROLES.length, 32);
  for (const { id } of seeds) {
    for (const mode of ["dark", "light"]) {
      for (const role of ROLES) assert.match(palettes[id][mode][role], /^#[0-9a-f]{6}$/, `${id} ${mode} ${role}`);
    }
  }
});

test("lime dark primary keeps the seed hue", () => {
  const seedHue = Hct.fromInt(argbFromHex("#cbf547")).hue;
  const { hue, chroma } = Hct.fromInt(argbFromHex(palettes.lime.dark.primary));
  assert.ok(Math.abs(hue - seedHue) < 15, `hue ${hue} vs seed ${seedHue}`);
  assert.ok(chroma > 40, `chroma ${chroma}: primary is washed out`);
});

test("on-* pairs reach 4.5:1 in all 8 combinations", () => {
  const pairs = ["primary", "primary-container", "secondary-container", "tertiary-container", "error", "surface"];
  for (const { id } of seeds) {
    for (const mode of ["dark", "light"]) {
      const p = palettes[id][mode];
      for (const x of pairs) {
        const ratio = contrast(p[`on-${x}`], p[x]);
        assert.ok(ratio >= 4.5, `${id} ${mode} on-${x}/${x} = ${ratio.toFixed(2)}`);
      }
    }
  }
});

test("toCss puts lime on :root", () => {
  const css = toCss(palettes);
  assert.ok(css.includes(':root, html[data-seed="lime"] {'));
  assert.ok(css.includes("--md-sys-color-primary:"));
});
