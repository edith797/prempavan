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

  // Lenis — premium inertia-based smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
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

  // Global scroll tracking — used by GlobalBackground for parallax
  const { scrollY, scrollYProgress } = useScroll();

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#F8F7F4] text-primary-text selection:bg-accent-warm selection:text-white"
    >
      {/* Fixed ambient background — always alive */}
      <GlobalBackground scrollY={scrollY} scrollYProgress={scrollYProgress} pageHeight={pageHeight} />

      {/* Page content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Home scrollY={scrollY} scrollYProgress={scrollYProgress} pageHeight={pageHeight} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
