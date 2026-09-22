"use client";

import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, type ReactNode } from "react";

// The mockup's easing curve, reused everywhere so motion feels consistent.
export const EASE = [0.16, 0.84, 0.26, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

type Tag = "div" | "section" | "article" | "li" | "ul" | "ol" | "figure" | "span" | "p" | "dl";

type BaseProps = {
  as?: Tag;
  className?: string;
  children?: ReactNode;
  id?: string;
};

/** Honors the OS "reduce motion" setting for every animation below. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ as = "div", className, children, id, delay = 0, y = 26 }: BaseProps & { delay?: number; y?: number }) {
  const Component = motion[as];
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Reveals its <StaggerItem> children one after the other when scrolled into view. */
export function Stagger({ as = "div", className, children, id, stagger = 0.08 }: BaseProps & { stagger?: number }) {
  const Component = motion[as];
  return (
    <Component
      id={id}
      className={className}
      variants={staggerParent}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ as = "div", className, children }: BaseProps) {
  const Component = motion[as];
  return (
    <Component className={className} variants={staggerChild}>
      {children}
    </Component>
  );
}

/** Hero entrance: plays on load rather than on scroll. */
export function Entrance({ as = "div", className, children, delay = 0 }: BaseProps & { delay?: number }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

/** Moves its content vertically as the element crosses the viewport. */
export function Parallax({ className, children, distance = 60 }: { className?: string; children: ReactNode; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/** Tinted project photo that drifts slightly inside its frame while scrolling. */
export function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <motion.figure
      ref={ref}
      className={`tint ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale: 1.18 }} className="absolute inset-0" />
    </motion.figure>
  );
}

/** Thin accent bar at the top of the page showing reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

/**
 * Phone screenshots (transparent device mockups) fanned out side by side. The center phone is
 * larger and raised; phones rise in one after the other, then drift at different speeds on scroll.
 */
export function PhoneShowcase({
  screens,
  className,
  compact = false,
}: {
  screens: { src: string; alt: string }[];
  className?: string;
  // Narrow frame: bigger phones that overlap.
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ySide = useTransform(scrollYProgress, [0, 1], [70, -40]);
  const yCenter = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const mid = Math.floor(screens.length / 2);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-panel-2 ${className ?? ""}`}>
      <div
        aria-hidden="true"
        className="absolute top-[38%] left-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-25 blur-[90px]"
      />
      <motion.div
        className={`relative flex h-full justify-center ${compact ? "items-center px-[2%]" : "items-start gap-[2%] px-[4%] pt-[6%]"}`}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
      >
        {screens.map((screen, i) => {
          const side = i < mid ? -1 : i > mid ? 1 : 0;
          return (
            <motion.div
              key={screen.src}
              style={{ y: side === 0 ? yCenter : ySide }}
              className={
                compact
                  ? side === 0
                    ? "z-10 w-[48%]"
                    : `mt-[16%] w-[40%] ${side < 0 ? "-mr-[9%]" : "-ml-[9%]"}`
                  : side === 0
                    ? "z-10 w-[36%] md:w-[25%]"
                    : "mt-[8%] w-[30%] md:w-[21%]"
              }
            >
              <motion.img
                src={screen.src}
                alt={screen.alt}
                loading="lazy"
                className="block h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,.45)]"
                variants={{
                  hidden: { opacity: 0, y: 90, rotate: side * 8 },
                  show: { opacity: 1, y: 0, rotate: side * 4, transition: { duration: 1, ease: EASE } },
                }}
                whileHover={{ y: -12, rotate: 0, transition: { duration: 0.35 } }}
              />
            </motion.div>
          );
        })}
      </motion.div>
      {/* Fade the phones out at the bottom edge instead of cutting them hard. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[28%] bg-linear-to-t from-panel-2 to-transparent" />
    </div>
  );
}
