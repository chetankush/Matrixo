"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const experiences = [
  {
    title: "Brand\nIdentity",
    description: "Logos, colors, and visuals that make you memorable",
    image: "/experience-image.jpg",
  },
  {
    title: "Web\nApps",
    description: "Custom platforms that solve real business problems",
    image: "/exp2.webp",
  },
  {
    title: "E-commerce\nStores",
    description: "Online shops built to sell more products",
    image: "/immersive.webp",
  },
  {
    title: "AI\nSolutions",
    description: "Chatbots and automation that save you time",
    image: "/exp4.webp",
  },
];

export const Experiences = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Only start animation when section is visible
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Smooth auto-scroll animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !isVisible || isPaused) return;

    let animationId: number;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!container) return;

      container.scrollLeft += scrollSpeed;

      // Seamless loop - reset when halfway through duplicated content
      const maxScroll = container.scrollWidth / 2;
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isVisible, isPaused]);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative z-10 bg-neutral-950 py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 mb-10 sm:mb-14 lg:mb-16">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-6">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            What We Deliver
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-400 mt-2 max-w-md">
            Real results for businesses like yours.
          </p>
        </div>

        {/* Interaction hint */}
        <p className="text-neutral-500 text-xs mt-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v0"/>
            <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
            <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
          </svg>
          Scroll or drag • Hover to pause
        </p>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={scrollRef}
        className="flex gap-8 sm:gap-10 lg:gap-12 overflow-x-auto scrollbar-hide px-6 sm:px-8 md:px-12 lg:px-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
      >
        {/* First set */}
        {experiences.map((exp, idx) => (
          <ExperienceCard key={`a-${idx}`} exp={exp} priority={idx < 2} />
        ))}
        {/* Duplicate set for seamless loop */}
        {experiences.map((exp, idx) => (
          <ExperienceCard key={`b-${idx}`} exp={exp} priority={false} />
        ))}
      </div>
    </section>
  );
};

// Separate component for better performance
function ExperienceCard({
  exp,
  priority,
}: {
  exp: { title: string; description: string; image: string };
  priority: boolean;
}) {
  return (
    <div className="flex-shrink-0 w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] max-w-[400px] group">
      {/* Image */}
      <div className="relative aspect-[4/3] mb-4 sm:mb-5 overflow-hidden rounded-xl bg-neutral-900">
        <Image
          src={exp.image}
          alt={exp.title.replace("\n", " ")}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 35vw, 28vw"
          draggable={false}
        />
      </div>

      {/* Text */}
      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1.5 whitespace-pre-line leading-tight">
        {exp.title}
      </h3>
      <p className="font-sans text-sm text-neutral-400">
        {exp.description}
      </p>
    </div>
  );
}
