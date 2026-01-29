"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "WEB\nDESIGN",
    description:
      "Clean, modern designs that look great on every device. We create websites that keep visitors engaged and turn them into paying customers.",
    tags: ["UI/UX Design", "Responsive Design", "Figma", "Prototyping"],
  },
  {
    id: "02",
    title: "WEB\nDEVELOPMENT",
    description:
      "Fast, secure websites built with the latest technology. Your site will load instantly and rank higher on Google.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "03",
    title: "AI\nINTEGRATION",
    description:
      "Add AI chatbots, automation, and smart features to your business. Save time, reduce costs, and serve customers 24/7.",
    tags: ["ChatGPT", "LLMs", "Automation", "AI Agents"],
  },
  {
    id: "04",
    title: "FULL STACK\nAPPS",
    description:
      "Complete web applications from start to finish. E-commerce stores, SaaS platforms, dashboards — we build it all.",
    tags: ["E-commerce", "SaaS", "CMS", "Cloud Deployment"],
  },
];

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative z-10 bg-neutral-950 text-white py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 lg:mb-16 border-b border-white/10 pb-6 gap-2">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold">
            Services
          </h2>
          <span className="font-mono text-xs sm:text-sm text-neutral-500">
            (WHAT WE DO)
          </span>
        </div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceItem = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative py-8 sm:py-10 lg:py-12 border-b border-white/10 px-2 sm:px-4 lg:px-6 -mx-2 sm:-mx-4 lg:-mx-6 rounded-lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* ID */}
        <div className="lg:col-span-1">
          <span className="font-mono text-xs sm:text-sm text-matrixo-green">
            /{service.id}
          </span>
        </div>

        {/* Title */}
        <div className="lg:col-span-5">
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-tight text-white whitespace-pre-line">
            {service.title}
          </h3>
        </div>

        {/* Description & Tags */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6 pt-2 lg:pt-0">
          <p className="font-sans text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full border border-white/10 text-[11px] sm:text-xs font-mono text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
