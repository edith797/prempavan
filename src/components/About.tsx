import { motion } from "framer-motion";
import { EASE_OUT, DURATIONS, staggerContainer, fadeUp } from "../lib/motionConfig";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center relative px-6 md:px-16 overflow-hidden py-28"
    >
      {/* Floating watermark */}
      <img
        src="/logo.png" alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] object-contain opacity-[0.04] pointer-events-none select-none z-0 watermark-float"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — fadeUp */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={fadeUp} className="section-label mb-5">About Us</motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-black text-primary-text tracking-tight leading-[1.06] mb-8"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
            >
              Delivering<br />Excellence
            </motion.h2>
            {/* Animated divider — grows in */}
            <motion.div
              className="h-[2px] bg-gradient-to-r from-accent-warm to-transparent rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DURATIONS.long, delay: 0.3, ease: EASE_OUT }}
              style={{ width: "80%" }}
            />
          </motion.div>

          {/* RIGHT — fadeUp stagger */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              className="text-secondary-text text-[17px] leading-[1.8] font-light mb-10"
            >
              PremPavan Engineers India Private Limited is dedicated to delivering excellence
              in the engineering sector. We specialise in{" "}
              <span className="text-primary-text font-medium">innovative solutions</span> and{" "}
              <span className="text-primary-text font-medium">high-precision products</span>,
              maintaining strong industrial partnerships built on trust and absolute quality.
            </motion.p>

            {/* Stats — stagger */}
            <motion.div variants={staggerContainer} className="flex gap-14">
              {[
                { value: "100%", label: "Quality" },
                { value: "2019", label: "Founded" },
              ].map((stat) => (
                <motion.div key={stat.label} variants={fadeUp}>
                  <span className="block text-[3.5rem] md:text-[4rem] font-black text-primary-text tracking-tighter leading-none">
                    {stat.value}
                  </span>
                  <span className="section-label mt-2 block">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
