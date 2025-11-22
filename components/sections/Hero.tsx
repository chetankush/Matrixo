"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThreeBackground } from "@/components/ui/ThreeBackground";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { ArrowDownRight } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-black">
      {/* 3D Background Layer - Fixed to create depth */}
      <div className="fixed inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-end pb-32">
        
        {/* Top Bar / HUD Placeholder */}
        <div className="absolute top-8 left-6 md:left-12 right-6 md:right-12 flex justify-between items-start mix-blend-difference">
          <span className="font-heading font-bold text-xl tracking-tighter text-white">MATRIXO</span>
          <div className="flex flex-col items-end text-xs font-mono text-neutral-400">
            <span>EST. 2024</span>
            <span>TOKYO / SF / NY</span>
          </div>
        </div>

        {/* Main Typography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mt-12 ml-[-30px] mb-8">
          
          {/* Left Column: Massive Title */}
          <motion.div 
            style={{ y: yLeft, opacity }}
            className="lg:col-span-9"
          >
            <h1 className="font-heading text-[8vw] lg:text-[9vw] leading-[0.9] font-extrabold text-white tracking-tighter break-words pr-8 mr-12">
              <EncryptedText 
                text="DIGITAL"
                interval={80}
                className="block"
                revealedClassName="text-white"
                encryptedClassName="text-neutral-600"
              />
              <EncryptedText 
                text="UNIVERSE"
                interval={80}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500"
                revealedClassName=""
                encryptedClassName="text-neutral-700"
              />
            </h1>
          </motion.div>

          {/* Right Column: Vertical Description & CTA */}
          <motion.div 
            style={{ y: yRight, opacity }}
            className="lg:col-span-3 flex flex-col justify-end items-start lg:items-end h-full pt-10 lg:pt-0"
          >
            <p className="font-sans text-base md:text-lg text-neutral-300 max-w-sm text-left lg:text-right leading-relaxed mb-10">
              We transmute code into culture. <br />
              An avant-garde agency building intelligent ecosystems for the post-digital age.
            </p>

            <button className="group flex items-center gap-4 text-white hover:text-matrixo-green transition-colors duration-300">
              <span className="font-heading font-bold text-xl tracking-tight">ENTER THE VOID</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:scale-110">
                <ArrowDownRight className="w-5 h-5" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Bottom HUD Elements */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 flex justify-between items-end mix-blend-difference">
          <div className="hidden md:block w-32 h-[1px] bg-white/20"></div>
          <div className="font-mono text-xs text-neutral-500">SCROLL TO EXPLORE</div>
        </div>
      </div>
    </section>
  );
};
