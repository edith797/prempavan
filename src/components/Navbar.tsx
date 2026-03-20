import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const navLinks = [
  { name: "Home",       href: "#home" },
  { name: "About Us",  href: "#about" },
  { name: "Foundation",href: "#foundation" },
  { name: "Products",  href: "#products" },
  { name: "Customers", href: "#customers" },
  { name: "Contact",   href: "#footer-contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sectionIds = navLinks.map(l => l.href.slice(1));
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "py-3 bg-white/28 backdrop-blur-[22px] border-b border-white/35 shadow-[0_4px_32px_rgba(0,0,0,0.06)] saturate-[150%]"
          : "py-6 bg-transparent border-b border-transparent"
      )}
      style={{
        // Subtle inner highlight when scrolled
        boxShadow: isScrolled ? "0 4px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.55)" : "none",
      }}
    >
      <div className="container mx-auto px-6 md:px-16 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={(e) => scrollTo("#home", e as React.MouseEvent)}
        >
          <motion.div
            className="w-11 h-11 flex items-center justify-center"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/logo.png"
              alt="PremPavan Logo"
              className="w-full h-full object-contain drop-shadow-sm"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold text-[18px] leading-none tracking-tight text-[#1C1C1C] group-hover:text-[#C2A878] transition-colors duration-300">
              PremPavan
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary-text mt-1">
              Engineers
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(link.href, e)}
                className={cn(
                  "relative text-[14px] transition-colors duration-300 group inline-block",
                  isActive
                    ? "text-[#C2A878] font-semibold"
                    : "text-[#1C1C1C] font-medium hover:text-[#C2A878]"
                )}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {link.name}
                {/* Slide-in underline micro-interaction */}
                <motion.span
                  className="absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-[#C2A878]"
                  initial={false}
                  animate={{
                    width: isActive ? "100%" : "0%",
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Hover underline separate layer */}
                <span className="absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-[#C2A878] w-0 opacity-0 group-hover:w-full group-hover:opacity-60 transition-all duration-350" />
              </motion.a>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden p-2.5 rounded-xl border border-white/55 bg-white/35 backdrop-blur-[18px] text-[#1C1C1C] transition-colors duration-300 hover:bg-white/65"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.93 }}
          transition={{ duration: 0.15 }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, scaleY: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden absolute top-full left-0 w-full origin-top overflow-hidden bg-white/30 backdrop-blur-[22px] border-b border-white/40"
        style={{ transformOrigin: "top", boxShadow: "0 8px 32px rgba(0,0,0,0.07)" }}
      >
        {navLinks.map(link => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(link.href, e)}
              className={cn(
                "block py-4 px-8 text-[15px] border-b border-black/5 last:border-0 transition-colors duration-200",
                isActive ? "text-[#C2A878] font-semibold" : "text-[#1C1C1C] font-medium hover:text-[#C2A878]"
              )}
            >
              {link.name}
            </a>
          );
        })}
      </motion.div>
    </motion.nav>
  );
}
