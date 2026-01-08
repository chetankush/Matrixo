"use client";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Matrixo transformed our legacy infrastructure into a self-evolving ecosystem. The ROI has been astronomical.",
    author: "Sarah Chen",
    role: "CTO, Nexus FinTech",
  },
  {
    quote:
      "The most visionary team we've worked with. They don't just build software; they architect the future.",
    author: "Marcus Thorne",
    role: "Director, Alpha Ventures",
  },
  {
    quote:
      "Their avant-garde approach to UI/UX redefined our brand identity. Absolute perfection.",
    author: "Elena Rodriguez",
    role: "Head of Product, Lumiere",
  },
];

export const Testimonials = () => {
  return (
    <section className="relative z-10 bg-neutral-950 py-16 sm:py-20 lg:py-24 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 sm:mb-14 lg:mb-16 border-b border-white/10 pb-6">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Client Testimonials
          </h2>
          <Quote className="text-matrixo-purple w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10 hover:border-matrixo-green/50 transition-colors duration-300"
            >
              <p className="font-sans text-sm sm:text-base text-neutral-300 mb-6 leading-relaxed">
                &quot;{item.quote}&quot;
              </p>
              <div>
                <div className="font-heading font-bold text-white text-base sm:text-lg">
                  {item.author}
                </div>
                <div className="font-mono text-xs text-matrixo-green mt-1">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
