"use client";
import React from "react";
import { Quote } from "lucide-react";


const testimonials = [
  {
    quote: "Matrixo transformed our legacy infrastructure into a self-evolving ecosystem. The ROI has been astronomical.",
    author: "Sarah Chen",
    role: "CTO, Nexus FinTech"
  },
  {
    quote: "The most visionary team we've worked with. They don't just build software; they architect the future.",
    author: "Marcus Thorne",
    role: "Director, Alpha Ventures"
  },
  {
    quote: "Their avant-garde approach to UI/UX redefined our brand identity. Absolute perfection.",
    author: "Elena Rodriguez",
    role: "Head of Product, Lumiere"
  }
];

export const Testimonials = () => {
  return (
    <section className="bg-neutral-950 py-24 border-t border-white/10">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">CLIENT INTEL</h2>
          <Quote className="text-matrixo-purple w-8 h-8 md:w-12 md:h-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-matrixo-green/50 transition-colors duration-300"
            >
              <p className="font-sans text-lg text-neutral-300 mb-8 leading-relaxed">"{item.quote}"</p>
              <div>
                <div className="font-heading font-bold text-white text-xl">{item.author}</div>
                <div className="font-mono text-xs text-matrixo-green mt-1">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
