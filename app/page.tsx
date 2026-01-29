"use client";
import { TopNav } from "@/components/ui/TopNav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ContactForm } from "@/components/sections/ContactForm";
import { Experiences } from "@/components/sections/Experiences";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { ThreeBackground } from "@/components/ui/ThreeBackground";
import { Footer } from "@/components/ui/Footer";
import dynamic from "next/dynamic";

const Projects = dynamic(() => import("@/components/sections/Projects").then((mod) => mod.Projects), {
  loading: () => <p className="text-white text-center py-24">Loading Projects...</p>,
});

export default function Home() {
  return (
    <>
      {/* Global Three.js Background - handles its own fixed positioning */}
      <ThreeBackground />

      {/* Main content - pointer-events-none allows clicking through to Three.js background */}
      <main className="relative z-10 min-h-screen overflow-x-hidden pointer-events-none" style={{ background: 'transparent' }}>
        <div className="pointer-events-auto">
          <TopNav />
        </div>
        <Hero />
        {/* Below-the-fold sections use content-visibility for faster initial render */}
        <div className="content-visibility-auto pointer-events-auto">
          <Services />
        </div>
        <div className="content-visibility-auto pointer-events-auto">
          <Projects />
        </div>
        <div className="content-visibility-auto pointer-events-auto">
          <Experiences />
        </div>
        <div className="content-visibility-auto pointer-events-auto">
          <ContactForm />
        </div>
        <div className="pointer-events-auto">
          <Footer />
        </div>
        <div className="pointer-events-auto">
          <MusicToggle />
        </div>
      </main>
    </>
  );
}
