"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Globe, Palette } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "VisionAI Assistant",
    category: "AI MVP",
    description: "Document analysis powered by GPT-4 Vision. Extract insights from PDFs and images instantly.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    tags: ["Next.js", "OpenAI", "Python"],
    icon: Sparkles,
  },
  {
    title: "ContentForge AI",
    category: "AI MVP",
    description: "AI content generation for marketers. Blog posts, social media, and ad copy with brand voice.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    tags: ["React", "Claude API", "Node.js"],
    icon: Sparkles,
  },
  {
    title: "DataSense Analytics",
    category: "AI MVP",
    description: "Query databases using plain English. Generate visualizations without writing SQL.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Python", "OpenAI", "D3.js"],
    icon: Sparkles,
  },
  {
    title: "TeamFlow",
    category: "SaaS",
    description: "Project management with real-time collaboration, Kanban boards, and team analytics.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    tags: ["Next.js", "Prisma", "WebSockets"],
    icon: Globe,
  },
  {
    title: "InvoiceHub",
    category: "SaaS",
    description: "Complete invoicing solution for freelancers. Recurring billing and expense tracking.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    tags: ["React", "Stripe", "PostgreSQL"],
    icon: Globe,
  },
  {
    title: "FinWise Banking",
    category: "UI/UX",
    description: "Mobile banking redesign with 40% improvement in task completion. Full design system.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    tags: ["Figma", "Prototyping", "Research"],
    icon: Palette,
  },
];

export const Projects = () => {
  return (
    <section
      id="projects"
      className="relative z-10 bg-black text-white py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 border-b border-white/10 pb-6 gap-4">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              Our Work
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              AI MVPs, SaaS Products & Design Systems
            </p>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-matrixo-green text-sm font-medium hover:underline"
          >
            View All Projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-matrixo-purple/50 transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium text-white">
                      <project.icon className="w-3 h-3 text-matrixo-green" />
                      {project.category}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-black" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-heading text-lg font-bold text-white mb-1.5 group-hover:text-matrixo-green transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-0.5 rounded bg-white/5 text-neutral-400 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="/projects"
            className="group relative px-6 sm:px-8 py-3 bg-white text-black rounded-full font-bold tracking-tight overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm">
              EXPLORE ALL PROJECTS <ArrowUpRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-matrixo-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        </div>
      </div>
    </section>
  );
};
