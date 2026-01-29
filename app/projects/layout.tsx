import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI MVP & SaaS Projects Portfolio - FirstVoid Development Agency",
  description:
    "Explore FirstVoid's portfolio of AI MVPs, SaaS applications, and UI/UX projects. See real examples of GPT-4, Claude AI, RAG systems, and modern web applications we've built for startups.",
  keywords: [
    "AI MVP portfolio",
    "SaaS development projects",
    "AI projects examples",
    "GPT-4 applications",
    "Claude AI projects",
    "RAG system development",
    "web app portfolio",
    "startup MVP examples",
    "AI chatbot development",
    "LangChain projects",
    "vector database applications",
    "Next.js projects",
    "React development portfolio",
    "UI/UX case studies",
  ],
  openGraph: {
    title: "AI MVP & SaaS Projects Portfolio - FirstVoid",
    description:
      "Explore our portfolio of AI-powered applications, SaaS products, and web development projects. See how we help startups build and launch.",
    url: "https://firstvoid.com/projects",
    type: "website",
    images: [
      {
        url: "https://firstvoid.com/og-projects.jpg",
        width: 1200,
        height: 630,
        alt: "FirstVoid Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI MVP & SaaS Projects Portfolio - FirstVoid",
    description:
      "Explore our portfolio of AI-powered applications and SaaS products.",
  },
  alternates: {
    canonical: "https://firstvoid.com/projects",
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "FirstVoid Projects Portfolio",
  description:
    "Portfolio of AI MVPs, SaaS applications, and web development projects",
  url: "https://firstvoid.com/projects",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AI MVP Development",
        description: "GPT-4 and Claude AI powered applications",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "SaaS Applications",
        description: "Full-stack SaaS product development",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "UI/UX Design",
        description: "User interface and experience design",
      },
    ],
  },
};

export default function ProjectsLayout({
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
