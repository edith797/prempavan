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

  // Use window scroll (Lenis drives window)
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

  // Smooth scroll via Lenis (it listens to window, so native scrollIntoView works)
  const scrollTo = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-3 bg-white/35 backdrop-blur-xl border-b border-white/40" : "py-6 bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-16 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={(e) => scrollTo("#home", e as React.MouseEvent)}
        >
          <div className="w-11 h-11 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src="/logo.png"
              alt="PremPavan Logo"
              className="w-full h-full object-contain drop-shadow-sm"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
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
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(link.href, e)}
                className={cn(
                  "relative text-[14px] transition-all duration-300 group inline-block",
                  isActive
                    ? "text-[#C2A878] font-semibold"
                    : "text-[#1C1C1C] font-medium hover:text-[#C2A878]"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-[#C2A878] transition-all duration-300",
                  isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                )} />
              </a>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2.5 rounded-xl border border-white/60 bg-white/40 backdrop-blur-xl text-[#1C1C1C] transition-all duration-300 hover:bg-white/70"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, scaleY: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden absolute top-full left-0 w-full origin-top overflow-hidden bg-white/35 backdrop-blur-xl border-b border-white/40"
        style={{ transformOrigin: "top" }}
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
