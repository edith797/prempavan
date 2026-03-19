import { motion } from "framer-motion";
import { EASE_OUT, EASE_IN_OUT, DURATIONS } from "../lib/motionConfig";

// NO CSS grid — global background layer handles all ambient depth
export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen w-full flex items-center justify-center relative px-6 overflow-hidden pt-24"
    >
      <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center text-center py-20">

        {/* Logo with subtle glowing pulse */}
        <div className="relative mb-7 group">
          <motion.div
            className="absolute inset-0 bg-accent-warm/15 rounded-full blur-2xl z-0"
            animate={{ scale: [0.85, 1.18, 0.85], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: EASE_IN_OUT as never }}
          />
          <motion.img
            src="/logo.png"
            alt="PremPavan Logo"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: DURATIONS.long, ease: EASE_OUT }}
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-xl relative z-10 mx-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATIONS.base, ease: EASE_OUT, delay: 0.10 }}
          className="section-label mb-5"
        >
          Established 2019
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATIONS.long, ease: EASE_OUT, delay: 0.18 }}
          className="font-black text-primary-text tracking-tight leading-[1.04] mb-3"
          style={{ fontSize: "clamp(2.6rem, 7vw, 5.2rem)" }}
        >
          PremPavan Engineers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATIONS.base, ease: EASE_OUT, delay: 0.26 }}
          className="font-bold text-secondary-text tracking-tight mb-5"
          style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
        >
          India Private Limited
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATIONS.short, ease: EASE_OUT, delay: 0.33 }}
          className="text-base md:text-lg font-medium text-accent-warm mb-14 tracking-tight"
        >
          Innovating Solutions, Driving Progress
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATIONS.short, ease: EASE_OUT, delay: 0.40 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="#products"
            onClick={(e) => { e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3.5 bg-primary-text text-white rounded-full font-semibold text-[15px] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(28,28,28,0.18)] transition-all duration-300 w-full sm:w-auto text-center"
          >
            Explore Products
          </a>
          <a
            href="#footer-contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("footer-contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3.5 bg-white/35 backdrop-blur-[20px] border border-white/40 text-primary-text rounded-full font-semibold text-[15px] hover:-translate-y-1 hover:bg-white/55 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 w-full sm:w-auto text-center"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
