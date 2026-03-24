import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(() => {
    // Determine initial state synchronously to avoid flash
    return !sessionStorage.getItem("preloaderShown");
  });

  useEffect(() => {
    if (!isVisible) return;

    // Mark as seen for future navigations in the same session
    sessionStorage.setItem("preloaderShown", "true");

    // Total duration 2 seconds max
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] overflow-hidden"
        >
          {/* Cinematic Light Streak (Whoosh) */}
          <motion.div
            initial={{ x: "-150%", opacity: 0 }}
            animate={{ x: "150%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.15), rgba(255,255,255,0.4), rgba(14,165,233,0.15), transparent)",
              height: "2px",
              top: "50%",
              boxShadow: "0 0 40px 10px rgba(14,165,233,0.2)"
            }}
          />

          <motion.div
            // Scale and fade in, then massive scale up on exit creating a "zoom through" effect
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: [0.6, 1.1, 1.0] }}
            exit={{ 
              scale: 30, 
              opacity: 0,
              transition: { duration: 0.7, ease: [0.8, 0, 0.2, 1] }
            }} 
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative flex flex-col items-center z-10"
          >
            {/* Logo */}
            <img
              src="/logo.png"
              alt="PremPavan"
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_30px_rgba(14,165,233,0.3)] relative z-10"
            />
            
            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 2 }} 
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mt-6 flex flex-col items-center"
            >
              <h1 className="font-black text-2xl md:text-3xl tracking-tight text-[#f8fafc]">PremPavan</h1>
              <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#0ea5e9] uppercase mt-1 font-bold">Precision Engineering</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
