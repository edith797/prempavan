import { motion } from "framer-motion";
import { EASE_OUT, DURATIONS } from "../lib/motionConfig";
import Hero from "../components/Hero";
import About from "../components/About";
import Foundation from "../components/Foundation";
import Products from "../components/Products";
import Customers from "../components/Customers";

/**
 * SectionFade — Apple-style dissolve wrapper.
 * Sections fade in (opacity + slight y) as they enter the viewport.
 * once: false means they re-animate when scrolled back up,
 * making section transitions feel continuous and alive.
 */
function SectionFade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-12%" }}
      transition={{ duration: DURATIONS.long, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero is exempt — it has its own entry animation sequence */}
      <Hero />

      <SectionFade>
        <About />
      </SectionFade>

      <SectionFade>
        <Foundation />
      </SectionFade>

      <SectionFade>
        <Products />
      </SectionFade>

      <SectionFade>
        <Customers />
      </SectionFade>
    </>
  );
}
