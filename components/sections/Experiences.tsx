"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";

const experiences = [
  {
    title: "Brand\nIdentity",
    description: "Crafting timeless visual systems",
    image: "/experience-image.jpg",
  },
  {
    title: "Digital\nProducts",
    description: "Designing intelligent interfaces",
    image: "/exp2.webp",
  },
  {
    title: "Immersive\nExperiences",
    description: "Building next-gen interactions",
    image: "/immersive.webp",
  },
  {
    title: "Strategic\nConsulting",
    description: "Architecting digital futures",
    image: "/exp4.webp",
  },
];

// Duplicate items for seamless infinite scroll
const duplicatedExperiences = [...experiences, ...experiences, ...experiences];

export const Experiences = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.5;
    let animationId: number;

    // Set initial scroll position to the middle set
    const singleSetWidth = scrollContainer.scrollWidth / 3;
    scrollContainer.scrollLeft = singleSetWidth;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // When we've scrolled past the second set, jump back to the first set
        const singleSetWidth = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
          scrollContainer.scrollLeft = singleSetWidth;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="experiences"
      className="relative z-10 bg-neutral-950 py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 mb-10 sm:mb-14 lg:mb-16">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-6">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Experiences
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-400 mt-2 max-w-md">
            A small taste of the experiences we&apos;ve mastered.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Scroll Gallery */}
      <div
        ref={scrollRef}
        className="flex gap-8 sm:gap-10 lg:gap-12 overflow-x-hidden"
      >
        {duplicatedExperiences.map((exp, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] max-w-[400px] group"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] mb-4 sm:mb-5 overflow-hidden rounded-xl">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
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
        ))}
      </div>
    </section>
  );
};
