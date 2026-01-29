import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews - FirstVoid AI Development Agency",
  description:
    "Read real testimonials from startup founders who built their AI MVPs with FirstVoid. See how we helped companies launch AI products in weeks, not months.",
  keywords: [
    "FirstVoid reviews",
    "AI development testimonials",
    "startup MVP reviews",
    "AI agency testimonials",
    "client success stories",
    "AI product development reviews",
    "SaaS development feedback",
    "tech agency reviews",
    "founder testimonials",
    "MVP development success",
  ],
  openGraph: {
    title: "Client Testimonials - FirstVoid AI Development",
    description:
      "Real testimonials from founders who built their AI MVPs with FirstVoid. See our client success stories.",
    url: "https://firstvoid.com/testimonials",
    type: "website",
    images: [
      {
        url: "https://firstvoid.com/og-testimonials.jpg",
        width: 1200,
        height: 630,
        alt: "FirstVoid Client Testimonials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials - FirstVoid",
    description:
      "Real testimonials from founders who built their AI MVPs with FirstVoid.",
  },
  alternates: {
    canonical: "https://firstvoid.com/testimonials",
  },
};

// JSON-LD structured data for reviews
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirstVoid",
  url: "https://firstvoid.com",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "50",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Ryan Peters",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      reviewBody:
        "They built our AI MVP in just 3 weeks. We went from idea to paying customers faster than I ever imagined.",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Amanda Liu",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      reviewBody:
        "FirstVoid understood our vision for an AI-powered product. The result exceeded every expectation we had.",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Marcus Chen",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      reviewBody:
        "As a first-time founder, I needed a team that could move fast. FirstVoid was the perfect partner for our AI startup.",
    },
  ],
};

export default function TestimonialsLayout({
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
