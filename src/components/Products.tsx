import { motion } from "framer-motion";
import { EASE_OUT, DURATIONS, staggerContainer, fadeUp } from "../lib/motionConfig";

const brands = [
  { name: "Allied Machine and Engineering", featured: true },
  { name: "GTW – Gusti Tool Works",         featured: false },
  { name: "Fenwick and Ravi",                featured: false },
  { name: "MEBA India Pvt Ltd",              featured: true },
  { name: "M.S.T.M Tools",                  featured: false },
  { name: "Customized and SPL Tools",        featured: false },
];

export default function Products() {
  return (
    <section
      id="products"
      className="min-h-screen w-full flex items-center relative px-6 md:px-16 overflow-hidden py-28"
    >
      {/* No local particles — global background handles ambient depth */}

      {/* Floating watermark */}
      <img
        src="/logo.png" alt=""
        className="absolute left-[-6%] bottom-[5%] w-[420px] h-[420px] object-contain opacity-[0.04] pointer-events-none select-none z-0 watermark-float"
      />

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Header — fadeUp */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DURATIONS.base, ease: EASE_OUT }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">Products &amp; Brands</p>
          <h2 className="font-black text-primary-text tracking-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
            Precision Tool Partners
          </h2>
        </motion.div>

        {/* Cards — staggered fadeUp (no aggressive scale snap) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={fadeUp}
              whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(0,0,0,0.09)" }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="bg-white/35 backdrop-blur-xl border border-white/40 rounded-2xl p-6 flex flex-col gap-2 group cursor-pointer hover:bg-white/40 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Gold left accent */}
              <div className="absolute left-0 top-5 bottom-5 w-[3px] bg-accent-warm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Large letter initial */}
              <motion.span
                className="block font-black text-primary-text group-hover:text-accent-warm transition-colors duration-250 leading-none pl-1"
                style={{ fontSize: brand.featured ? "clamp(3rem, 6vw, 4.5rem)" : "clamp(2.4rem, 5vw, 3.5rem)" }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2 }}
              >
                {brand.name.charAt(0)}
              </motion.span>

              <h3 className="text-[14px] font-semibold text-secondary-text group-hover:text-primary-text transition-colors duration-250 leading-snug pl-1">
                {brand.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
