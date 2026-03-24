import { motion, useScroll, useTransform } from "framer-motion";


interface ProductsProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const brands = [
  { name: "Allied Machine and Engineering", logo: "/brands/allied.jpeg", featured: true },
  { name: "GTW – Gusti Tool Works",         logo: "/brands/gtw.jpeg", featured: false },
  { name: "Fenwick and Ravi",               logo: "/brands/far.jpeg", featured: false },
  { name: "MEBA India Pvt Ltd",             logo: "/brands/meba.jpeg", featured: true },
  { name: "M.S.T.M Tools",                  logo: "/brands/mstm.jpeg", featured: false },
  { name: "Customized and SPL Tools",       logo: "/brands/spyro.jpeg", featured: false },
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

  const headerY = useTransform(scrollYProgress, [0, 0.35, 1], [10, 0, -4]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.35, 1, 1, 0.45]);
  const gridY   = useTransform(scrollYProgress, [0.05, 0.55, 1], [8, 0, -4]);

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
              className="relative overflow-hidden rounded-2xl p-6 flex flex-col items-center justify-center gap-4 group cursor-pointer card-float glass-card min-h-[160px] text-center"
              style={{
                "--float-duration": FLOAT_PARAMS[i].duration,
                "--float-delay": FLOAT_PARAMS[i].delay,
              } as React.CSSProperties}
            >
              {/* Inner highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              {/* Cyan left accent — hover */}
              <motion.div
                className="absolute left-0 top-5 bottom-5 w-[3px] bg-[#06b6d4] rounded-full"
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

              {/* Logo or Big letter */}
              {brand.logo ? (
                <div className="flex-grow flex items-center justify-center w-full h-[80px] md:h-[100px]">
                  <motion.img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-full max-w-[90%] md:max-w-[85%] object-contain rounded-md"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              ) : (
                <motion.span
                  className="block font-black text-primary-text group-hover:text-[#06b6d4] transition-colors duration-250 leading-none flex-grow flex items-center justify-center w-full min-h-[80px]"
                  style={{ fontSize: brand.featured ? "clamp(3.5rem, 7vw, 5.5rem)" : "clamp(3rem, 6vw, 4.5rem)" }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {brand.name.charAt(0)}
                </motion.span>
              )}

              <h3 className="text-[15px] font-semibold text-secondary-text group-hover:text-primary-text transition-colors duration-250 leading-snug w-full">
                {brand.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
