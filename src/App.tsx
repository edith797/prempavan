import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useScroll } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GlobalBackground from "./components/GlobalBackground";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(5000);

  // Lenis smooth scroll — window-based
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Measure total page height for parallax calculation
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setPageHeight(containerRef.current.scrollHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Track window scroll for background parallax
  const { scrollY } = useScroll();

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#F8F7F4] text-primary-text selection:bg-accent-warm selection:text-white"
    >
      {/* Shared fixed background — spans ALL sections, parallaxes at ~18% scroll */}
      <GlobalBackground scrollY={scrollY} pageHeight={pageHeight} />

      {/* Page content — normal document flow for Lenis */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
