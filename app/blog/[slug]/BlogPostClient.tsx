"use client";
import { motion } from "framer-motion";
import { TopNav } from "@/components/ui/TopNav";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { BlogPost } from "@/lib/blog-data";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

interface Props {
  post: BlogPost;
  recentPosts: BlogPost[];
}

export default function BlogPostClient({ post, recentPosts }: Props) {
  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = post.title;

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      <TopNav />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-6 sm:pt-28 sm:pb-8 overflow-hidden">
        {/* Greenish/purple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-matrixo-purple/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-matrixo-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-matrixo-green/10 rounded-full blur-[120px]" />
        {/* Tiny smoke particles */}
        <div className="absolute inset-0 z-[1]">
          <ParticleBackground />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-matrixo-green transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category and Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-matrixo-purple/20 text-matrixo-purple text-sm font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-2 text-neutral-400 text-sm">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </span>
              <span className="flex items-center gap-2 text-neutral-400 text-sm">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 max-w-4xl">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <span>By</span>
              <span className="text-matrixo-green font-medium">FirstVoid Team</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="pb-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[21/9] rounded-2xl overflow-hidden"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-8"
            >
              <div
                className="blog-content text-neutral-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
              />
              <style jsx global>{`
                .blog-content {
                  color: #d4d4d4;
                }
                .blog-content h2 {
                  font-family: var(--font-syne);
                  font-size: 1.875rem;
                  font-weight: 700;
                  color: #ffffff;
                  margin-top: 3rem;
                  margin-bottom: 1.5rem;
                }
                .blog-content h3 {
                  font-family: var(--font-syne);
                  font-size: 1.25rem;
                  font-weight: 600;
                  color: #ffffff;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }
                .blog-content p {
                  color: #d4d4d4;
                  line-height: 1.75;
                  margin-bottom: 1.25rem;
                }
                .blog-content a {
                  color: #00ff41;
                  text-decoration: none;
                }
                .blog-content a:hover {
                  text-decoration: underline;
                }
                .blog-content strong {
                  color: #ffffff;
                  font-weight: 600;
                }
                .blog-content em {
                  color: #a3a3a3;
                }
                .blog-content blockquote {
                  border-left: 4px solid #00ff41;
                  background: rgba(255, 255, 255, 0.05);
                  border-radius: 0 0.75rem 0.75rem 0;
                  padding: 1rem 1.5rem;
                  margin: 1.5rem 0;
                }
                .blog-content blockquote p {
                  margin: 0;
                  color: #e5e5e5;
                }
                .blog-content code {
                  background: rgba(255, 255, 255, 0.1);
                  color: #00ff41;
                  padding: 0.125rem 0.5rem;
                  border-radius: 0.25rem;
                  font-size: 0.875rem;
                }
                .blog-content pre {
                  background: rgba(0, 0, 0, 0.5);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  border-radius: 0.75rem;
                  padding: 1.5rem;
                  overflow-x: auto;
                  margin: 1.5rem 0;
                }
                .blog-content pre code {
                  background: transparent;
                  padding: 0;
                  color: #e5e5e5;
                }
                .blog-content img {
                  border-radius: 0.75rem;
                  margin: 2rem 0;
                  width: 100%;
                }
                .blog-content ul, .blog-content ol {
                  color: #d4d4d4;
                  margin: 1rem 0;
                  padding-left: 1.5rem;
                }
                .blog-content li {
                  margin-bottom: 0.5rem;
                }
                .blog-content li::marker {
                  color: #00ff41;
                }
                .blog-content hr {
                  border-color: rgba(255, 255, 255, 0.1);
                  margin: 2rem 0;
                }
                .blog-content table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 1.5rem 0;
                }
                .blog-content th,
                .blog-content td {
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  padding: 0.75rem 1rem;
                  text-align: left;
                }
                .blog-content th {
                  background: rgba(255, 255, 255, 0.05);
                  color: #ffffff;
                  font-weight: 600;
                }
                .blog-content td {
                  color: #d4d4d4;
                }
              `}</style>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <h4 className="text-neutral-400 text-sm mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-white/5 text-neutral-300 text-sm hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Share2 className="w-5 h-5" />
                    <span>Share this article</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleShare("twitter")}
                      className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5 text-neutral-300" />
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-neutral-300" />
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5 text-neutral-300" />
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                      aria-label="Copy link"
                    >
                      <LinkIcon className="w-5 h-5 text-neutral-300" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                {/* About FirstVoid */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <h4 className="font-heading font-semibold text-white mb-3">
                    About FirstVoid
                  </h4>
                  <p className="text-neutral-400 text-sm mb-4">
                    We&apos;re a digital agency specializing in AI products, web development, and design systems. We share our knowledge and insights through this blog.
                  </p>
                  <Link
                    href="/about"
                    className="text-matrixo-green text-sm font-medium hover:underline"
                  >
                    Learn more about us →
                  </Link>
                </motion.div>

                {/* Recent Posts */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <h4 className="font-heading font-semibold text-white mb-6">
                    Recent Articles
                  </h4>
                  <div className="space-y-4">
                    {recentPosts.slice(0, 3).map((recentPost) => (
                      <Link
                        key={recentPost.id}
                        href={`/blog/${recentPost.slug}`}
                        className="group block"
                      >
                        <div className="flex gap-4">
                          <img
                            src={recentPost.coverImage}
                            alt={recentPost.title}
                            className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <h5 className="text-white text-sm font-medium line-clamp-2 group-hover:text-matrixo-green transition-colors">
                              {recentPost.title}
                            </h5>
                            <p className="text-neutral-400 text-xs mt-1">
                              {recentPost.readTime}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Newsletter */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-matrixo-purple/20 to-matrixo-green/10 border border-white/10"
                >
                  <h4 className="font-heading font-semibold text-white mb-2">
                    Newsletter
                  </h4>
                  <p className="text-neutral-400 text-sm mb-4">
                    Get the latest articles delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 text-white placeholder-neutral-500 focus:border-matrixo-green outline-none transition-all mb-3 text-sm"
                  />
                  <button className="w-full px-4 py-2.5 rounded-lg bg-matrixo-green text-black font-bold text-sm hover:bg-white transition-colors">
                    Subscribe
                  </button>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-20" />
    </main>
  );
}

// Simple markdown-like formatter
function formatContent(content: string): string {
  let html = content;

  // Convert markdown tables
  html = html.replace(/\|(.+)\|\n\|[-|]+\|\n((?:\|.+\|\n?)+)/g, (match, header, body) => {
    const headers = header.split('|').filter((h: string) => h.trim());
    const rows = body.trim().split('\n').map((row: string) =>
      row.split('|').filter((c: string) => c.trim())
    );

    let table = '<table><thead><tr>';
    headers.forEach((h: string) => {
      table += `<th>${h.trim()}</th>`;
    });
    table += '</tr></thead><tbody>';
    rows.forEach((row: string[]) => {
      table += '<tr>';
      row.forEach((cell: string) => {
        table += `<td>${cell.trim()}</td>`;
      });
      table += '</tr>';
    });
    table += '</tbody></table>';
    return table;
  });

  // Convert markdown images to HTML
  html = html.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    '<img src="$2" alt="$1" loading="lazy" />'
  );

  // Convert markdown links to HTML
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Convert headers
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");

  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Convert code blocks
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre><code class="language-$1">$2</code></pre>'
  );

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Convert blockquotes
  html = html.replace(/^> (.*$)/gm, "<blockquote><p>$1</p></blockquote>");

  // Convert horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Convert unordered lists
  html = html.replace(/^- (.*$)/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");

  // Convert ordered lists
  html = html.replace(/^\d+\. (.*$)/gm, "<li>$1</li>");

  // Convert paragraphs (lines that don't start with HTML tags)
  html = html
    .split("\n\n")
    .map((para) => {
      para = para.trim();
      if (
        !para ||
        para.startsWith("<") ||
        para.startsWith("#") ||
        para.startsWith("-") ||
        para.startsWith(">")
      ) {
        return para;
      }
      return `<p>${para}</p>`;
    })
    .join("\n\n");

  return html;
}
