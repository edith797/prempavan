import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import Foundation from "../components/Foundation";
import Products from "../components/Products";
import Customers from "../components/Customers";

interface HomeProps {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  pageHeight: number;
}

/**
 * ScrollDrift — Replaces pop-in whileInView.
 * Elements gently shift on Y as scroll progresses through their section.
 * NO opacity pop, NO scale snap. Just calm, fluid motion tied to scroll position.
 */
function ScrollDrift({
  children,
  sectionRef,
  driftY = [-12, 12],
}: {
  children: React.ReactNode;
  sectionRef: React.RefObject<HTMLElement | null>;
  driftY?: [number, number];
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], driftY);

  return (
    <motion.div style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

export default function Home({ scrollY, scrollYProgress, pageHeight }: HomeProps) {
  const aboutRef    = useRef<HTMLElement>(null);
  const foundRef    = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const customersRef = useRef<HTMLElement>(null);

  return (
    <div className="relative">
      {/* Hero — no wrapper, has its own entry animation */}
      <Hero scrollYProgress={scrollYProgress} pageHeight={pageHeight} scrollY={scrollY} />

      {/* Soft gradient bleed — section blend */}
      <div className="section-blend-divider" />

      {/* About — scroll drift */}
      <About sectionRef={aboutRef} />

      <div className="section-blend-divider" />

      {/* Foundation — scroll drift */}
      <Foundation sectionRef={foundRef} />

      <div className="section-blend-divider" />

      {/* Products — scroll drift */}
      <Products sectionRef={productsRef} />

      <div className="section-blend-divider" />

      {/* Customers — scroll drift */}
      <Customers sectionRef={customersRef} />
    </div>
  );
}
