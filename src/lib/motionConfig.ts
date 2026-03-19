/**
 * Apple-style motion design tokens.
 * All animation values live here — import from here instead of hardcoding.
 */

// ─── Easing ─────────────────────────────────────────────────────────────────
/** Entry easing — decelerate into position (Apple easeOut) */
export const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

/** Transition easing — smooth in and out (Apple easeInOut) */
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

// ─── Durations ───────────────────────────────────────────────────────────────
export const DURATIONS = {
  short: 0.5,
  base: 0.6,
  long: 0.7,
} as const;

// ─── Stagger ─────────────────────────────────────────────────────────────────
/** Container variant — drives staggerChildren on children */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

// ─── Core Variants ───────────────────────────────────────────────────────────
/**
 * fadeUp — canonical Apple entry animation.
 * opacity 0 → 1, y 30 → 0, easeOut, 0.6s
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.base,
      ease: EASE_OUT,
    },
  },
};

/**
 * fadeIn — pure opacity, no movement.
 * Used when vertical movement would feel redundant.
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: DURATIONS.base,
      ease: EASE_IN_OUT,
    },
  },
};
