"use client";

import { animate, motion, useInView, useMotionValue, useTransform, type Variants } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import type { ExchangeIllustration, ScheduleIllustration } from "@/content/types";
import { EASE } from "./motion";

const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 26 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function Badge({ label }: { label: string }) {
  return (
    <span className="absolute top-3 left-3 z-10 rounded-full border border-line-strong bg-[color-mix(in_srgb,var(--panel-2)_80%,transparent)] px-2.5 py-1 font-mono text-[9.5px] tracking-[.18em] text-fg-3 uppercase backdrop-blur md:top-4 md:left-4">
      {label}
    </span>
  );
}

// Agent assignments on the weekly grid: [day, shift, initials, highlighted].
const SLOTS: [number, number, string, boolean][] = [
  [0, 0, "KA", true], [0, 1, "YD", false], [1, 0, "MS", false], [1, 2, "AB", true],
  [2, 1, "FT", false], [2, 0, "KA", true], [3, 1, "OK", true], [3, 2, "YD", false],
  [4, 0, "MS", false], [4, 1, "AB", true], [5, 2, "FT", false], [5, 0, "OK", false],
  [6, 1, "KA", true], [6, 2, "MS", false],
];

/** Weekly agent rota filling in, next to the three-level scheduling model behind it. */
export function ScheduleArt({ data, className = "" }: { data: ScheduleIllustration; className?: string }) {
  const slot = (day: number, shift: number) => SLOTS.find(([d, s]) => d === day && s === shift);

  return (
    <motion.div
      role="img"
      aria-label={`${data.badge}: ${data.modelsCaption} — ${data.models.join(" → ")}`}
      className={`relative overflow-hidden bg-panel-2 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <Badge label={data.badge} />
      <div
        aria-hidden="true"
        className="absolute -top-1/3 -left-1/5 size-[70%] rounded-full bg-accent opacity-[.12] blur-[100px]"
      />

      <div className="relative grid h-full grid-cols-1 gap-[4%] p-[5%] pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,.36fr)] md:p-[4%] md:pt-[5%]">
        {/* Weekly calendar */}
        <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] grid-rows-[auto_repeat(3,minmax(0,1fr))] gap-1 md:gap-2">
          <span />
          {data.days.map((d) => (
            <motion.span key={d} variants={rise} className="pb-1 text-center font-mono text-[9px] tracking-[.14em] text-fg-3 uppercase md:text-[10px]">
              {d}
            </motion.span>
          ))}
          {data.shifts.map((shift, s) => (
            <div key={shift} className="contents">
              <motion.span variants={rise} className="self-center pr-1 font-mono text-[8.5px] tracking-[.06em] text-fg-3 md:pr-2 md:text-[10px]">
                {shift}
              </motion.span>
              {data.days.map((_, d) => {
                const hit = slot(d, s);
                return (
                  <div key={d} className="relative min-h-9 rounded-md border border-line bg-panel md:min-h-0 md:rounded-xl">
                    {hit && (
                      <motion.div
                        variants={pop}
                        className={`absolute inset-[3px] flex items-center justify-center rounded-[5px] font-mono text-[9px] font-bold tracking-[.08em] md:inset-1 md:rounded-lg md:text-[11px] ${hit[3] ? "bg-accent text-on-accent" : "border border-[color-mix(in_srgb,var(--accent-ink)_45%,transparent)] text-accent-ink"}`}
                      >
                        {hit[2]}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Data model: AgentTimeTable → TimeTable → TimeTableDay */}
        <div className="hidden flex-col justify-center md:flex">
          <motion.div variants={rise} className="mb-3 font-mono text-[10px] tracking-[.18em] text-fg-3 uppercase">
            {data.modelsCaption}
          </motion.div>
          {data.models.map((model, i) => (
            <div key={model} className="flex flex-col items-start">
              {i > 0 && (
                <div className="ml-5 flex h-7 items-center gap-2">
                  <motion.span
                    className="block h-full w-px origin-top bg-accent-ink"
                    variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.5, ease: EASE } } }}
                  />
                  <span className="font-mono text-[9px] text-fg-3">1 → n</span>
                </div>
              )}
              <motion.div
                variants={rise}
                className={`w-full rounded-xl border px-3 py-2.5 font-mono text-[11px] tracking-[.04em] lg:text-xs ${i === 0 ? "border-accent bg-accent text-on-accent" : "border-line-strong bg-panel text-fg"}`}
              >
                {model}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// XOF is pegged to the euro: 1 EUR = 655.957 XOF.
const XOF_PER_EUR = 655.957;
const SEND_XOF = 100_000;

/** Mobile-first conversion card: XOF → EUR with the received amount counting up. */
export function ExchangeArt({ data, className = "" }: { data: ExchangeIllustration; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const received = useMotionValue(0);
  const formatEur = useMemo(
    () => new Intl.NumberFormat(data.numberLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [data.numberLocale],
  );
  const receivedText = useTransform(received, (v) => formatEur.format(v));
  const sendText = new Intl.NumberFormat(data.numberLocale).format(SEND_XOF);
  const rateText = new Intl.NumberFormat(data.numberLocale, { maximumFractionDigits: 3 }).format(XOF_PER_EUR);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(received, SEND_XOF / XOF_PER_EUR, { duration: 1.6, ease: EASE, delay: 0.5 });
    return () => controls.stop();
  }, [inView, received]);

  return (
    <motion.div
      ref={ref}
      role="img"
      aria-label={`${data.badge}: ${data.send} ${sendText} XOF — ${data.receive} ${formatEur.format(SEND_XOF / XOF_PER_EUR)} EUR`}
      className={`relative flex items-center justify-center overflow-hidden bg-panel-2 px-[8%] py-14 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <Badge label={data.badge} />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-20 blur-[90px]"
      />

      <motion.div
        variants={rise}
        className="relative w-full max-w-[340px] rounded-[28px] border border-line bg-panel p-5 shadow-[0_30px_60px_rgba(0,0,0,.35)] md:p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <span className="block size-2 rounded-full bg-accent" />
          <span className="font-display text-sm font-extrabold tracking-[-.01em]">SikaExchange</span>
        </div>

        <motion.div variants={rise} className="rounded-2xl bg-panel-2 p-4">
          <div className="label-mono mb-1.5">{data.send}</div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-display text-[26px] leading-none font-extrabold tracking-[-.02em] md:text-[30px]">{sendText}</span>
            <span className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-[10px] font-bold tracking-[.12em]">XOF</span>
          </div>
        </motion.div>

        <div className="relative z-10 -my-3 flex justify-center">
          <motion.span
            variants={{ hidden: { rotate: -180, scale: 0 }, show: { rotate: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } } }}
            className="flex size-9 items-center justify-center rounded-full border-4 border-panel bg-accent text-on-accent"
            aria-hidden="true"
          >
            ↓
          </motion.span>
        </div>

        <motion.div variants={rise} className="rounded-2xl border border-[color-mix(in_srgb,var(--accent-ink)_35%,transparent)] p-4">
          <div className="label-mono mb-1.5">{data.receive}</div>
          <div className="flex items-baseline justify-between gap-3">
            <motion.span className="font-display text-[26px] leading-none font-extrabold tracking-[-.02em] text-accent-ink tabular-nums md:text-[30px]">
              {receivedText}
            </motion.span>
            <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-bold tracking-[.12em] text-on-accent">EUR</span>
          </div>
        </motion.div>

        <motion.div variants={rise} className="mt-3 mb-4 flex justify-between font-mono text-[10px] tracking-[.06em] text-fg-3">
          <span>{data.rateLabel}</span>
          <span>1 EUR = {rateText} XOF</span>
        </motion.div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          {data.methods.map((m) => (
            <motion.span key={m} variants={pop} className="rounded-full bg-panel-2 px-2 py-2 text-center text-[11px] whitespace-nowrap text-fg-2 md:px-3 md:text-[12px]">
              {m}
            </motion.span>
          ))}
        </div>

        <motion.div variants={rise} className="rounded-full bg-accent py-3 text-center text-[14px] font-semibold text-on-accent">
          {data.cta}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
