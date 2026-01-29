"use client";
import { useEffect, useRef } from "react";

export const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setSize();

    // Generate stars
    const stars: { x: number; y: number; size: number; opacity: number; twinkleSpeed: number }[] = [];
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      });

      // Draw a few colored stars (green and purple accents)
      ctx.beginPath();
      ctx.arc(canvas.offsetWidth * 0.2, canvas.offsetHeight * 0.3, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 65, ${0.4 + Math.sin(time * 0.02) * 0.2})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(canvas.offsetWidth * 0.8, canvas.offsetHeight * 0.6, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(125, 0, 255, ${0.4 + Math.sin(time * 0.025) * 0.2})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(canvas.offsetWidth * 0.6, canvas.offsetHeight * 0.2, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 65, ${0.3 + Math.sin(time * 0.018) * 0.2})`;
      ctx.fill();

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setSize();
      // Regenerate star positions
      stars.forEach((star) => {
        star.x = Math.random() * canvas.offsetWidth;
        star.y = Math.random() * canvas.offsetHeight;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(to bottom, #030303 0%, #0a0a0a 100%)" }}
    />
  );
};
