"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { TopNav } from "@/components/ui/TopNav";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { blogPosts, getAllCategories } from "@/lib/blog-data";
import { Calendar, Clock, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/ui/Footer";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...getAllCategories()];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-neutral-950 overflow-x-hidden">
      <TopNav />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-6 sm:pt-28 sm:pb-8 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-matrixo-purple/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-matrixo-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-matrixo-green/10 rounded-full blur-[120px]" />
        {/* Tiny smoke particles */}
        <div className="absolute inset-0 z-[1]">
          <ParticleBackground />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              Blog & <span className="text-matrixo-green">Insights</span>
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg">
              Latest articles on AI, web development, and technology trends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-4 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:border-matrixo-green outline-none transition-all text-sm"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
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
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-400 text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block h-full"
                    >
                      <div className="h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-matrixo-green/50 transition-all duration-300">
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-matrixo-purple/80 text-white text-xs font-medium">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3 text-sm text-neutral-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(post.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {post.readTime}
                            </span>
                          </div>

                          <h3 className="font-heading text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-matrixo-green transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Author */}
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-neutral-400 text-xs">
                              By FirstVoid
                            </span>
                            <span className="text-matrixo-green text-xs font-medium">
                              Read more →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
