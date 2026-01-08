"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "NEURAL\nFINANCE",
    category: "FinTech AI",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2664&auto=format&fit=crop",
    year: "2024",
  },
  {
    title: "QUANTUM\nANALYTICS",
    category: "SaaS Platform",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    year: "2023",
  },
  {
    title: "SYNTHETIC\nCOMMERCE",
    category: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    year: "2024",
  },
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative z-10 bg-black text-white py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 lg:mb-16 border-b border-white/10 pb-6 gap-2">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold">
            Work
          </h2>
          <span className="font-mono text-xs sm:text-sm text-neutral-500">
            CASE STUDIES 2023-24
          </span>
        </div>

        {/* Projects Gallery */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 flex justify-center">
          <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-bold tracking-tight overflow-hidden hover:scale-105 transition-transform duration-300">
            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
              VIEW ARCHIVE <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="absolute inset-0 bg-matrixo-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ProjectItem = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7 }}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
    >
      {/* Image */}
      <div
        className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""} relative overflow-hidden rounded-xl aspect-[4/3]`}
      >
        <div className="absolute inset-0 bg-matrixo-purple/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
      </div>

      {/* Content */}
      <div
        className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""} flex flex-col justify-center z-20`}
      >
        <div
          className={`flex items-center gap-3 mb-4 flex-wrap ${index % 2 === 1 ? "lg:justify-end" : ""}`}
        >
          <span className="font-mono text-xs sm:text-sm text-matrixo-green">
            {project.year}
          </span>
          <div className="w-8 sm:w-10 h-[1px] bg-white/30" />
          <span className="font-mono text-xs sm:text-sm text-neutral-400">
            {project.category}
          </span>
        </div>

        <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-[0.95] mb-6 text-white whitespace-pre-line">
          {project.title}
        </h3>

        <div className={`flex ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
          <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
