import { motion, useScroll, useTransform } from "framer-motion";

interface CustomersProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const customers = [
  "DMW",             "Sakthi Auto",     "Flow Link",       "Se forge",
  "Job Boss Automation", "ISRO",        "Nest Groups",     "Indo Shell Group",
  "High Precision Engineering", "Mold Master", "Veeyes Engineers",
  "Sri Ranganathan Groups", "Aqua Sub Groups", "Peekay Steels Groups",
  "Rabwin Industries", "Bull Machine",   "Sanfits Group",
  "GTN Engineering", "MIL KSB Pumps",   "Q&Q Solution",
];

export default function Customers({ sectionRef }: CustomersProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const headerY   = useTransform(scrollYProgress, [0, 0.35, 1], [18, 0, -8]);
  const gridY     = useTransform(scrollYProgress, [0.05, 0.6, 1], [12, 0, -6]);
  const opacity   = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.35, 1, 1, 0.45]);

  return (
    <section
      id="customers"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="min-h-screen w-full flex items-center relative px-6 md:px-16 overflow-hidden py-28"
    >
      {/* Static mesh — always visible */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <pattern id="connect-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="50" cy="50" r="1.5" fill="currentColor" />
            <path d="M 2 2 L 50 50" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M 50 50 L 100 2" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#connect-pattern)" />
        </svg>
      </div>

      {/* Watermark — always drifting */}
      <img
        src="/logo.png" alt=""
        className="absolute right-[4%] bottom-[4%] w-[360px] h-[360px] object-contain opacity-[0.04] pointer-events-none select-none z-0 watermark-drift"
      />

      <motion.div className="container mx-auto max-w-5xl relative z-10" style={{ opacity }}>

        {/* Header — scroll drift */}
        <motion.div className="mb-12" style={{ y: headerY, willChange: "transform" }}>
          <p className="section-label mb-3">Our Customers</p>
          <h2 className="font-black text-primary-text tracking-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
            Trusted by Leaders
          </h2>
        </motion.div>

        {/* Glass grid — always visible, scroll drift */}
        <motion.div style={{ y: gridY, willChange: "transform" }}>
          <div
            className="relative overflow-hidden rounded-2xl card-float"
            style={{
              "--float-duration": "7s",
              "--float-delay": "0s",
              background: "rgba(255,255,255,0.28)",
              backdropFilter: "blur(18px) saturate(155%)",
              WebkitBackdropFilter: "blur(18px) saturate(155%)",
              border: "1px solid rgba(255,255,255,0.44)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.60)",
            } as React.CSSProperties}
          >
            {/* Inner highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-10" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {customers.map((customer, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-center text-center p-4 border-r border-b border-white/25 last:border-r-0 cursor-pointer relative overflow-hidden"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.46)", y: -1 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  style={{ minHeight: "72px" }}
                >
                  {/* Shimmer on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "200%", opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", transform: "skewX(-15deg)" }}
                  />
                  <motion.span
                    className="font-medium text-[13px] text-secondary-text leading-tight relative z-10"
                    whileHover={{ color: "#1C1C1C", fontWeight: "600" }}
                    transition={{ duration: 0.2 }}
                  >
                    {customer}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
