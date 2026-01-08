"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";

const experiences = [
  {
    title: "Brand\nIdentity",
    description: "Crafting timeless visual systems",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    title: "Digital\nProducts",
    description: "Designing intelligent interfaces",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
  },
  {
    title: "Immersive\nExperiences",
    description: "Building next-gen interactions",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
  },
  {
    title: "Strategic\nConsulting",
    description: "Architecting digital futures",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
];

// Duplicate items for seamless infinite scroll
const duplicatedExperiences = [...experiences, ...experiences, ...experiences];

export const Experiences = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.5;
    let animationId: number;

    // Set initial scroll position to the middle set
    const singleSetWidth = scrollContainer.scrollWidth / 3;
    scrollContainer.scrollLeft = singleSetWidth;

    const autoScroll = () => {
      if (!isPausedRef.current && scrollContainer) {
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

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <section
      id="experiences"
      className="relative z-10 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 mb-10 sm:mb-14 lg:mb-16">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
            Experiences
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-500 mt-2 max-w-md">
            A small taste of the experiences we&apos;ve mastered.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Scroll Gallery */}
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
        className="flex gap-5 sm:gap-6 overflow-x-hidden"
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
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-900 mb-1.5 whitespace-pre-line leading-tight">
              {exp.title}
            </h3>
            <p className="font-sans text-sm text-neutral-500">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
