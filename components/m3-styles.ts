// Plain (non-client) module so server components can style elements as M3 buttons.
const BUTTON = {
  filled: "bg-primary text-on-primary",
  tonal: "bg-secondary-container text-on-secondary-container",
  outlined: "border border-outline text-primary",
  text: "text-primary",
} as const;

export type ButtonVariant = keyof typeof BUTTON;

/** Classes for an M3 button, for elements that must stay their own component (e.g. CvLink). */
export const buttonClass = (variant: ButtonVariant, className = "") =>
  `state-layer inline-flex h-10 items-center justify-center gap-2 rounded-full px-6 type-label-l no-underline cursor-pointer ${BUTTON[variant]} ${className}`;
