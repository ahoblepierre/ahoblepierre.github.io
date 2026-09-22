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
