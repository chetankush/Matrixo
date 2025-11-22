"use client";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const experiences = [
  {
    title: "Brand\nIdentity",
    description: "Crafting timeless visual systems",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
  },
  {
    title: "Digital\nProducts",
    description: "Designing intelligent interfaces",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
  },
  {
    title: "Immersive\nExperiences",
    description: "Building next-gen interactions",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
  },
  {
    title: "Strategic\nConsulting",
    description: "Architecting digital futures",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  }
];

export const Experiences = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="experiences" className="bg-white py-20 relative">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-neutral-900 mb-4 leading-tight">
            MATRIXO EXPERIENCES
          </h2>
          <p className="font-sans text-base md:text-lg text-neutral-600 max-w-md">
            A small taste of the experiences<br />Matrixo have mastered.
          </p>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {experiences.map((exp, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-start group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Text */}
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-2 whitespace-pre-line leading-tight">
                  {exp.title}
                </h3>
                <p className="font-sans text-sm text-neutral-600">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border-2 border-neutral-900 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-colors duration-300"
              aria-label="Scroll left"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border-2 border-neutral-900 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-colors duration-300"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
