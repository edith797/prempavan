import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_OUT, DURATIONS } from "../lib/motionConfig";

interface ProductsProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const brands = [
  { name: "Allied Machine and Engineering", featured: true },
  { name: "GTW – Gusti Tool Works",         featured: false },
  { name: "Fenwick and Ravi",                featured: false },
  { name: "MEBA India Pvt Ltd",              featured: true },
  { name: "M.S.T.M Tools",                  featured: false },
  { name: "Customized and SPL Tools",        featured: false },
];

const FLOAT_PARAMS = [
  { duration: "5.2s", delay: "0s" },
  { duration: "4.6s", delay: "0.9s" },
  { duration: "5.8s", delay: "1.6s" },
  { duration: "4.3s", delay: "0.4s" },
  { duration: "6.1s", delay: "2.0s" },
  { duration: "5.0s", delay: "1.2s" },
];

export default function Products({ sectionRef }: ProductsProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.35, 1], [20, 0, -8]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.35, 1, 1, 0.45]);
  const gridY   = useTransform(scrollYProgress, [0.05, 0.55, 1], [16, 0, -8]);

  return (
    <section
      id="products"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="min-h-screen w-full flex items-center relative px-6 md:px-16 overflow-hidden py-28"
    >
      {/* Watermark — always drifting */}
      <img
        src="/logo.png" alt=""
        className="absolute left-[-6%] bottom-[5%] w-[400px] h-[400px] object-contain opacity-[0.04] pointer-events-none select-none z-0 watermark-drift"
      />

      <motion.div className="container mx-auto max-w-5xl relative z-10" style={{ opacity }}>

        {/* Header — scroll-driven */}
        <motion.div
          className="text-center mb-14"
          style={{ y: headerY, willChange: "transform" }}
        >
          <p className="section-label mb-3">Products &amp; Brands</p>
          <h2 className="font-black text-primary-text tracking-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
            Precision Tool Partners
          </h2>
        </motion.div>

        {/* Cards — idle float + scroll drift + hover interactions */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto"
          style={{ y: gridY, willChange: "transform" }}
        >
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              className="relative overflow-hidden rounded-2xl p-6 flex flex-col gap-2 group cursor-pointer card-float"
              style={{
                "--float-duration": FLOAT_PARAMS[i].duration,
                "--float-delay": FLOAT_PARAMS[i].delay,
                background: "rgba(255,255,255,0.30)",
                backdropFilter: "blur(18px) saturate(155%)",
                WebkitBackdropFilter: "blur(18px) saturate(155%)",
                border: "1px solid rgba(255,255,255,0.44)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.52)",
              } as React.CSSProperties}
              whileHover={{
                y: -8,
                boxShadow: "0 28px 60px rgba(0,0,0,0.11), inset 0 1px 0 rgba(255,255,255,0.70)",
                backgroundColor: "rgba(255,255,255,0.46)",
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Inner highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              {/* Gold left accent — hover */}
              <motion.div
                className="absolute left-0 top-5 bottom-5 w-[3px] bg-accent-warm rounded-full"
                initial={{ scaleY: 0, opacity: 0 }}
                whileHover={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "center" }}
              />

              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "200%", opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)", transform: "skewX(-12deg)" }}
              />

              {/* Big letter */}
              <motion.span
                className="block font-black text-primary-text group-hover:text-accent-warm transition-colors duration-250 leading-none pl-1"
                style={{ fontSize: brand.featured ? "clamp(3rem, 6vw, 4.5rem)" : "clamp(2.4rem, 5vw, 3.5rem)" }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {brand.name.charAt(0)}
              </motion.span>

              <h3 className="text-[14px] font-semibold text-secondary-text group-hover:text-primary-text transition-colors duration-250 leading-snug pl-1">
                {brand.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
