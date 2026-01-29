"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export const TopNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnLightBg, setIsOnLightBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check which section the navbar is over
      // Experiences section is now dark, so we don't switch to dark nav text
      // Only switch to dark text for light background sections
      setIsOnLightBg(false);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Testimonials", link: "/testimonials" },
    { name: "Blog", link: "/blog" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "py-3 sm:py-4 bg-black/60 backdrop-blur-xl border-b border-white/10 supports-[backdrop-filter]:bg-black/40 md:bg-transparent md:backdrop-blur-none md:border-b-0"
            : "py-4 sm:py-6 lg:py-6 bg-transparent"
        )}
      >
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo - Left */}
          <Link
            href="/"
            className={cn(
              "hidden md:block font-heading font-bold text-2xl lg:text-3xl tracking-[0.5px] py-1 transition-colors duration-300 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]",
              isOnLightBg ? "text-black" : "text-white"
            )}
          >
            FirstVoid
          </Link>

          {/* Center Navigation */}
          <div
            className={cn(
              "hidden md:flex items-center gap-1 lg:gap-2 p-2 rounded-full transition-all duration-500 absolute left-1/2 -translate-x-1/2",
              isScrolled
                ? isOnLightBg
                  ? "bg-black/5 backdrop-blur-md border border-black/10"
                  : "bg-white/5 backdrop-blur-md border border-white/10"
                : "bg-transparent"
            )}
          >
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className={cn(
                  "px-4 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-sans transition-all duration-300",
                  isOnLightBg
                    ? "text-neutral-600 hover:text-black hover:bg-black/10"
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* LET'S TALK - Right */}
          <Link
            href="/#contact"
            className={cn(
              "hidden md:block px-8 lg:px-10 py-2.5 rounded-full font-sans font-bold text-xs lg:text-sm transition-all duration-300",
              isOnLightBg
                ? "bg-black text-white hover:bg-neutral-800"
                : "bg-white text-black hover:bg-matrixo-green"
            )}
          >
            LET&apos;S TALK
          </Link>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Link
              href="/"
              className={cn(
                "font-heading font-bold text-lg tracking-tighter transition-colors duration-300",
                isOnLightBg ? "text-black" : "text-white"
              )}
            >
              FirstVoid
            </Link>
            <button
              className={cn(
                "p-2 transition-colors duration-300",
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
                <Link
                  key={idx}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading text-3xl sm:text-4xl text-white hover:text-matrixo-green transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-6 py-3 bg-white text-black rounded-full font-sans font-bold text-base hover:bg-matrixo-green duration-300 w-fit"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
