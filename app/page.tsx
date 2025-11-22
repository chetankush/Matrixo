"use client";
import React from "react";
import { TopNav } from "@/components/ui/TopNav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ContactForm } from "@/components/sections/ContactForm";
import { Experiences } from "@/components/sections/Experiences";
import dynamic from "next/dynamic";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

const Projects = dynamic(() => import("@/components/sections/Projects").then((mod) => mod.Projects), {
  loading: () => <p>Loading Projects...</p>,
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
