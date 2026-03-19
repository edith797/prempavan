import { motion } from "framer-motion";
import { EASE_OUT, DURATIONS, staggerContainer, fadeUp } from "../lib/motionConfig";

export default function Footer() {
  return (
    <footer
      id="footer-contact"
      className="min-h-screen w-full flex items-center justify-center py-28 relative px-6 text-primary-text overflow-hidden"
    >
      {/* Floating watermark */}
      <img
        src="/logo.png" alt=""
        className="absolute right-[-5%] bottom-[10%] w-[400px] h-[400px] md:w-[520px] md:h-[520px] object-contain opacity-[0.04] pointer-events-none select-none z-0 watermark-float"
      />

      <div className="container mx-auto max-w-5xl relative z-10 w-full">

        {/* Outer glass card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DURATIONS.long, ease: EASE_OUT }}
          className="bg-white/35 backdrop-blur-xl border border-white/40 rounded-2xl p-8 md:p-14"
        >
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >

            {/* Logo + Info */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-start justify-center"
            >
              <div className="flex items-center gap-4 mb-5">
                <img src="/logo.png" alt="PremPavan Logo" className="w-14 h-14 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="flex flex-col">
                  <span className="font-extrabold text-2xl md:text-3xl leading-tight tracking-tight text-primary-text">PremPavan</span>
                  <span className="text-[11px] font-bold text-accent-warm tracking-[0.3em] uppercase">Engineers</span>
                </div>
              </div>
              <h3 className="font-bold text-primary-text text-lg mb-3 tracking-tight">India Private Limited</h3>
              <p className="text-secondary-text font-medium text-[15px] leading-relaxed max-w-xs">
                Innovating Solutions, Driving Progress
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col h-full justify-center pt-8 lg:pt-0 lg:border-l lg:border-black/5 lg:pl-14"
            >
              <h3 className="font-bold text-primary-text text-xl mb-8 tracking-tight">Contact Us</h3>
              <div className="flex flex-col gap-5">
                <div>
                  <span className="text-secondary-text text-sm block mb-1.5">📞 Phone</span>
                  <a href="tel:8870937038" className="text-primary-text font-semibold text-[15px] hover:text-accent-warm transition-colors duration-300 block">8870937038</a>
                  <a href="tel:8870937074" className="text-primary-text font-semibold text-[15px] hover:text-accent-warm transition-colors duration-300 block mt-1.5">8870937074</a>
                </div>
                <div>
                  <span className="text-secondary-text text-sm block mb-1.5">✉️ Email</span>
                  <a href="mailto:prempavanengrs2019@gmail.com" className="text-accent-warm font-semibold text-[14px] hover:text-primary-text transition-colors duration-300 block break-all">
                    prempavanengrs2019@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col h-full pt-12 lg:pt-0 lg:border-l lg:border-black/5 lg:pl-12 min-h-[280px]"
            >
              <div className="w-full h-full rounded-[20px] overflow-hidden relative shadow-sm border border-white/40 hover:shadow-lg transition-shadow duration-500 min-h-[240px]">
                <iframe
                  src="https://maps.google.com/maps?q=17+Vincent+Colony+RS+Puram+Coimbatore+Tamil+Nadu+641002+India&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full absolute inset-0 border-0"
                  style={{ filter: "grayscale(15%) contrast(108%)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <div className="border-t border-black/5 pt-8 text-center text-secondary-text text-sm font-medium">
            <p>© 2026 PremPavan Engineers India Private Limited. All Rights Reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
