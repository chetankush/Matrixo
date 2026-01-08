"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Layers, Briefcase, Mail, Menu } from "lucide-react";
import Link from "next/link";

export const FloatingNav = ({ className }: { className?: string }) => {
  const navItems = [
    { name: "Home", link: "/", icon: Home },
    { name: "Services", link: "#services", icon: Layers },
    { name: "Work", link: "#projects", icon: Briefcase },
    { name: "Contact", link: "#contact", icon: Mail },
  ];

  return (
    <div className={cn("fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]", className)}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl shadow-matrixo-purple/10"
      >
        {navItems.map((item, idx) => (
          <Link key={idx} href={item.link}>
            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="relative group p-3 rounded-full hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.name}
              </span>
            </motion.div>
          </Link>
        ))}
        
        <div className="w-[1px] h-6 bg-white/10 mx-2" />
        
        <button className="p-3 rounded-full hover:bg-white/10 transition-colors">
          <Menu className="w-5 h-5 text-white" />
        </button>
      </motion.div>
    </div>
  );
};
