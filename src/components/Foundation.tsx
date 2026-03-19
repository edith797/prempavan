import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, FileText } from "lucide-react";
import { EASE_OUT, DURATIONS, staggerContainer, fadeUp } from "../lib/motionConfig";

const cards = [
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Established",
    content: "2019",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Type of Firm",
    content: "Private Limited Company",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Head Office",
    content: (
      <>
        Prem Illam, Marutham Amber Apt No.16<br />
        Vincent Colony, R.S. Puram<br />
        Coimbatore – 641002, Tamil Nadu
      </>
    ),
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Corporate Details",
    content: (
      <>
        <span className="font-semibold text-primary-text">GST:</span> 33AAKCP5518P1ZW<br />
        <span className="font-semibold text-primary-text">CIN:</span> U29200TZ2019PTC032142<br />
        <span className="font-semibold text-primary-text">PAN:</span> AAKCP5518P
      </>
    ),
  },
];

export default function Foundation() {
  return (
    <section
      id="foundation"
      className="min-h-screen w-full flex items-center relative px-6 md:px-16 overflow-hidden py-28"
    >
      {/* Blueprint technical accents */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
        <motion.svg
          width="100%" height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.path
            d="M 5 5 L 15 5 M 5 5 L 5 15"
            fill="none" stroke="currentColor" strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.path
            d="M 85 5 L 95 5 M 95 5 L 95 15"
            fill="none" stroke="currentColor" strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.path
            d="M 5 85 L 5 95 M 5 95 L 15 95"
            fill="none" stroke="currentColor" strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          <motion.path
            d="M 85 95 L 95 95 M 95 95 L 95 85"
            fill="none" stroke="currentColor" strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
          />
        </motion.svg>
      </div>

      {/* Floating watermark */}
      <img
        src="/logo.png" alt=""
        className="absolute right-[-8%] top-[10%] w-[440px] h-[440px] object-contain opacity-[0.04] pointer-events-none select-none z-0 watermark-float"
      />

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DURATIONS.base, ease: EASE_OUT }}
          className="mb-14"
        >
          <p className="section-label mb-3">Foundation</p>
          <h2 className="font-black text-primary-text tracking-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
            Built on Solid Ground
          </h2>
        </motion.div>

        {/* Cards — staggered fadeUp */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(0,0,0,0.09)" }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="bg-white/35 backdrop-blur-xl border border-white/40 rounded-2xl p-7 flex flex-col gap-4 group cursor-pointer hover:bg-white/40 transition-colors duration-300"
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-accent-warm/10 flex items-center justify-center text-accent-warm group-hover:bg-accent-warm group-hover:text-white transition-all duration-300 flex-shrink-0"
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ duration: 0.2 }}
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
      </div>
    </section>
  );
}
