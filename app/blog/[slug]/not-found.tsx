"use client";
import { motion } from "framer-motion";
import { TopNav } from "@/components/ui/TopNav";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { FileQuestion, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <TopNav />
      <FloatingNav />

      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-matrixo-purple/10 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-matrixo-purple/20 rounded-full blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <FileQuestion className="w-20 h-20 text-matrixo-purple mx-auto mb-6" />
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
            404
          </h1>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-white mb-4">
            Post Not Found
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-matrixo-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
