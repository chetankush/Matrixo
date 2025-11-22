"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export const TopNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
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
          isScrolled ? "py-4" : "py-8"
        )}
      >
        <div className="w-full flex justify-center mx-auto px-6 md:px-12 lg:px-32">
          <div className={cn(
            "relative flex items-center justify-center w-fit p-2 rounded-full transition-all duration-500",
            isScrolled ? "bg-white/5 backdrop-blur-md border border-white/10" : "bg-transparent"
          )}>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="px-6 py-2 rounded-full text-sm font-sans text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {item.name}
                </a>
              ))}
              <button className="ml-4 px-6 py-2 bg-white text-black rounded-full font-sans font-bold text-sm hover:bg-matrixo-green hover:scale-105 transition-all duration-300">
                LET'S TALK
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="absolute right-2 md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
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
            className="fixed inset-0 z-40 bg-black/95 pt-32 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading text-4xl text-white hover:text-matrixo-green transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
