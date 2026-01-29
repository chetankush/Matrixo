import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FirstVoid - AI Development Agency & Expert Tech Team India",
  description:
    "Meet FirstVoid, a leading AI development agency in India. Our expert team of developers, designers, and AI engineers build innovative MVPs, SaaS products, and AI-powered applications for startups worldwide.",
  keywords: [
    "about FirstVoid",
    "AI development agency India",
    "web development company",
    "AI MVP development",
    "software development team",
    "tech startup agency",
    "AI engineers India",
    "digital agency",
    "SaaS development company",
    "Chetan Kushwah",
    "FirstVoid team",
    "AI product development",
  ],
  openGraph: {
    title: "About FirstVoid - AI Development Agency India",
    description:
      "Meet the team behind FirstVoid. Expert developers, designers, and AI engineers building innovative digital solutions for startups and enterprises.",
    url: "https://firstvoid.com/about",
    type: "website",
    images: [
      {
        url: "https://firstvoid.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "FirstVoid Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About FirstVoid - AI Development Agency",
    description:
      "Meet the team behind FirstVoid. Expert developers, designers, and AI engineers building innovative solutions.",
  },
  alternates: {
    canonical: "https://firstvoid.com/about",
  },
};

// JSON-LD structured data for organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirstVoid",
  url: "https://firstvoid.com",
  logo: "https://firstvoid.com/icon.svg",
  description:
    "AI development agency specializing in MVPs, SaaS products, and AI-powered applications",
  foundingDate: "2019",
  founders: [
    {
      "@type": "Person",
      name: "Chetan Kushwah",
      jobTitle: "Founder & CEO",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://twitter.com/firstvoid",
    "https://linkedin.com/company/firstvoid",
    "https://github.com/firstvoid",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://firstvoid.com/#contact",
  },
};

export default function AboutLayout({
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
