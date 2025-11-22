"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "01",
    title: "INTELLIGENT\nECOSYSTEMS",
    description: "We architect self-evolving digital infrastructures that adapt to user behavior.",
    tags: ["AI Architecture", "Neural Networks", "Predictive Modeling"]
  },
  {
    id: "02",
    title: "IMMERSIVE\nINTERFACES",
    description: "Breaking the fourth wall of the web with WebGL and spatial computing.",
    tags: ["WebGL", "R3F", "Spatial UI"]
  },
  {
    id: "03",
    title: "FULL STACK\nALCHEMY",
    description: "Transmuting complex backend logic into seamless frontend experiences.",
    tags: ["Next.js", "Edge Computing", "Scalable Systems"]
  },
  {
    id: "04",
    title: "DATA\nSYNTHESIS",
    description: "Turning raw data into actionable visual intelligence.",
    tags: ["Data Viz", "Real-time Analytics", "Insight Engines"]
  }
];

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="services" className="relative bg-neutral-950 text-white py-24">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-24 border-b border-white/10 pb-8">
          <h2 className="font-heading text-3xl md:text-5xl font-bold">CAPABILITIES</h2>
          <span className="font-mono text-neutral-500">(SYSTEMS ONLINE)</span>
        </div>

        {/* Kinetic List */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceItem = ({ service, index }: { service: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative py-20 border-b border-white/10 hover:border-white/50 transition-colors duration-500"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ID */}
        <div className="lg:col-span-1">
          <span className="font-mono text-sm text-matrixo-green">/{service.id}</span>
        </div>

        {/* Title */}
        <div className="lg:col-span-7">
          <h3 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter text-neutral-500 group-hover:text-white transition-colors duration-500 whitespace-pre-line">
            {service.title}
          </h3>
        </div>

        {/* Description & Tags */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full pt-4 lg:pt-0">
          <p className="font-sans text-lg text-neutral-400 max-w-md leading-relaxed group-hover:text-white transition-colors duration-500">
            {service.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-8">
            {service.tags.map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-neutral-500 group-hover:border-matrixo-purple group-hover:text-matrixo-purple transition-colors duration-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-matrixo-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};
