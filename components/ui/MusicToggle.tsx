"use client";
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export const MusicToggle = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/space-sound.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.01;

    // Attempt autoplay on mount
    audioRef.current.play().catch(() => {
      // Autoplay blocked by browser - set to muted state
      setIsMuted(true);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const heroSection = document.getElementById("home");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsOnHero(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    // Always ensure volume is set before playing
    audioRef.current.volume = 0.01;

    if (isOnHero && !isMuted) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked by browser
      });
    } else {
      audioRef.current.pause();
    }
  }, [isOnHero, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Only show on hero section
  if (!isOnHero) return null;

  return (
    <button
      onClick={toggleMute}
      className={cn(
        "fixed bottom-4 right-4 z-50 p-2 rounded-full transition-all duration-300",
        "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20",
        "text-white hover:scale-105"
      )}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
    </button>
  );
};
