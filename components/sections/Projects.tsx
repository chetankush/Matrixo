"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "NEURAL\nFINANCE",
    category: "FinTech AI",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2664&auto=format&fit=crop",
    year: "2024"
  },
  {
    title: "QUANTUM\nANALYTICS",
    category: "SaaS Platform",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    year: "2023"
  },
  {
    title: "SYNTHETIC\nCOMMERCE",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    year: "2024"
  }
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} id="projects" className="bg-black text-white py-24 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-20">
          <h2 className="font-heading text-3xl md:text-5xl font-bold">SELECTED WORKS</h2>
          <span className="font-mono text-neutral-500">CASE STUDIES</span>
        </div>

        {/* Projects Gallery */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 flex justify-center">
          <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold tracking-tight overflow-hidden hover:scale-105 transition-transform duration-300">
            <span className="relative z-10 flex items-center gap-2">
              VIEW ARCHIVE <ArrowUpRight className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-matrixo-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ProjectItem = ({ project, index }: { project: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
    >
      {/* Image - Parallax Effect */}
      <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''} relative overflow-hidden rounded-lg aspect-[4/3]`}>
        <div className="absolute inset-0 bg-matrixo-purple/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
      </div>

      {/* Content */}
      <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''} flex flex-col justify-center z-20 mix-blend-difference`}>
        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 1 ? 'justify-end' : ''}`}>
          <span className="font-mono text-sm text-matrixo-green">{project.year}</span>
          <div className="w-12 h-[1px] bg-white/50" />
          <span className="font-mono text-sm text-neutral-300">{project.category}</span>
        </div>
        
        <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.9] mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-500 transition-all duration-500 whitespace-pre-line">
          {project.title}
        </h3>

        <div className={`flex ${index % 2 === 1 ? 'justify-end' : ''}`}>
          <button className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
