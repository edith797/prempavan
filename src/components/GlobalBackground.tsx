import { motion, MotionValue, useTransform } from "framer-motion";

interface GlobalBackgroundProps {
  scrollY?: MotionValue<number>;
  scrollYProgress?: MotionValue<number>;
  pageHeight?: number;
}

export default function GlobalBackground({
  scrollY,
  pageHeight = 5000,
}: GlobalBackgroundProps) {
  
  const safeScrollY = scrollY || new MotionValue(0);
  
  // Parallax the static SVGs very gently to make them feel part of the world
  const driftY = useTransform(safeScrollY, [0, pageHeight], [0, -pageHeight * 0.05]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020617]">
      
      {/* ── LAYER 1: Animated Radial Gradients (15s Loop, CSS ONLY) ── */}
      {/* Using pure opacity shifts instead of x/y transforms for zero-lag background mixing */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] rounded-full"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle at center, rgba(30,58,138,0.3) 0%, transparent 60%)",
          }}
        />
        <motion.div 
          className="absolute top-[30%] right-[-20%] w-[70vw] h-[70vw] rounded-full"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            background: "radial-gradient(circle at center, rgba(14,165,233,0.15) 0%, transparent 55%)",
          }}
        />
      </div>

      {/* ── LAYER 2: Abstract Industrial Tool Shapes (Strokes only, Extreme Low Opacity) ── */}
      {/* Max 3 elements, 4-8% opacity, incredibly slow continuous rotations (30s-40s loops) */}
      <motion.div className="absolute inset-0 text-white" style={{ y: driftY, willChange: "transform" }}>
        
        {/* CNC End Mill Silhouette */}
        <motion.div 
          className="absolute top-[10%] right-[10%] w-[45vw] h-[45vw] opacity-[0.05]"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
            <rect x="42" y="10" width="16" height="35" strokeDasharray="2 2" />
            <path d="M42,45 L58,45 L55,85 L50,90 L45,85 Z" />
            <path d="M44,55 L56,65 M44,65 L56,75 M44,75 L56,85" />
            <circle cx="50" cy="50" r="45" strokeDasharray="1 4" strokeWidth="0.2" />
          </svg>
        </motion.div>

        {/* Diamond Cutting Insert */}
        <motion.div 
          className="absolute top-[50%] left-[5%] w-[40vw] h-[40vw] opacity-[0.05]"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
            <polygon points="50,15 85,50 50,85 15,50" />
            <circle cx="50" cy="50" r="8" />
            <circle cx="50" cy="50" r="14" strokeDasharray="1 2" strokeWidth="0.5" />
            {/* Alignment crosshairs */}
            <path d="M 50,0 L 50,30 M 50,70 L 50,100 M 0,50 L 30,50 M 70,50 L 100,50" strokeWidth="0.2" />
          </svg>
        </motion.div>
        
        {/* Drill Bit Abstract */}
        <motion.div 
          className="absolute top-[75%] right-[20%] w-[35vw] h-[35vw] opacity-[0.04]"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" className="w-full h-full">
            <path d="M45,90 C45,90 50,95 55,90 L55,30 L50,15 L45,30 Z" />
            <path d="M45,70 L55,80 M45,50 L55,60 M45,30 L55,40" />
            <circle cx="50" cy="50" r="40" strokeWidth="0.1" />
          </svg>
        </motion.div>
      </motion.div>

    </div>
  );
}
