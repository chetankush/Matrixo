"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopNav } from "@/components/ui/TopNav";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { ExternalLink, Github, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  "All",
  "AI MVP",
  "SaaS",
  "UI/UX",
];

const projects = [
  {
    id: 1,
    title: "VisionAI Assistant",
    category: "AI MVP",
    description:
      "Intelligent document analysis tool powered by GPT-4 Vision. Extracts insights, summarizes content, and answers questions from uploaded PDFs, images, and documents in seconds.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    tags: ["Next.js", "OpenAI GPT-4", "Python", "LangChain"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "ContentForge AI",
    category: "AI MVP",
    description:
      "AI-powered content generation platform for marketers. Creates blog posts, social media content, ad copy, and email campaigns with brand voice customization and SEO optimization.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    tags: ["React", "Claude API", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "DataSense Analytics",
    category: "AI MVP",
    description:
      "Natural language data analytics tool that lets users query databases using plain English. Generates visualizations, reports, and actionable insights without writing SQL.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Python", "OpenAI", "PostgreSQL", "D3.js"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 4,
    title: "TeamFlow",
    category: "SaaS",
    description:
      "Modern project management platform with real-time collaboration, Kanban boards, time tracking, and team analytics. Built for remote teams who need seamless async communication.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSockets"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "InvoiceHub",
    category: "SaaS",
    description:
      "Complete invoicing and payment solution for freelancers and small businesses. Features recurring billing, expense tracking, client portals, and financial reporting dashboard.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "FinWise Mobile Banking",
    category: "UI/UX",
    description:
      "Complete UI/UX redesign for a mobile banking app. Includes user research, wireframes, high-fidelity prototypes, design system creation, and usability testing with 40% improvement in task completion.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    tags: ["Figma", "User Research", "Prototyping", "Design System"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <main className="min-h-screen bg-neutral-950 overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-12 overflow-hidden">
        {/* Greenish/purple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-matrixo-purple/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-matrixo-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-matrixo-green/10 rounded-full blur-[120px]" />
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
              <Layers className="w-4 h-4" />
              Our Portfolio
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Featured
              <span className="text-matrixo-green"> Projects</span>
            </h1>
            <p className="text-neutral-400 text-lg sm:text-xl max-w-2xl mx-auto">
              Explore our latest work across web development, AI integration, and
              digital innovation. Each project represents our commitment to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-matrixo-green text-black"
                    : "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-matrixo-purple/50 transition-all duration-500"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-matrixo-green/90 text-black text-xs font-bold">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Links */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.liveUrl}
                        className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                        aria-label="View live site"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                        aria-label="View source code"
                      >
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-matrixo-purple text-xs font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-matrixo-green transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 rounded-md bg-white/5 text-neutral-400 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
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
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-8">
              Let&apos;s collaborate and build something amazing together. We&apos;re always
              excited to take on new challenges.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-matrixo-green transition-colors duration-300"
            >
              START A PROJECT
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-20" />
    </main>
  );
}
