"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "motion/react";
import { Link } from "@/i18n/routing";
import { useTranslation, useMediaQuery } from "@/lib/hooks";

export default function HomeHero() {
  const { t } = useTranslation();

  // Header background images (React Compiler handles memoization)
  const headerImages = [
    "/images/Header/header-1.webp",
    "/images/Header/header-2.webp",
    "/images/Header/header-3.webp",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Responsive check: typing animation only on desktop (>1023px)
  const isMobileOrTablet = useMediaQuery("(max-width: 1023px)");

  // Typing carousel: cycle through multiple hero texts, typing then deleting each
  const [typed, setTyped] = useState("");
  // Index for mobile/tablet "showing" animation
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const heroTexts = useMemo(
    () => [
      t("home.heroTitle"),
      t("home.heroAlt1") || "Adventure Awaits Beyond the Dunes",
      t("home.heroAlt2") || "Pack your bags — Morocco calls",
    ],
    [t]
  );

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % headerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [headerImages.length]);

  // Reference to the header to observe visibility
  const headerRef = useRef<HTMLElement>(null);

  // Optimized typing animation (Desktop only)
  useEffect(() => {
    if (isMobileOrTablet || !headerRef.current) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let lastUpdate = 0;
    let pauseUntil = 0;
    let rafId: number;
    let isVisible = false; // Tracks if the hero section is currently in viewport

    // Timing configuration (in ms)
    const TYPING_SPEED = 80;
    const DELETING_SPEED = 40;
    const PAUSE_AFTER_TYPING = 2000;
    const PAUSE_AFTER_DELETING = 300;

    function animate(timestamp: number) {
      if (!isVisible) {
        // Stop the loop completely if not visible
        return;
      }

      if (pauseUntil > 0) {
        if (timestamp < pauseUntil) {
          rafId = requestAnimationFrame(animate);
          return;
        }
        pauseUntil = 0;
      }

      const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;

      if (timestamp - lastUpdate >= speed) {
        lastUpdate = timestamp;
        const current = heroTexts[textIndex] || "";

        if (!isDeleting) {
          charIndex = Math.min(current.length, charIndex + 1);
          setTyped(current.slice(0, charIndex));

          if (charIndex >= current.length) {
            isDeleting = true;
            pauseUntil = timestamp + PAUSE_AFTER_TYPING;
          }
        } else {
          charIndex = Math.max(0, charIndex - 1);
          setTyped(current.slice(0, charIndex));

          if (charIndex <= 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % heroTexts.length;
            pauseUntil = timestamp + PAUSE_AFTER_DELETING;
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    // Use IntersectionObserver to start/stop the animation based on visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          // Restart animation if it came back into view
          lastUpdate = performance.now();
          rafId = requestAnimationFrame(animate);
        } else {
          // Cancel pending frame request if it scrolled out of view
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0 } // Trigger as soon as 1px is visible/hidden
    );

    observer.observe(headerRef.current);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [isMobileOrTablet, heroTexts, t]);

  // Simple rotation animation for Mobile/Tablet (Showing animation)
  useEffect(() => {
    if (!isMobileOrTablet) return;

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 4000); // 4 seconds per text for readability

    return () => clearInterval(interval);
  }, [isMobileOrTablet, heroTexts.length]);

  return (
    <header
      ref={headerRef}
      className="home-header relative isolate overflow-hidden bg-slate-950 text-white shadow-xl inline-full min-block-[40vh] sm:min-block-[45vh] lg:min-block-[50vh]"
      aria-labelledby="hero-heading"
    >
      {/* Background images with Motion Ken Burns + Crossfade animation */}
      <AnimatePresence mode="popLayout">
        <m.div
          key={headerImages[currentImageIndex]}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 8, ease: "easeOut" },
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={headerImages[currentImageIndex]}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={currentImageIndex === 0}
            quality={currentImageIndex === 0 ? 85 : 70}
          />
        </m.div>
      </AnimatePresence>
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/70"
        aria-hidden="true"
      ></div>
      <div className="relative z-20 mx-auto flex flex-col items-center justify-center gap-12 px-4 pbs-8 pbe-16 text-center inline-full max-inline-7xl lg:py-20">
        <div className="flex-1 space-y-6 pbs-0 text-center lg:pbs-8">
          <div className="flex items-center justify-center gap-4">
            <span className="bg-orange-400/60 block-px inline-8 sm:inline-12"></span>
            <h1 className="text-xs font-bold tracking-[0.2em] text-orange-300 uppercase text-shadow-lg sm:tracking-[0.3em]">
              {t("home.title")}
            </h1>
            <span className="bg-orange-400/60 block-px inline-8 sm:inline-12"></span>
          </div>
          <h2
            id="hero-heading"
            className="text-3xl leading-tight font-semibold text-shadow-2xl sm:text-4xl lg:text-5xl"
          >
            {isMobileOrTablet ? (
              <AnimatePresence mode="wait">
                <m.span
                  key={currentTextIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {heroTexts[currentTextIndex]}
                </m.span>
              </AnimatePresence>
            ) : (
              <>
                <span>{typed}</span>
                <span
                  aria-hidden
                  className="ms-2 inline-block animate-pulse bg-white/90 block-6 inline-px"
                />
              </>
            )}
          </h2>
          <p className="font-fancy text-lg text-slate-200 text-shadow lg:text-xl">
            {t("home.heroSubtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pbs-2">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 transition text-shadow-sm pointer-fine:hover:bg-white/10 sm:px-8"
            >
              {t("home.exploreOurTours")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition text-shadow-sm pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:bg-white/20 sm:px-8"
            >
              {t("home.contactForMore")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
