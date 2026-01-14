"use client";
import { useRef, useState, useEffect, useCallback } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);

  // Use refs for drag state to avoid stale closures
  const dragState = useRef({
    startX: 0,
    scrollLeft: 0,
  });

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

  // Auto-scroll animation (pauses on hover or drag)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !isVisible || isHovered || isDragging) return;

    let animationId: number;
    const scrollSpeed = 0.5;

    const animate = () => {
      container.scrollLeft += scrollSpeed;

      // Reset to beginning for seamless loop
      const maxScroll = container.scrollWidth / 2;
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isVisible, isHovered, isDragging]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    e.preventDefault();
    setIsDragging(true);
    dragState.current.startX = e.pageX - container.offsetLeft;
    dragState.current.scrollLeft = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = scrollRef.current;
    if (!container) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragState.current.startX) * 2;
    container.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    setIsDragging(true);
    dragState.current.startX = e.touches[0].pageX - container.offsetLeft;
    dragState.current.scrollLeft = container.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const container = scrollRef.current;
    if (!container) return;

    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - dragState.current.startX) * 2;
    container.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Zoom with mouse wheel (when holding Ctrl/Cmd)
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.min(Math.max(prev + delta, 0.8), 1.5));
    }
  };

  // Zoom controls
  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 1.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.8));
  const resetZoom = () => setScale(1);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative z-10 bg-neutral-950 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 mb-10 sm:mb-14 lg:mb-16">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-6 flex justify-between items-end">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              What We Deliver
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-400 mt-2 max-w-md">
              Real results for businesses like yours.
            </p>
          </div>

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors"
              aria-label="Zoom out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
                <path d="M8 11h6"/>
              </svg>
            </button>
            <button
              onClick={resetZoom}
              className="px-3 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={zoomIn}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors"
              aria-label="Zoom in"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
                <path d="M11 8v6"/>
                <path d="M8 11h6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Interaction hint */}
        <p className="text-neutral-500 text-xs mt-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v0"/>
            <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
            <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
          </svg>
          Drag to scroll • Hover to pause • Ctrl+Scroll to zoom
        </p>
      </div>

      {/* Interactive Horizontal Scroll Gallery */}
      <div
        ref={scrollRef}
        className={`
          flex gap-8 sm:gap-10 lg:gap-12 overflow-x-auto scrollbar-hide px-6 sm:px-8 md:px-12 lg:px-16 select-none
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        `}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          transition: isDragging ? "none" : "transform 0.2s ease-out",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {/* First set */}
        {experiences.map((exp, idx) => (
          <ExperienceCard key={`a-${idx}`} exp={exp} priority={idx < 2} isDragging={isDragging} />
        ))}
        {/* Duplicate set for seamless loop */}
        {experiences.map((exp, idx) => (
          <ExperienceCard key={`b-${idx}`} exp={exp} priority={false} isDragging={isDragging} />
        ))}
      </div>
    </section>
  );
};

// Separate component for better performance
function ExperienceCard({
  exp,
  priority,
  isDragging
}: {
  exp: { title: string; description: string; image: string };
  priority: boolean;
  isDragging: boolean;
}) {
  return (
    <div
      className="flex-shrink-0 w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] max-w-[400px] group"
      style={{ pointerEvents: isDragging ? "none" : "auto" }}
    >
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
