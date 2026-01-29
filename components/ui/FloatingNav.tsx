"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Users, Briefcase, MessageSquare, BookOpen, Mail } from "lucide-react";
import Link from "next/link";

export const FloatingNav = ({ className }: { className?: string }) => {
  const navItems = [
    { name: "Home", link: "/", icon: Home },
    { name: "About", link: "/about", icon: Users },
    { name: "Projects", link: "/projects", icon: Briefcase },
    { name: "Testimonials", link: "/testimonials", icon: MessageSquare },
    { name: "Blog", link: "/blog", icon: BookOpen },
    { name: "Contact", link: "/#contact", icon: Mail },
  ];

  return (
    <div className={cn("fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] md:hidden", className)}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-1 px-3 py-2 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl shadow-matrixo-purple/10"
      >
        {navItems.map((item, idx) => (
          <Link key={idx} href={item.link}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative group p-2.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};
