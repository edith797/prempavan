import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { EASE_OUT, EASE_IN_OUT, DURATIONS } from "../lib/motionConfig";

interface HeroProps {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  pageHeight: number;
}

export default function Hero({ scrollY, scrollYProgress, pageHeight }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: hero content drifts up at ~20% of scroll speed as user leaves
  const { scrollYProgress: heroProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY   = useTransform(heroProgress, [0, 1], [0, -80]);
  const contentOp  = useTransform(heroProgress, [0, 0.7], [1, 0.3]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center relative px-6 overflow-hidden pt-24"
    >
      {/* Hero content — drifts up and fades gently as user scrolls away */}
      <motion.div
        className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center text-center py-20"
        style={{ y: contentY, opacity: contentOp, willChange: "transform, opacity" }}
      >

        {/* Logo with multi-layer continuous bloom */}
        <div className="relative mb-7">
          {/* Outer slow bloom */}
          <motion.div
            className="absolute inset-0 rounded-full z-0"
            style={{ filter: "blur(52px)" }}
            animate={{ scale: [0.85, 1.20, 0.85], opacity: [0.14, 0.38, 0.14] }}
            transition={{ duration: 8, repeat: Infinity, ease: EASE_IN_OUT as never }}
            aria-hidden
          >
            <div className="w-full h-full bg-accent-warm/20 rounded-full" />
          </motion.div>
          {/* Inner tight bloom */}
          <motion.div
            className="absolute inset-0 rounded-full z-0"
            style={{ filter: "blur(28px)" }}
            animate={{ scale: [1.0, 1.28, 1.0], opacity: [0.08, 0.22, 0.08] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: EASE_IN_OUT as never, delay: 1.2 }}
            aria-hidden
          >
            <div className="w-full h-full bg-accent-warm/30 rounded-full" />
          </motion.div>

          <motion.img
            src="/logo.png"
            alt="PremPavan Logo"
            initial={{ opacity: 0, scale: 0.88, y: 14, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: DURATIONS.xlong, ease: EASE_OUT }}
            className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 mx-auto"
            style={{ filter: "drop-shadow(0 14px 36px rgba(194,168,120,0.30))" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: DURATIONS.base, ease: EASE_OUT, delay: 0.12 }}
          className="section-label mb-5"
        >
          Established 2019
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.97, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: DURATIONS.long, ease: EASE_OUT, delay: 0.20 }}
          className="font-black text-primary-text tracking-tight leading-[1.04] mb-3"
          style={{ fontSize: "clamp(2.6rem, 7vw, 5.2rem)" }}
        >
          PremPavan Engineers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: DURATIONS.base, ease: EASE_OUT, delay: 0.28 }}
          className="font-bold text-secondary-text tracking-tight mb-5"
          style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
        >
          India Private Limited
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: DURATIONS.short, ease: EASE_OUT, delay: 0.36 }}
          className="text-base md:text-lg font-medium text-accent-warm mb-14 tracking-tight"
        >
          Innovating Solutions, Driving Progress
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: DURATIONS.short, ease: EASE_OUT, delay: 0.44 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.a
            href="#products"
            onClick={(e) => { e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
            className="relative overflow-hidden px-8 py-3.5 bg-primary-text text-white rounded-full font-semibold text-[15px] w-full sm:w-auto text-center btn-shimmer"
            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 18px 40px rgba(28,28,28,0.24)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Explore Products
          </motion.a>
          <motion.a
            href="#footer-contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("footer-contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="relative overflow-hidden px-8 py-3.5 bg-white/30 backdrop-blur-[20px] border border-white/42 text-primary-text rounded-full font-semibold text-[15px] w-full sm:w-auto text-center btn-shimmer"
            whileHover={{ scale: 1.04, y: -2, backgroundColor: "rgba(255,255,255,0.50)", boxShadow: "0 12px 28px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
