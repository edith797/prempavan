import { motion, MotionValue, useTransform } from "framer-motion";

interface GlobalBackgroundProps {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  pageHeight: number;
}

/**
 * GlobalBackground — fixed, full-page ALWAYS-ACTIVE ambient system.
 *
 * Architecture:
 *  Layer 0 — Base gradient (slow shifting CSS, always on)
 *  Layer 1 — Ambient blobs (always animating, parallax with scroll)
 *  Layer 2 — Blueprint grid (always drifting, opacity responds to scroll)
 *  Layer 3 — Particles (always floating, 20 persistent orbs)
 *  Layer 4 — Light sweeps (continuous horizontal pass, always on)
 *  Layer 5 — Glow pulse (always breathing at bottom)
 *
 * Sections blend into each other — no switching, no state.
 */
export default function GlobalBackground({
  scrollY,
  scrollYProgress,
  pageHeight,
}: GlobalBackgroundProps) {
  // Parallax layers — each at a different speed
  const blobY      = useTransform(scrollY, [0, pageHeight], [0, -pageHeight * 0.12]);
  const gridY      = useTransform(scrollY, [0, pageHeight], [0, -pageHeight * 0.06]);
  const particleY  = useTransform(scrollY, [0, pageHeight], [0, -pageHeight * 0.09]);
  const glowY      = useTransform(scrollY, [0, pageHeight], [0, -pageHeight * 0.04]);

  // Grid opacity — subtle: present everywhere but slightly stronger mid-page
  const gridOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0.3, 0.7, 0.7, 0.3]);
  // Bloom opacity — stronger at hero and fades as user scrolls
  const bloomOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 0.4, 0.15]);
  // Sweep opacity — grows from 0 in hero, peaks at products, fades at contact
  const sweepOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.8, 1], [0.2, 0.5, 1, 0.65, 0.3]);
  // Glow opacity — peaks at bottom of page (contact section)
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0.1, 0.25, 0.7, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* ── LAYER 0: Base gradient — always slow-shifting ── */}
      <div className="absolute inset-0 bg-gradient-base" />

      {/* ── LAYER 1: Ambient blobs — parallax at ~12% scroll speed ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: blobY, willChange: "transform" }}
      >
        {/* Blob 1 — warm beige, top-left, slow drift */}
        <motion.div
          animate={{ x: [0, 60, 20, 0], y: [0, 35, 10, 0] }}
          transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[64vw] h-[64vw] rounded-full"
          style={{
            background: "radial-gradient(circle, #EDE7DA 0%, transparent 68%)",
            opacity: 0.68,
            filter: "blur(88px)",
            willChange: "transform",
          }}
        />
        {/* Blob 2 — soft gold, top-right, counter-drift */}
        <motion.div
          animate={{ x: [0, -55, -20, 0], y: [0, -40, -15, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute -top-[6%] -right-[8%] w-[55vw] h-[55vw] rounded-full"
          style={{
            background: "radial-gradient(circle, #C2A878 0%, transparent 65%)",
            opacity: 0.11,
            filter: "blur(108px)",
            willChange: "transform",
          }}
        />
        {/* Blob 3 — soft warm grey, bottom-center, breathing */}
        <motion.div
          animate={{ x: [0, 45, 0], scale: [1, 1.07, 0.97, 1] }}
          transition={{ duration: 56, repeat: Infinity, ease: "easeInOut", delay: 12 }}
          className="absolute bottom-[-6%] left-[10%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: "radial-gradient(circle, #E5E0D5 0%, transparent 70%)",
            opacity: 0.52,
            filter: "blur(92px)",
            willChange: "transform",
          }}
        />
        {/* Blob 4 — very faint blue-grey, center-right */}
        <motion.div
          animate={{ x: [0, -30, 15, 0], y: [0, 50, 20, 0] }}
          transition={{ duration: 62, repeat: Infinity, ease: "easeInOut", delay: 20 }}
          className="absolute top-[30%] right-[-4%] w-[38vw] h-[38vw] rounded-full"
          style={{
            background: "radial-gradient(circle, #D8D3C8 0%, transparent 72%)",
            opacity: 0.32,
            filter: "blur(80px)",
            willChange: "transform",
          }}
        />
      </motion.div>

      {/* ── LAYER 2: Hero bloom — fades as user scrolls ── */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: bloomOpacity }}
      >
        {/* Primary bloom — warm gold center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full hero-bloom"
          style={{
            background: "radial-gradient(circle, rgba(194,168,120,0.11) 0%, transparent 62%)",
            filter: "blur(55px)",
          }}
        />
        {/* Secondary bloom — top-right soft */}
        <div
          className="absolute top-[20%] right-[8%] w-[38vw] h-[38vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(237,231,218,0.40) 0%, transparent 70%)",
            filter: "blur(75px)",
            opacity: 0.65,
          }}
        />
      </motion.div>

      {/* ── LAYER 3: Blueprint grid — ALWAYS drifting, mid-scroll stronger ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: gridY, opacity: gridOpacity, willChange: "transform, opacity" }}
      >
        <div className="absolute inset-0 blueprint-grid" />
        {/* Blueprint crosshairs at key positions */}
        <svg className="absolute top-[18%] left-[8%] opacity-[0.06]" width="24" height="24" viewBox="0 0 24 24">
          <line x1="12" y1="0" x2="12" y2="8" stroke="#1C1C1C" strokeWidth="0.8"/>
          <line x1="12" y1="16" x2="12" y2="24" stroke="#1C1C1C" strokeWidth="0.8"/>
          <line x1="0" y1="12" x2="8" y2="12" stroke="#1C1C1C" strokeWidth="0.8"/>
          <line x1="16" y1="12" x2="24" y2="12" stroke="#1C1C1C" strokeWidth="0.8"/>
          <circle cx="12" cy="12" r="1.5" fill="none" stroke="#C2A878" strokeWidth="0.6"/>
        </svg>
        <svg className="absolute top-[55%] right-[12%] opacity-[0.055]" width="24" height="24" viewBox="0 0 24 24">
          <line x1="12" y1="0" x2="12" y2="8" stroke="#1C1C1C" strokeWidth="0.8"/>
          <line x1="12" y1="16" x2="12" y2="24" stroke="#1C1C1C" strokeWidth="0.8"/>
          <line x1="0" y1="12" x2="8" y2="12" stroke="#1C1C1C" strokeWidth="0.8"/>
          <line x1="16" y1="12" x2="24" y2="12" stroke="#1C1C1C" strokeWidth="0.8"/>
          <circle cx="12" cy="12" r="1.5" fill="none" stroke="#C2A878" strokeWidth="0.6"/>
        </svg>
        <svg className="absolute bottom-[20%] left-[35%] opacity-[0.05]" width="24" height="24" viewBox="0 0 24 24">
          <line x1="12" y1="0" x2="12" y2="8" stroke="#1C1C1C" strokeWidth="0.8"/>
          <line x1="12" y1="16" x2="12" y2="24" stroke="#1C1C1C" strokeWidth="0.8"/>
          <line x1="0" y1="12" x2="8" y2="12" stroke="#1C1C1C" strokeWidth="0.8"/>
          <line x1="16" y1="12" x2="24" y2="12" stroke="#1C1C1C" strokeWidth="0.8"/>
          <circle cx="12" cy="12" r="1.5" fill="none" stroke="#C2A878" strokeWidth="0.6"/>
        </svg>
      </motion.div>

      {/* ── LAYER 4: Floating particles — ALWAYS active, 18 persistent orbs ── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: particleY, willChange: "transform" }}
      >
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width:  `${2 + (i % 5) * 1.5}px`,
              height: `${2 + (i % 5) * 1.5}px`,
              left:   `${4  + (i * 5.4) % 92}%`,
              top:    `${8  + (i * 5.1) % 88}%`,
              opacity: 0.05 + (i % 4) * 0.025,
              animationName: "float-particle",
              animationDuration: `${9 + (i * 1.7) % 12}s`,
              animationDelay: `${(i * 0.9) % 7}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </motion.div>

      {/* ── LAYER 5: Horizontal light sweeps — ALWAYS active ── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: sweepOpacity, willChange: "opacity" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute light-sweep"
            style={{
              top:    `${18 + i * 20}%`,
              width:  `${28 + (i % 2) * 10}%`,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(194,168,120,0.35), rgba(255,255,255,0.45), rgba(194,168,120,0.35), transparent)",
              animationDelay: `${i * 1.4}s`,
              animationDuration: `${5.5 + i * 0.5}s`,
            }}
          />
        ))}
      </motion.div>

      {/* ── LAYER 6: Glow pulse — ALWAYS breathing, peaks at bottom ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: glowY, opacity: glowOpacity, willChange: "transform, opacity" }}
      >
        <div
          className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[75vw] h-[55vh] rounded-full glow-pulse"
          style={{
            background: "radial-gradient(ellipse, rgba(194,168,120,0.13) 0%, transparent 68%)",
            filter: "blur(55px)",
          }}
        />
        <div
          className="absolute top-[15%] right-[6%] w-[28vw] h-[28vw] rounded-full glow-pulse"
          style={{
            background: "radial-gradient(circle, rgba(237,231,218,0.30) 0%, transparent 70%)",
            filter: "blur(45px)",
            animationDelay: "3.5s",
          }}
        />
      </motion.div>

    </div>
  );
}
