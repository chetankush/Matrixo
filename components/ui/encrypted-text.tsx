"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface EncryptedTextProps {
  text: string;
  interval?: number;
  revealDelayMs?: number;
  className?: string;
  encryptedClassName?: string;
  revealedClassName?: string;
}

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const EncryptedText = ({
  text,
  interval = 50,
  revealDelayMs = 50,
  className,
  encryptedClassName,
  revealedClassName,
}: EncryptedTextProps) => {
  // Initialize with actual text to avoid hydration mismatch
  const [outputText, setOutputText] = useState(text);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run animation after component is mounted (client-side)
    if (!isMounted) return;

    let timer: NodeJS.Timeout;
    let iteration = 0;

    const animate = () => {
      setOutputText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(timer);
      }

      iteration += 1 / 3; // Slower reveal for smoother effect
    };

    // Start with scrambled text immediately
    setOutputText(
      text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
    );

    timer = setInterval(animate, interval);

    return () => clearInterval(timer);
  }, [text, interval, isMounted]);

  // Split the text into revealed and encrypted parts for styling
  const renderText = () => {
    return outputText.split("").map((char, index) => {
      const isRevealed = char === text[index];
      return (
        <span
          key={index}
          className={cn(
            isRevealed ? revealedClassName : encryptedClassName
          )}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <span className={cn("inline-block", className)}>
      {renderText()}
    </span>
  );
};
