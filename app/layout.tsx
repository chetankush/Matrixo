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
  title: "FirstVoid | Web Design, Development & AI Integration",
  description: "Full-stack agency specializing in web design, development, and AI integration. We build websites and apps that grow your business.",
  icons: {
    icon: "/icon.svg",
  },
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
      </head>
      <body
        className={`${outfit.variable} ${syne.variable} ${rajdhani.variable} font-sans antialiased bg-black selection:bg-matrixo-purple selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
