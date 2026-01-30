"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";

export const ContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "9303135537";
  const whatsappNumber = "917987401227";

  return (
    <div className="fixed bottom-28 right-6 z-50 flex flex-col items-end gap-3 md:bottom-12">
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
              className="flex items-center gap-3 px-4 py-3 bg-neutral-900 border border-white/10 rounded-full shadow-lg hover:bg-neutral-800 transition-colors group"
            >
              <span className="text-white text-sm font-medium hidden sm:block">Call Us</span>
              <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center group-hover:bg-sky-400 transition-colors">
                <Phone className="w-5 h-5 text-white" />
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
              className="flex items-center gap-3 px-4 py-3 bg-neutral-900 border border-white/10 rounded-full shadow-lg hover:bg-neutral-800 transition-colors group"
            >
              <span className="text-white text-sm font-medium hidden sm:block">WhatsApp</span>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-400 transition-colors">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {/* Custom Rotating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-20 h-20 flex items-center justify-center group"
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
            <text className="text-[11px] font-bold uppercase tracking-widest fill-white">
              <textPath href="#textPath" startOffset="0%">
                Call Us • Call Us • Call Us •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Center Icon */}
        <div
          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen ? "bg-neutral-800" : "bg-matrixo-green group-hover:bg-green-400"
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Phone className="w-5 h-5 text-black" />
          )}
        </div>
      </motion.button>
    </div>
  );
};
