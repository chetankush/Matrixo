import type { Metadata } from "next";
import { Outfit, Syne, Rajdhani } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "FirstVoid - AI MVP Development Agency | Build Your AI Product Fast",
    template: "%s | FirstVoid",
  },
  description:
    "FirstVoid is a leading AI development agency specializing in AI MVPs, SaaS applications, and modern web development. We help startups build and launch AI-powered products using GPT-4, Claude, RAG, and cutting-edge tech stacks.",
  keywords: [
    "AI MVP development",
    "AI development agency",
    "build AI product",
    "AI startup agency",
    "GPT-4 development",
    "Claude AI integration",
    "RAG system development",
    "AI chatbot development",
    "SaaS development",
    "web development agency",
    "Next.js development",
    "React development",
    "LangChain development",
    "vector database",
    "AI agents development",
    "startup MVP agency",
    "full stack development",
    "AI integration services",
  ],
  authors: [{ name: "FirstVoid" }],
  creator: "FirstVoid",
  publisher: "FirstVoid",
  metadataBase: new URL("https://firstvoid.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://firstvoid.com",
    siteName: "FirstVoid",
    title: "FirstVoid - AI MVP Development Agency | Build Your AI Product Fast",
    description:
      "Leading AI development agency helping startups build and launch AI-powered products. Specializing in GPT-4, Claude, RAG systems, and modern tech stacks.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FirstVoid - AI MVP Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstVoid - AI MVP Development Agency",
    description:
      "Leading AI development agency helping startups build and launch AI-powered products.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://firstvoid.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// JSON-LD structured data for the website
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FirstVoid",
  url: "https://firstvoid.com",
  description: "AI MVP Development Agency helping startups build AI-powered products",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://firstvoid.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "FirstVoid",
  url: "https://firstvoid.com",
  logo: "https://firstvoid.com/icon.svg",
  description: "AI development agency specializing in MVPs, SaaS products, and AI-powered applications for startups",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "20.5937",
    longitude: "78.9629",
  },
  areaServed: "Worldwide",
  serviceType: [
    "AI MVP Development",
    "SaaS Application Development",
    "Web Development",
    "AI Integration",
    "UI/UX Design",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI MVP Development",
          description: "Build your AI-powered MVP in weeks",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SaaS Development",
          description: "Full-stack SaaS application development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Integration",
          description: "GPT-4, Claude, RAG integration services",
        },
      },
    ],
  },
  sameAs: [
    "https://twitter.com/firstvoid",
    "https://linkedin.com/company/firstvoid",
    "https://github.com/firstvoid",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for any external resources */}
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${syne.variable} ${rajdhani.variable} font-sans antialiased bg-black selection:bg-matrixo-purple selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
