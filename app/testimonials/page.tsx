"use client";
import { motion } from "framer-motion";
import { TopNav } from "@/components/ui/TopNav";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import Link from "next/link";
import { Footer } from "@/components/ui/Footer";
import { ContactButtons } from "@/components/ui/ContactButtons";

const testimonials = [
  {
    id: 1,
    quote: "They built our AI MVP in just 3 weeks. We went from idea to paying customers faster than I ever imagined.",
    name: "Ryan Peters",
    title: "Founder, NeuralBox AI",
    highlight: "3 weeks to MVP",
  },
  {
    id: 2,
    quote: "FirstVoid understood our vision for an AI-powered product. The result exceeded every expectation we had.",
    name: "Amanda Liu",
    title: "Co-founder, DataSpark",
    highlight: "AI-powered product",
  },
  {
    id: 3,
    quote: "As a first-time founder, I needed a team that could move fast. FirstVoid was the perfect partner for our AI startup.",
    name: "Marcus Chen",
    title: "Founder, Lumina AI",
    highlight: "First-time founder",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-6 sm:pt-28 sm:pb-8 overflow-hidden">
        {/* Blue gradient background only */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 z-[1]">
          <ParticleBackground />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-matrixo-green text-sm font-medium mb-3">Trusted by Founders</p>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              What they say
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="space-y-16 sm:space-y-24">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Number */}
                <span className="absolute -left-4 sm:-left-12 top-0 font-heading text-6xl sm:text-8xl font-bold text-white/[0.03]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="relative">
                  {/* Highlight tag */}
                  <span className="inline-block px-3 py-1 rounded-full bg-matrixo-green/10 text-matrixo-green text-xs font-medium mb-4">
                    {testimonial.highlight}
                  </span>

                  {/* Quote */}
                  <p className="font-heading text-xl sm:text-2xl md:text-3xl text-white leading-snug mb-6">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-matrixo-purple" />
                    <div>
                      <span className="text-white text-sm">{testimonial.name}</span>
                      <span className="text-neutral-500 text-sm"> · {testimonial.title}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Subtle blurred glow - positioned at top */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-matrixo-green/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-1/3 w-48 h-48 bg-matrixo-purple/10 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-[600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 text-center">
          <p className="text-neutral-400 text-sm mb-6">
            Ready to build your AI product?
          </p>
          <Link
            href="/#contact"
            className="inline-flex px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-matrixo-green transition-colors"
          >
            Let's Talk
          </Link>
        </div>
      </section>

      <Footer />
      <ContactButtons />
    </main>
  );
}
