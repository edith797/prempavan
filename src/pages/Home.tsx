import { useRef } from "react";

import Hero from "../components/Hero";
import About from "../components/About";
import Foundation from "../components/Foundation";
import Products from "../components/Products";
import Customers from "../components/Customers";





export default function Home() {
  const aboutRef    = useRef<HTMLElement>(null);
  const foundRef    = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const customersRef = useRef<HTMLElement>(null);

  return (
    <div className="relative">
      {/* Hero — no wrapper, has its own entry animation */}
      <Hero />

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
