"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { twMerge } from "tailwind-merge";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "zoom-in" | "fade-left" | "fade-right";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * High-performance scroll animation wrapper using GSAP ScrollTrigger.
 * Optimized for Core Web Vitals and SEO.
 *
 * @param animation - The type of animation to apply.
 * @param delay - Delay in seconds (GSAP uses seconds by default, but we convert from ms for compatibility).
 * @param duration - Animation duration in seconds.
 * @param threshold - The percentage of the element that must be visible to trigger (0-1).
 * @param once - Whether to trigger the animation only once.
 */
export function AnimateOnScroll({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  threshold = 0.15,
  once = true,
}: AnimateOnScrollProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const vars: gsap.TweenVars = {
        duration,
        delay: delay / 1000, // Convert ms to seconds
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: `top+=${threshold * 100}% bottom`,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
          // markers: process.env.NODE_ENV === "development", // Uncomment for debugging
        },
      };

      // Define initial states and animation targets
      switch (animation) {
        case "fade-up":
          gsap.from(container.current, { ...vars, y: 30, autoAlpha: 0 });
          break;
        case "fade-in":
          gsap.from(container.current, { ...vars, autoAlpha: 0 });
          break;
        case "zoom-in":
          gsap.from(container.current, { ...vars, scale: 0.95, autoAlpha: 0 });
          break;
        case "fade-left":
          gsap.from(container.current, { ...vars, x: 30, autoAlpha: 0 });
          break;
        case "fade-right":
          gsap.from(container.current, { ...vars, x: -30, autoAlpha: 0 });
          break;
      }
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className={twMerge("will-change-[transform,opacity]", className)}
    >
      {children}
    </div>
  );
}
