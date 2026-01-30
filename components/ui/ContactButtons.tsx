"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";

export const ContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "9303135537";
  const whatsappNumber = "917987401227";

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2 md:bottom-12 md:right-6">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Call Button */}
            <motion.a
              href={`tel:+91${phoneNumber}`}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-white/10 rounded-full shadow-lg hover:bg-neutral-800 transition-colors group md:gap-3 md:px-4 md:py-3"
            >
              <span className="text-white text-sm font-medium hidden sm:block">Call Us</span>
              <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center group-hover:bg-sky-400 transition-colors md:w-10 md:h-10">
                <Phone className="w-4 h-4 text-white md:w-5 md:h-5" />
              </div>
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-white/10 rounded-full shadow-lg hover:bg-neutral-800 transition-colors group md:gap-3 md:px-4 md:py-3"
            >
              <span className="text-white text-sm font-medium hidden sm:block">WhatsApp</span>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-400 transition-colors md:w-10 md:h-10">
                <MessageCircle className="w-4 h-4 text-white md:w-5 md:h-5" />
              </div>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {/* Custom Rotating Button - Smaller on mobile */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 flex items-center justify-center group md:w-16 md:h-16"
      >
        {/* Rotating Text Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 rounded-full border border-white/10 backdrop-blur-sm shadow-xl ${
            isOpen ? "bg-neutral-900" : "bg-neutral-900/80"
          }`}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <path
                id="textPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="text-[8px] font-bold uppercase tracking-widest fill-white md:text-[9px]">
              <textPath href="#textPath" startOffset="0%">
                Call Us •
              </textPath>
            </text>
            <text className="text-[8px] font-bold uppercase tracking-widest fill-white md:text-[9px]">
              <textPath href="#textPath" startOffset="50%">
                WhatsApp •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Center Icon */}
        <div
          className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 md:w-9 md:h-9 ${
            isOpen ? "bg-neutral-800" : "bg-matrixo-green group-hover:bg-green-400"
          }`}
        >
          {isOpen ? (
            <X className="w-3 h-3 text-white md:w-4 md:h-4" />
          ) : (
            <Phone className="w-3 h-3 text-black md:w-4 md:h-4" />
          )}
        </div>
      </motion.button>
    </div>
  );
};
