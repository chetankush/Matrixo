"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export const TopNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnLightBg, setIsOnLightBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check which section the navbar is over
      const experiencesSection = document.getElementById("experiences");

      if (experiencesSection) {
        const rect = experiencesSection.getBoundingClientRect();
        // If the top of experiences section is above the navbar (80px from top)
        const isOverExperiences = rect.top < 80 && rect.bottom > 80;
        setIsOnLightBg(isOverExperiences);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "Services", link: "#services" },
    { name: "Projects", link: "#projects" },
    { name: "Experiences", link: "#experiences" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "py-3 sm:py-4" : "py-4 sm:py-6 lg:py-8"
        )}
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className={cn(
              "font-heading font-bold text-lg sm:text-xl tracking-tighter z-10 transition-colors duration-300",
              isOnLightBg ? "text-black" : "text-white"
            )}
          >
            FirstVoid
          </a>

          {/* Center Navigation */}
          <div
            className={cn(
              "hidden md:flex items-center gap-1 lg:gap-2 p-2 rounded-full transition-all duration-500",
              isScrolled
                ? isOnLightBg
                  ? "bg-black/5 backdrop-blur-md border border-black/10"
                  : "bg-white/5 backdrop-blur-md border border-white/10"
                : "bg-transparent"
            )}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className={cn(
                  "px-3 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-sans transition-all duration-300",
                  isOnLightBg
                    ? "text-neutral-600 hover:text-black hover:bg-black/10"
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
                )}
              >
                {item.name}
              </a>
            ))}
            <button
              className={cn(
                "ml-2 lg:ml-4 px-4 lg:px-6 py-2 rounded-full font-sans font-bold text-xs lg:text-sm hover:scale-105 transition-all duration-300",
                isOnLightBg
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-white text-black hover:bg-matrixo-green"
              )}
            >
              LET&apos;S TALK
            </button>
          </div>

          {/* Right Side - EST Info */}
          <div
            className={cn(
              "hidden md:flex flex-col items-end text-xs font-mono transition-colors duration-300",
              isOnLightBg ? "text-neutral-500" : "text-neutral-400"
            )}
          >
            <span>EST. 2024</span>
            <span>TOKYO / SF / NY</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors duration-300",
              isOnLightBg ? "text-black" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 pt-24 sm:pt-32 px-4 sm:px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 sm:gap-8">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading text-3xl sm:text-4xl text-white hover:text-matrixo-green transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <button className="mt-4 px-6 py-3 bg-white text-black rounded-full font-sans font-bold text-base hover:bg-matrixo-green transition-all duration-300 w-fit">
                LET&apos;S TALK
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
