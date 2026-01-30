"use client";
import { useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Users, Briefcase, MessageSquare, BookOpen, Mail } from "lucide-react";
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
      // Auto-hide tooltip after 2 seconds
      tooltipTimer.current = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }, 500); // 500ms for long press
  }, []);

  const handlePressEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    handlePressEnd();
    // Keep tooltip visible if it was shown
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
    if (item.link.startsWith("/#")) return false; // Hash links are not active states
    return pathname.startsWith(item.link);
  };

  return (
    <div className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden", className)}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-1 px-3 py-2 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl shadow-matrixo-purple/10"
      >
        {navItems.map((item, idx) => (
          <NavItem key={idx} item={item} isActive={isItemActive(item)} />
        ))}
      </motion.div>
    </div>
  );
};
