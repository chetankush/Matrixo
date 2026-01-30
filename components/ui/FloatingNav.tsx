"use client";
import { useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Users, Briefcase, MessageSquare, BookOpen, Mail, Phone, MessageCircle, X } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  name: string;
  link?: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
}

const NavItem = ({ item, isActive }: { item: NavItemProps; isActive: boolean }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const tooltipTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = useCallback(() => {
    longPressTimer.current = setTimeout(() => {
      setShowTooltip(true);
      tooltipTimer.current = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }, 500);
  }, []);

  const handlePressEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    handlePressEnd();
  }, [handlePressEnd]);

  const content = (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={() => {
        handlePressEnd();
        setShowTooltip(false);
        if (tooltipTimer.current) {
          clearTimeout(tooltipTimer.current);
        }
      }}
      onTouchStart={handlePressStart}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "relative group p-2.5 rounded-full transition-colors",
        !isActive && "hover:bg-white/10"
      )}
    >
      <item.icon className={cn(
        "w-4 h-4 transition-colors",
        isActive ? "text-matrixo-green" : "text-neutral-400 group-hover:text-white"
      )} />

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 border border-white/10 rounded-md whitespace-nowrap z-50"
          >
            <span className="text-xs text-white font-medium">{item.name}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 border-r border-b border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (item.href) {
    return (
      <a href={item.href} target={item.isExternal ? "_blank" : undefined} rel={item.isExternal ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return <Link href={item.link || "/"}>{content}</Link>;
};

// Rotating Contact Button Component
const RotatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "9303135537";
  const whatsappNumber = "917987401227";

  return (
    <div className="relative">
      {/* Expanded Options */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 flex flex-col items-end gap-2">
            {/* Call Button */}
            <motion.a
              href={`tel:+91${phoneNumber}`}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-white/10 rounded-full shadow-lg"
            >
              <span className="text-white text-xs font-medium">Call</span>
              <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                <Phone className="w-3 h-3 text-white" />
              </div>
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-white/10 rounded-full shadow-lg"
            >
              <span className="text-white text-xs font-medium">WhatsApp</span>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-3 h-3 text-white" />
              </div>
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      {/* Rotating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className="relative w-10 h-10 flex items-center justify-center"
      >
        {/* Rotating Text Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 rounded-full border border-white/10 ${
            isOpen ? "bg-neutral-800" : "bg-neutral-900/80"
          }`}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <path
                id="navTextPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="text-[8px] font-bold uppercase tracking-widest fill-white">
              <textPath href="#navTextPath" startOffset="0%">
                Call •
              </textPath>
            </text>
            <text className="text-[8px] font-bold uppercase tracking-widest fill-white">
              <textPath href="#navTextPath" startOffset="50%">
                Chat •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Center Icon */}
        <div
          className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen ? "bg-neutral-700" : "bg-matrixo-green"
          }`}
        >
          {isOpen ? (
            <X className="w-2.5 h-2.5 text-white" />
          ) : (
            <Phone className="w-2.5 h-2.5 text-black" />
          )}
        </div>
      </motion.button>
    </div>
  );
};

export const FloatingNav = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const navItems: NavItemProps[] = [
    { name: "Home", link: "/", icon: Home },
    { name: "About", link: "/about", icon: Users },
    { name: "Projects", link: "/projects", icon: Briefcase },
    { name: "Testimonials", link: "/testimonials", icon: MessageSquare },
    { name: "Blog", link: "/blog", icon: BookOpen },
    { name: "Contact", link: "/#contact", icon: Mail },
  ];

  const isItemActive = (item: NavItemProps) => {
    if (!item.link) return false;
    if (item.link === "/") return pathname === "/";
    if (item.link.startsWith("/#")) return false;
    return pathname.startsWith(item.link);
  };

  return (
    <div className={cn("fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] md:hidden", className)}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl shadow-matrixo-purple/10"
      >
        {navItems.map((item, idx) => (
          <NavItem key={idx} item={item} isActive={isItemActive(item)} />
        ))}

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Rotating Contact Button */}
        <RotatingContactButton />
      </motion.div>
    </div>
  );
};
