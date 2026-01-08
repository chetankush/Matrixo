"use client";
import { TopNav } from "@/components/ui/TopNav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ContactForm } from "@/components/sections/ContactForm";
import { Experiences } from "@/components/sections/Experiences";
import dynamic from "next/dynamic";

const Projects = dynamic(() => import("@/components/sections/Projects").then((mod) => mod.Projects), {
  loading: () => <p className="text-white text-center py-24">Loading Projects...</p>,
});

export default function Home() {
  return (
    <main className="bg-matrixo-dark min-h-screen overflow-x-hidden">
      <TopNav />
      <Hero />
      <Services />
      <Projects />
      <Experiences />
      <ContactForm />
    </main>
  );
}
