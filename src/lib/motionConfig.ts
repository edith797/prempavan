/**
 * Apple-style motion design tokens — Premium Edition.
 * All animation values live here — import from here instead of hardcoding.
 */

// ─── Easing ─────────────────────────────────────────────────────────────────
/** Apple signature decelerate easing */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Apple smooth in-out */
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

/** Snappy spring-like entry */
export const EASE_SPRING = [0.16, 1, 0.3, 1] as const;

// ─── Durations ───────────────────────────────────────────────────────────────
export const DURATIONS = {
  short: 0.5,
  base: 0.7,
  long: 0.9,
  xlong: 1.1,
} as const;

// ─── Stagger ─────────────────────────────────────────────────────────────────
/** Standard stagger — 70ms between children */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

/** Slow stagger — 120ms, for large grids */
export const staggerSlow = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ─── Core Variants ───────────────────────────────────────────────────────────
/**
 * fadeUp — canonical Apple entry: opacity 0→1, y 40→0, scale 0.98→1
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATIONS.base,
      ease: EASE_OUT,
    },
  },
};

/**
 * fadeUpBlur — fadeUp + blur reduction (premium Apple feel)
 */
export const fadeUpBlur = {
  hidden: { opacity: 0, y: 40, scale: 0.98, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: DURATIONS.long,
      ease: EASE_OUT,
    },
  },
};

/**
 * fadeIn — pure opacity, no movement.
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

/**
 * scaleIn — gentle scale from 0.95 → 1
 */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.base,
      ease: EASE_OUT,
    },
  },
};

/**
 * slideInLeft — slide from left
 */
export const slideInLeft = {
  hidden: { opacity: 0, x: -40, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: DURATIONS.base,
      ease: EASE_OUT,
    },
  },
};

/**
 * slideInRight — slide from right
 */
export const slideInRight = {
  hidden: { opacity: 0, x: 40, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: DURATIONS.base,
      ease: EASE_OUT,
    },
  },
};
