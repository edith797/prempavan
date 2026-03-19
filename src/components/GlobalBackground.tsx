import { motion, MotionValue, useTransform } from "framer-motion";

interface GlobalBackgroundProps {
  scrollY: MotionValue<number>;
  pageHeight: number;
}

/**
 * GlobalBackground — fixed, full-page ambient layer.
 * Three soft gradient blobs float continuously across ALL sections.
 * Background parallaxes at ~30% of scroll speed for subtle depth.
 */
export default function GlobalBackground({ scrollY, pageHeight }: GlobalBackgroundProps) {
  // Blobs travel upward slowly as user scrolls — creates parallax depth
  const blobY = useTransform(scrollY, [0, pageHeight], [0, -pageHeight * 0.18]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Parallax wrapper — moves slightly slower than page content */}
      <motion.div
        className="absolute inset-0"
        style={{ y: blobY, willChange: "transform" }}
      >
        {/* Blob 1 — warm beige, anchored top-left, slow drift */}
        <motion.div
          animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[8%] -left-[8%] w-[62vw] h-[62vw] rounded-full"
          style={{
            background: "radial-gradient(circle, #EDE7DA 0%, transparent 70%)",
            opacity: 0.72,
            filter: "blur(90px)",
            willChange: "transform",
          }}
        />

        {/* Blob 2 — soft gold, top-right, counter-drift */}
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, -45, 0] }}
          transition={{ duration: 46, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -top-[4%] -right-[6%] w-[52vw] h-[52vw] rounded-full"
          style={{
            background: "radial-gradient(circle, #C2A878 0%, transparent 68%)",
            opacity: 0.13,
            filter: "blur(110px)",
            willChange: "transform",
          }}
        />

        {/* Blob 3 — light grey, bottom-center, breathes in scale */}
        <motion.div
          animate={{ x: [0, 50, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 52, repeat: Infinity, ease: "easeInOut", delay: 11 }}
          className="absolute bottom-[-4%] left-[12%] w-[58vw] h-[58vw] rounded-full"
          style={{
            background: "radial-gradient(circle, #E5E0D5 0%, transparent 72%)",
            opacity: 0.55,
            filter: "blur(95px)",
            willChange: "transform",
          }}
        />
      </motion.div>
    </div>
  );
}
