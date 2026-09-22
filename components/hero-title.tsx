"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "./motion";

type Phase = "hold" | "delete" | "type";

const WORD_STAGGER = 0.07;
const TYPE_MS = 85;
const DELETE_MS = 45;
const HOLD_MS = 2200;

/** One word sliding up from behind an invisible line. */
function RevealWord({ children, index, accent }: { children: string; index: number; accent: boolean }) {
  return (
    // Padding + negative margin keep descenders (p, q, g) from being clipped by the mask.
    <span className="-mb-[.14em] inline-block overflow-hidden pb-[.14em] align-bottom">
      <motion.span
        className={`inline-block ${accent ? "text-accent-ink" : ""}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 + index * WORD_STAGGER }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Headline that rises in word by word, then keeps retyping its last word
 * ("mobile" → "web" → "cloud"…) with a blinking caret.
 */
export function HeroTitle({ lead, words, end }: { lead: string; words: string[]; end: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(words[0].length);
  const [phase, setPhase] = useState<Phase>("hold");
  const [first, setFirst] = useState(true);

  // "*word*" marks a word shown in the accent color.
  const leadWords = lead.split(" ").map((w) => ({ text: w.replace(/\*/g, ""), accent: w.startsWith("*") }));
  const word = words[index];
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  // Wait for the word-by-word entrance to finish before the first retype.
  const firstHold = (0.15 + (leadWords.length + 1) * WORD_STAGGER + 0.8) * 1000 + HOLD_MS;

  useEffect(() => {
    if (reduce || words.length < 2) return;
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "hold") {
      timer = setTimeout(() => {
        setFirst(false);
        setPhase("delete");
      }, first ? firstHold : HOLD_MS);
    } else if (phase === "delete") {
      timer =
        chars > 0
          ? setTimeout(() => setChars(chars - 1), DELETE_MS)
          : setTimeout(() => {
              setIndex((index + 1) % words.length);
              setPhase("type");
            }, 250);
    } else {
      timer = chars < word.length ? setTimeout(() => setChars(chars + 1), TYPE_MS) : setTimeout(() => setPhase("hold"), 0);
    }
    return () => clearTimeout(timer);
  }, [reduce, words.length, phase, chars, index, word.length, first, firstHold]);

  const sentence = `${lead.replace(/\*/g, "")} ${words[0]}${end}`;

  return (
    <>
      {/* The full sentence for search engines and screen readers; the animated copy is decorative. */}
      <span className="sr-only">{sentence}</span>
      <span aria-hidden="true">
        {leadWords.map((w, i) => (
          <span key={i}>
            <RevealWord index={i} accent={w.accent}>
              {w.text}
            </RevealWord>{" "}
          </span>
        ))}
        <span className="-mb-[.14em] inline-block overflow-hidden pb-[.14em] align-bottom">
          <motion.span
            className="inline-block whitespace-nowrap"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 + leadWords.length * WORD_STAGGER }}
          >
            {/* The invisible longest word reserves the width, so the line never reflows while typing. */}
            <span className="inline-grid">
              <span className="invisible [grid-area:1/1]">
                {longest}
                {end}
              </span>
              {/* The period follows the typed word; the reserved space trails after it, out of sight. */}
              <span className="[grid-area:1/1]">
                <span className="text-accent-ink">{word.slice(0, chars)}</span>
                <span
                  className={`ml-[.04em] inline-block h-[.78em] w-[.07em] translate-y-[.06em] bg-accent-ink align-baseline ${phase === "hold" ? "animate-[caret-blink_1s_steps(1)_infinite]" : ""} motion-reduce:hidden`}
                />
                {end}
              </span>
            </span>
          </motion.span>
        </span>
      </span>
    </>
  );
}
