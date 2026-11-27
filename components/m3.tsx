"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { buttonClass, type ButtonVariant } from "./m3-styles";
import { SPRING } from "./motion";

/** Material 3 Expressive building blocks. Colours come from the M3 roles in app/globals.css. */

// Expressive press: the pill squares off a little, on a spring. MotionConfig's reducedMotion
// only covers transforms, so the shape morph is switched off here explicitly.
function usePress() {
  const reduce = useReducedMotion();
  // Keep whileTap present either way: Motion adds tabindex for it, and server and client must match.
  return { whileTap: reduce ? {} : { borderRadius: 12 }, transition: SPRING } as const;
}

type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children" | "ref" | "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart">;

export function Button({ variant = "filled", href, icon, className, children, ...rest }: ButtonProps) {
  const cls = buttonClass(variant, className);
  const press = usePress();
  if (href) {
    return (
      <motion.a href={href} className={cls} {...press}>
        {icon}
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" className={cls} {...press} {...rest}>
      {icon}
      {children}
    </motion.button>
  );
}

export function Fab({
  href,
  label,
  icon,
  extended = false,
  className = "",
}: {
  href: string;
  label: string;
  icon: ReactNode;
  extended?: boolean;
  className?: string;
}) {
  const press = usePress();
  return (
    <motion.a
      href={href}
      aria-label={extended ? undefined : label}
      title={label}
      className={`state-layer inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-primary-container text-on-primary-container shadow-3 no-underline ${extended ? "px-5 type-label-l" : "w-14"} ${className}`}
      {...press}
    >
      {icon}
      {extended && <span>{label}</span>}
    </motion.a>
  );
}

export function IconButton({
  label,
  className = "",
  children,
  ...rest
}: { label: string; className?: string; children: ReactNode } & Omit<
  ComponentProps<"button">,
  "className" | "children" | "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
>) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      className={`state-layer inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-on-surface-variant ${className}`}
      whileTap={{ scale: 0.9 }}
      transition={SPRING}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-8 items-center rounded-sm border border-outline-variant px-4 type-label-l text-on-surface-variant">
      {children}
    </span>
  );
}

const CARD = {
  filled: "bg-surface-container-highest",
  elevated: "bg-surface-container-low shadow-1",
  outlined: "border border-outline-variant",
} as const;

export function Card({
  variant = "filled",
  className = "",
  children,
}: {
  variant?: keyof typeof CARD;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`rounded-xl ${CARD[variant]} ${className}`}>{children}</div>;
}
