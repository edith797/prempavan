import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AboutProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function About({ sectionRef }: AboutProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax — content drifts up slightly as section enters
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  // Left column: enters from slight left-offset → center
  const leftX  = useTransform(scrollYProgress, [0, 0.4, 1], [-8, 0, 4]);
  // Right column: enters from slight right-offset → center
  const rightX = useTransform(scrollYProgress, [0, 0.4, 1], [8, 0, -4]);
  // Shared opacity — already visible, just a gentle soft-fade at edges
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0.4, 1, 1, 0.5]);
  // Stats: slow floating y — scroll-synced
  const statY  = useTransform(scrollYProgress, [0.2, 0.8], [4, -4]);

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="min-h-screen w-full flex items-center relative px-6 md:px-16 overflow-hidden py-28"
    >
      {/* Watermark — always drifting */}
      <img
        src="/logo.png" alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] object-contain opacity-[0.04] pointer-events-none select-none z-0 watermark-float"
      />

      <motion.div
        ref={innerRef}
        className="container mx-auto max-w-6xl relative z-10"
        style={{ opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — scroll-driven x drift from left */}
          <motion.div style={{ x: leftX, willChange: "transform" }}>
            <p className="section-label mb-5">About Us</p>
            <h2
              className="font-black text-primary-text tracking-tight leading-[1.06] mb-8"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
            >
              Delivering<br />Excellence
            </h2>
            {/* Divider — always visible, slow scale on hover */}
            <div
              className="h-[2px] bg-gradient-to-r from-[#06b6d4] to-transparent rounded-full"
              style={{ width: "80%" }}
            />
          </motion.div>

          {/* RIGHT — scroll-driven x drift from right */}
          <motion.div style={{ x: rightX, willChange: "transform" }}>
            <p className="text-secondary-text text-[17px] leading-[1.8] font-light mb-10">
              PremPavan Engineers India Private Limited is dedicated to delivering excellence
              in the engineering sector. We specialise in{" "}
              <span className="text-primary-text font-medium">innovative solutions</span> and{" "}
              <span className="text-primary-text font-medium">high-precision products</span>,
              maintaining strong industrial partnerships built on trust and absolute quality.
            </p>

            {/* Stats — softly floating on scroll progress */}
            <motion.div
              className="flex gap-14"
              style={{ y: statY, willChange: "transform" }}
            >
              {[
                { value: "100%", label: "Quality" },
                { value: "2019", label: "Founded" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    "--float-duration": `${4.5 + i * 1.2}s`,
                    "--float-delay": `${i * 1.4}s`,
                  } as React.CSSProperties}
                  className="card-float"
                >
                  <span className="block text-[3.5rem] md:text-[4rem] font-black text-primary-text tracking-tighter leading-none">
                    {stat.value}
                  </span>
                  <span className="section-label mt-2 block">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
