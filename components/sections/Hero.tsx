"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { ArrowDownRight } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden pointer-events-none"
    >
      {/* Content Layer - fixed at bottom */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-[100px] sm:bottom-[60px] md:bottom-[20px] left-0 right-0 z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pointer-events-auto"
      >
        {/* Main Typography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-end">
          {/* Left Column: Massive Title */}
          <div className="lg:col-span-7">
            <h1 className="font-heading text-[13vw] sm:text-[11vw] lg:text-[9vw] leading-[0.9] font-extrabold text-white tracking-tight">
              <EncryptedText
                text="WE BUILD"
                interval={80}
                className="block font-heading font-extrabold"
                revealedClassName="text-white font-heading font-extrabold"
                encryptedClassName="text-neutral-500 font-heading font-extrabold"
              />
              <EncryptedText
                text="SOFTWARES"
                interval={80}
                className="block text-white font-heading font-extrabold mt-[-0.05em]"
                revealedClassName="font-heading font-extrabold"
                encryptedClassName="text-neutral-700 font-heading font-extrabold"
              />
            </h1>
          </div>

          {/* Right Column: Description & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-end items-start lg:items-end pb-1 lg:pb-2 lg:pr-12 xl:pr-12">
            <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-sm text-left lg:text-right leading-relaxed mb-4">
              Web design. Development. AI integration.
              <br className="hidden sm:block" />
              We build Websites & Apps that convert visitors into customers.
            </p>

            <button
              onClick={scrollToServices}
              className="group flex items-center gap-3 text-white hover:text-matrixo-green transition-colors duration-300"
            >
              <span className="font-heading font-bold text-base sm:text-lg tracking-tight">
                SEE OUR WORK
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:scale-110">
                <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
