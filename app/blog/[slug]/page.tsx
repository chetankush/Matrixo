import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getRecentPosts, blogPosts } from "@/lib/blog-data";
import BlogPostClient from "./BlogPostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = "https://firstvoid.com";

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords || post.tags,
    authors: [{ name: "FirstVoid" }],
    openGraph: {
      type: "article",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: "FirstVoid",
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      authors: ["FirstVoid"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.coverImage,
    author: {
      "@type": "Organization",
      name: "FirstVoid",
      url: "https://firstvoid.com",
    },
    publisher: {
      "@type": "Organization",
      name: "FirstVoid",
      logo: {
        "@type": "ImageObject",
        url: "https://firstvoid.com/icon.svg",
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://firstvoid.com/blog/${post.slug}`,
    },
    keywords: post.keywords?.join(", ") || post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} recentPosts={recentPosts} />
    </>
  );
}
