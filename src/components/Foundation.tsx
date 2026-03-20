import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Calendar, MapPin, FileText } from "lucide-react";
import { EASE_OUT, DURATIONS } from "../lib/motionConfig";

interface FoundationProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const cards = [
  { icon: <Calendar className="w-6 h-6" />, title: "Established", content: "2019" },
  { icon: <Building2 className="w-6 h-6" />, title: "Type of Firm", content: "Private Limited Company" },
  {
    icon: <MapPin className="w-6 h-6" />, title: "Head Office",
    content: (<>Prem Illam, Marutham Amber Apt No.16<br />Vincent Colony, R.S. Puram<br />Coimbatore – 641002, Tamil Nadu</>),
  },
  {
    icon: <FileText className="w-6 h-6" />, title: "Corporate Details",
    content: (<><span className="font-semibold text-primary-text">GST:</span> 33AAKCP5518P1ZW<br /><span className="font-semibold text-primary-text">CIN:</span> U29200TZ2019PTC032142<br /><span className="font-semibold text-primary-text">PAN:</span> AAKCP5518P</>),
  },
];

// Float durations for each card — staggered
const FLOAT_PARAMS = [
  { duration: "4.8s", delay: "0s" },
  { duration: "5.5s", delay: "1.2s" },
  { duration: "4.2s", delay: "0.6s" },
  { duration: "6.0s", delay: "1.8s" },
];

export default function Foundation({ sectionRef }: FoundationProps) {
  // Scroll-driven: header drifts in from below as section enters
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const headerY  = useTransform(scrollYProgress, [0, 0.35, 1], [24, 0, -10]);
  const opacity  = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.35, 1, 1, 0.45]);
  const cardsY   = useTransform(scrollYProgress, [0.05, 0.5, 1], [14, 0, -6]);

  return (
    <section
      id="foundation"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="min-h-screen w-full flex items-center relative px-6 md:px-16 overflow-hidden py-28"
    >
      {/* Blueprint accents — always visible, drawn in once */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.06 }}>
          <path d="M 3 12 L 3 3 L 12 3" fill="none" stroke="#1C1C1C" strokeWidth="0.12" />
          <path d="M 88 3 L 97 3 L 97 12" fill="none" stroke="#1C1C1C" strokeWidth="0.12" />
          <path d="M 3 88 L 3 97 L 12 97" fill="none" stroke="#1C1C1C" strokeWidth="0.12" />
          <path d="M 88 97 L 97 97 L 97 88" fill="none" stroke="#1C1C1C" strokeWidth="0.12" />
          <path d="M 47 50 L 53 50 M 50 47 L 50 53" fill="none" stroke="#C2A878" strokeWidth="0.08" opacity="0.5" />
        </svg>
      </div>

      {/* Watermark — always drifting */}
      <img
        src="/logo.png" alt=""
        className="absolute right-[-8%] top-[10%] w-[420px] h-[420px] object-contain opacity-[0.04] pointer-events-none select-none z-0 watermark-drift"
      />

      <motion.div
        className="container mx-auto max-w-5xl relative z-10"
        style={{ opacity }}
      >
        {/* Header — scroll-driven y drift */}
        <motion.div className="mb-14" style={{ y: headerY, willChange: "transform" }}>
          <p className="section-label mb-3">Foundation</p>
          <h2 className="font-black text-primary-text tracking-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
            Built on Solid Ground
          </h2>
        </motion.div>

        {/* Cards — always floating (card-float CSS), scroll Y drift */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          style={{ y: cardsY, willChange: "transform" }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl p-7 flex flex-col gap-4 group cursor-pointer card-float"
              style={{
                "--float-duration": FLOAT_PARAMS[index].duration,
                "--float-delay": FLOAT_PARAMS[index].delay,
                background: "rgba(255,255,255,0.30)",
                backdropFilter: "blur(18px) saturate(155%)",
                WebkitBackdropFilter: "blur(18px) saturate(155%)",
                border: "1px solid rgba(255,255,255,0.44)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.52)",
              } as React.CSSProperties}
              whileHover={{
                y: -6,
                boxShadow: "0 24px 54px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.65)",
                backgroundColor: "rgba(255,255,255,0.46)",
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Inner highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              <motion.div
                className="w-10 h-10 rounded-xl bg-accent-warm/10 flex items-center justify-center text-accent-warm group-hover:bg-accent-warm group-hover:text-white transition-all duration-300 flex-shrink-0"
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {card.icon}
              </motion.div>
              <h3 className="text-[16px] font-bold text-primary-text tracking-tight group-hover:text-accent-warm transition-colors duration-300">
                {card.title}
              </h3>
              <div className="text-secondary-text text-[14px] leading-relaxed font-light">
                {card.content}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
