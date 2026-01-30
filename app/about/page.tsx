"use client";
import { motion } from "framer-motion";
import { TopNav } from "@/components/ui/TopNav";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { Users, Target, Rocket, Code, Sparkles, Award } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/ui/Footer";
import { ContactButtons } from "@/components/ui/ContactButtons";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Every project we undertake is guided by a clear mission to deliver exceptional results that exceed expectations.",
  },
  {
    icon: Rocket,
    title: "Innovation First",
    description: "We stay at the cutting edge of technology, constantly exploring new ways to solve complex problems.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our success. We build lasting partnerships based on trust and transparency.",
  },
  {
    icon: Code,
    title: "Technical Excellence",
    description: "Clean code, robust architecture, and best practices are the foundation of everything we build.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-6 sm:pt-28 sm:pb-8 overflow-hidden">
        {/* Blue gradient background only */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px]" />
        {/* Tiny smoke particles */}
        <div className="absolute inset-0 z-[1]">
          <ParticleBackground />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-matrixo-green text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              About FirstVoid
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              We Build Digital
              <span className="text-matrixo-green"> Experiences</span>
            </h1>
            <p className="text-neutral-400 text-lg sm:text-xl max-w-2xl mx-auto">
              A passionate team of designers, developers, and innovators dedicated to
              transforming ideas into powerful digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-5 text-neutral-300 text-lg sm:text-xl leading-relaxed">
                <p>
                  Founded in 2024, FirstVoid emerged from a simple belief: technology should
                  empower businesses, not complicate them. What started as a small team of
                  passionate developers has grown into a full-service digital agency.
                </p>
                <p>
                  We&apos;ve helped startups launch their first products, assisted enterprises in
                  digital transformation, and built AI-powered solutions that push the
                  boundaries of what&apos;s possible.
                </p>
                <p>
                  Today, we continue to innovate, learn, and grow alongside our clients,
                  always staying true to our core mission of delivering excellence in every
                  line of code we write.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-matrixo-purple/20 to-matrixo-purple/10 p-1">
                <div className="w-full h-full rounded-xl bg-neutral-900 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                    alt="Team collaboration"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-matrixo-purple/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-28 bg-black/50">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-matrixo-purple/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-matrixo-purple/20 flex items-center justify-center mb-4 group-hover:bg-matrixo-purple/30 transition-colors">
                  <value.icon className="w-6 h-6 text-matrixo-purple" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Statement */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed">
              We are a team of{" "}
              <span className="text-matrixo-green">experienced</span> and{" "}
              <span className="text-matrixo-purple">skilled</span> designers, developers, and AI engineers passionate about building innovative digital products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-transparent to-matrixo-purple/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Award className="w-12 h-12 text-matrixo-green mx-auto mb-6" />
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-8">
              Let&apos;s discuss how we can help bring your vision to life with our expertise
              and passion for innovation.
            </p>
            <Link
              href="/#contact"
              className="inline-flex px-8 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-matrixo-green transition-colors duration-300"
            >
              GET IN TOUCH
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactButtons />
    </main>
  );
}
