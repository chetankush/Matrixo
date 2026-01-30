"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export const MusicToggle = () => {
  const [isMuted, setIsMuted] = useState(false); // Default: NOT muted (music should play)
  const [isOnHero, setIsOnHero] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingBeforeHidden = useRef(false);
  const userMutedRef = useRef(false); // Track if user explicitly muted

  // Initialize audio
  useEffect(() => {
    const audio = new Audio("/space-sound.mp3");
    audio.loop = true;
    audio.volume = 0.01;
    audio.preload = "auto";
    audioRef.current = audio;

    // Attempt autoplay immediately
    const attemptAutoplay = async () => {
      try {
        await audio.play();
        // Autoplay succeeded - music is playing
        setHasInteracted(true);
      } catch {
        // Autoplay blocked by browser - wait for user interaction
        // But keep isMuted as false so music plays after interaction
      }
    };

    attemptAutoplay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Start audio on first user interaction (if autoplay was blocked)
  useEffect(() => {
    if (hasInteracted) return;

    const startAudioOnInteraction = async () => {
      setHasInteracted(true);

      // Only play if user hasn't explicitly muted
      if (audioRef.current && !userMutedRef.current) {
        try {
          await audioRef.current.play();
        } catch {
          // Still blocked - rare
        }
      }
    };

    document.addEventListener("click", startAudioOnInteraction, { once: true });
    document.addEventListener("touchstart", startAudioOnInteraction, { once: true });
    document.addEventListener("keydown", startAudioOnInteraction, { once: true });

    return () => {
      document.removeEventListener("click", startAudioOnInteraction);
      document.removeEventListener("touchstart", startAudioOnInteraction);
      document.removeEventListener("keydown", startAudioOnInteraction);
    };
  }, [hasInteracted]);

  // Handle tab visibility change - pause when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === "visible";
      setIsTabVisible(isVisible);

      if (!audioRef.current) return;

      if (!isVisible) {
        // Tab is being hidden - remember if we were playing
        wasPlayingBeforeHidden.current = !audioRef.current.paused;
        audioRef.current.pause();
      } else {
        // Tab is visible again - resume if we were playing before
        if (wasPlayingBeforeHidden.current && !isMuted && isOnHero) {
          audioRef.current.play().catch(() => {
            // Play failed
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMuted, isOnHero]);

  // Handle window blur/focus (for when user switches apps)
  useEffect(() => {
    const handleBlur = () => {
      if (audioRef.current) {
        wasPlayingBeforeHidden.current = !audioRef.current.paused;
        audioRef.current.pause();
      }
    };

    const handleFocus = () => {
      if (audioRef.current && wasPlayingBeforeHidden.current && !isMuted && isOnHero) {
        audioRef.current.play().catch(() => {
          // Play failed
        });
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isMuted, isOnHero]);

  // Observe hero section visibility
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

  // Handle play/pause based on all conditions
  useEffect(() => {
    if (!audioRef.current || !hasInteracted) return;

    audioRef.current.volume = 0.01;

    const shouldPlay = isOnHero && !isMuted && isTabVisible;

    if (shouldPlay) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked by browser
      });
    } else {
      audioRef.current.pause();
    }
  }, [isOnHero, isMuted, isTabVisible, hasInteracted]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    // Stop propagation to prevent document click handler from also firing
    e.stopPropagation();

    // If user hasn't interacted yet (autoplay was blocked), first click should START music
    if (!hasInteracted) {
      setHasInteracted(true);
      userMutedRef.current = false;
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Play failed
        });
      }
      return;
    }

    // Normal toggle behavior after first interaction
    setIsMuted((prev) => {
      const newMuted = !prev;
      userMutedRef.current = newMuted; // Track user's explicit choice
      return newMuted;
    });
  }, [hasInteracted]);

  // Only show on hero section
  if (!isOnHero) return null;

  return (
    <button
      onClick={toggleMute}
      className={cn(
        "fixed bottom-4 left-6 z-50 p-2 rounded-full transition-all duration-300",
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
