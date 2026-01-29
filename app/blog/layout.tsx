import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Development Blog - Tutorials, Guides & Tech Insights | FirstVoid",
  description:
    "Learn AI development with our in-depth tutorials on LLMs, RAG systems, AI agents, prompt engineering, Claude Code, and modern tech stacks. Expert guides for developers and founders.",
  keywords: [
    "AI development blog",
    "LLM tutorials",
    "RAG tutorial",
    "AI agents guide",
    "prompt engineering",
    "Claude Code tutorial",
    "GPT-4 development",
    "Claude AI tutorial",
    "MCP protocol",
    "AI tech stack 2026",
    "vector database tutorial",
    "LangChain guide",
    "AI for startups",
    "how to build AI apps",
    "AI development guide",
  ],
  openGraph: {
    title: "AI Development Blog - FirstVoid",
    description:
      "Learn AI development with tutorials on LLMs, RAG, AI agents, and prompt engineering. Expert guides for developers.",
    url: "https://firstvoid.com/blog",
    type: "website",
    images: [
      {
        url: "https://firstvoid.com/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "FirstVoid AI Development Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Development Blog - FirstVoid",
    description:
      "Learn AI development with tutorials on LLMs, RAG, AI agents, and prompt engineering.",
  },
  alternates: {
    canonical: "https://firstvoid.com/blog",
  },
};

// JSON-LD structured data for blog
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "FirstVoid AI Development Blog",
  description:
    "Tutorials, guides, and insights on AI development, LLMs, RAG systems, and modern tech stacks",
  url: "https://firstvoid.com/blog",
  publisher: {
    "@type": "Organization",
    name: "FirstVoid",
    logo: {
      "@type": "ImageObject",
      url: "https://firstvoid.com/icon.svg",
    },
  },
  blogPost: [
    {
      "@type": "BlogPosting",
      headline: "Modern AI Tech Stack in 2026: What to Use & Why",
      url: "https://firstvoid.com/blog/modern-ai-tech-stack-2026",
    },
    {
      "@type": "BlogPosting",
      headline: "MCP + RAG + Agents Explained Simply",
      url: "https://firstvoid.com/blog/mcp-rag-agents-explained",
    },
    {
      "@type": "BlogPosting",
      headline: "How to Use Claude Code: AI-Powered Terminal Coding",
      url: "https://firstvoid.com/blog/how-to-use-claude-code",
    },
    {
      "@type": "BlogPosting",
      headline: "How to Write Good Prompts: The Ultimate Guide",
      url: "https://firstvoid.com/blog/how-to-write-good-prompts",
    },
  ],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
