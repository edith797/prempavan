import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";


export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cardY  = useTransform(scrollYProgress, [0, 0.4, 1], [10, 0, -3]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.35, 1, 1, 0.7]);

  return (
    <footer
      id="footer-contact"
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center py-28 relative px-6 text-primary-text overflow-hidden"
    >
      {/* Watermark — always drifting */}
      <img
        src="/logo.png" alt=""
        className="absolute right-[-5%] bottom-[10%] w-[400px] h-[400px] md:w-[500px] md:h-[500px] object-contain opacity-[0.04] pointer-events-none select-none z-0 watermark-drift"
      />

      <div className="container mx-auto max-w-5xl relative z-10 w-full">

        {/* Glass card — scroll-driven entry + always idle float */}
        <motion.div
          className="relative overflow-hidden rounded-2xl card-float"
          style={{
            y: cardY,
            opacity,
            willChange: "transform, opacity",
            "--float-duration": "8s",
            "--float-delay": "0s",
            background: "rgba(255,255,255,0.28)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.44)",
            boxShadow: "0 16px 64px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)",
            padding: "clamp(2rem, 5vw, 3.5rem)",
          } as unknown as React.CSSProperties}
        >
          {/* Inner top highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent" />
          {/* Corner glow */}
          <div
            className="absolute -bottom-16 -left-16 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(30,58,138,0.15) 0%, transparent 70%)", filter: "blur(40px)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 mb-12 relative z-10">

            {/* Logo + Info */}
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center gap-4 mb-5">
                <motion.img
                  src="/logo.png" alt="PremPavan Logo"
                  className="w-14 h-14 object-contain"
                  whileHover={{ scale: 1.06, rotate: 3 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="flex flex-col">
                  <span className="font-extrabold text-2xl md:text-3xl leading-tight tracking-tight text-primary-text">PremPavan</span>
                  <span className="text-[11px] font-bold text-[#06b6d4] tracking-[0.3em] uppercase">Engineers</span>
                </div>
              </div>
              <h3 className="font-bold text-primary-text text-lg mb-3 tracking-tight">India Private Limited</h3>
              <p className="text-secondary-text font-medium text-[15px] leading-relaxed max-w-xs">
                Innovating Solutions, Driving Progress
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col h-full justify-center pt-8 lg:pt-0 lg:border-l lg:border-black/5 lg:pl-14">
              <h3 className="font-bold text-primary-text text-xl mb-8 tracking-tight">Contact Us</h3>
              <div className="flex flex-col gap-5">
                <div>
                  <span className="text-secondary-text text-sm block mb-1.5">📞 Phone</span>
                  <motion.a
                    href="tel:8870937038"
                    className="text-primary-text font-semibold text-[15px] block"
                    whileHover={{ color: "#06b6d4", x: 3 }}
                    transition={{ duration: 0.2 }}
                  >8870937038</motion.a>
                  <motion.a
                    href="tel:8870937074"
                    className="text-primary-text font-semibold text-[15px] block mt-1.5"
                    whileHover={{ color: "#06b6d4", x: 3 }}
                    transition={{ duration: 0.2 }}
                  >8870937074</motion.a>
                </div>
                <div>
                  <span className="text-secondary-text text-sm block mb-1.5">✉️ Email</span>
                  <motion.a
                    href="mailto:prempavanengrs2019@gmail.com"
                    className="text-[#06b6d4] font-semibold text-[14px] block break-all"
                    whileHover={{ color: "#1e293b", x: 3 }}
                    transition={{ duration: 0.2 }}
                  >prempavanengrs2019@gmail.com</motion.a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="flex flex-col h-full pt-12 lg:pt-0 lg:border-l lg:border-black/5 lg:pl-12 min-h-[280px]">
              <motion.div
                className="w-full h-full rounded-[20px] overflow-hidden relative shadow-sm border border-white/40 min-h-[240px]"
                whileHover={{ boxShadow: "0 18px 52px rgba(0,0,0,0.13)", scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=17+Vincent+Colony+RS+Puram+Coimbatore+Tamil+Nadu+641002+India&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full absolute inset-0 border-0"
                  style={{ filter: "grayscale(15%) contrast(108%)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                />
              </motion.div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-black/5 pt-8 text-center text-secondary-text text-sm font-medium relative z-10">
            <p>© 2026 PremPavan Engineers India Private Limited. All Rights Reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
