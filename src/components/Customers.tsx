import { motion } from "framer-motion";
import { EASE_OUT, DURATIONS, staggerContainer, fadeUp } from "../lib/motionConfig";

const customers = [
  "DMW",             "Sakthi Auto",     "Flow Link",       "Se forge",
  "Job Boss Automation", "ISRO",        "Nest Groups",     "Indo Shell Group",
  "High Precision Engineering", "Mold Master", "Veeyes Engineers",
  "Sri Ranganathan Groups", "Aqua Sub Groups", "Peekay Steels Groups",
  "Rabwin Industries", "Bull Machine",   "Sanfits Group",
  "GTN Engineering", "MIL KSB Pumps",   "Q&Q Solution",
];

export default function Customers() {
  return (
    <section
      id="customers"
      className="min-h-screen w-full flex items-center relative px-6 md:px-16 overflow-hidden py-28"
    >
      {/* Connecting mesh — subtle, static (no animation cost) */}
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

      {/* Floating watermark */}
      <img
        src="/logo.png" alt=""
        className="absolute right-[4%] bottom-[4%] w-[380px] h-[380px] object-contain opacity-[0.04] pointer-events-none select-none z-0 watermark-float"
      />

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Header — fadeUp */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DURATIONS.base, ease: EASE_OUT }}
          className="mb-12"
        >
          <p className="section-label mb-3">Our Customers</p>
          <h2 className="font-black text-primary-text tracking-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
            Trusted by Leaders
          </h2>
        </motion.div>

        {/* Grid — fadeUp, slight delay after header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div
            variants={fadeUp}
            className="bg-white/35 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {customers.map((customer, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center text-center p-4 border-r border-b border-white/25 last:border-r-0 group hover:bg-white/40 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 min-h-[72px] cursor-pointer"
                >
                  <span className="font-medium text-[13px] text-secondary-text group-hover:text-primary-text group-hover:font-semibold transition-all duration-300 leading-tight">
                    {customer}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
