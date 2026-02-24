"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "motion/react";
import { useTranslation, useMediaQuery } from "@/lib/hooks";
import { fadeInUp } from "@/lib/constants/animations";
import { Link } from "@/i18n/routing";

// Dynamically imported below-the-fold components for reduced initial JS bundle
import dynamic from "next/dynamic";

const FeaturedTours = dynamic(() => import("./FeaturedTours"), {
  loading: () => (
    <section className="min-h-250 w-full animate-pulse bg-gray-100 lg:min-h-175" />
  ),
});
const ServicesSection = dynamic(() => import("./ServicesSection"), {
  loading: () => (
    <section className="min-h-300 w-full animate-pulse bg-slate-800 lg:min-h-150" />
  ),
});
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
  loading: () => (
    <section className="min-h-200 w-full animate-pulse bg-gray-50 lg:min-h-125" />
  ),
});
const VideoSection = dynamic(() => import("./VideoSection"), {
  loading: () => (
    <section className="min-h-250 w-full animate-pulse bg-slate-900 lg:min-h-150" />
  ),
});

export default function HomeView() {
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

  // React Compiler handles memoization automatically
  const statHighlights = [
    {
      id: "experience",
      value: "20+",
      label: t("about.experienceTitle"),
      description: t(
        "home.stats.experience",
        "Years perfecting Sahara crossings and Atlas escapades."
      ),
    },
    {
      id: "routes",
      value: "35+",
      label: t("excursion.stats.routes", "Signature excursions"),
      description: t(
        "home.stats.routes",
        "Handpicked story-driven routes from dunes to oceans."
      ),
    },
    {
      id: "care",
      value: "24/7",
      label: t("excursion.stats.support", "On-trip support"),
      description: t(
        "home.stats.care",
        "Dedicated coordinators for every mile of your journey."
      ),
    },
  ];

  return (
    <>
      {/* Hero with background slider */}
      <header
        ref={headerRef}
        className="home-header relative isolate min-h-dvh w-full overflow-hidden bg-slate-950 shadow-xl"
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
          className="absolute inset-0 z-10 bg-linear-to-br from-slate-900/80 via-slate-900/60 to-slate-900 opacity-80"
          aria-hidden="true"
        ></div>
        <div
          className="absolute inset-0 z-10 bg-linear-to-br from-black/60 via-black/20 to-transparent"
          aria-hidden="true"
        ></div>
        <div className="relative z-20 mx-auto flex h-full min-h-dvh max-w-6xl flex-col items-center justify-center gap-2 px-4 pt-4 pb-4 text-center text-white sm:pt-24 sm:pb-32 lg:py-32">
          <div className="mb-2 flex items-center justify-center gap-4">
            <span className="h-px w-8 sm:w-12 bg-orange-400/60"></span>
            <h1 className="text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-orange-300 uppercase">
              {t("home.title")}
            </h1>
            <span className="h-px w-8 sm:w-12 bg-orange-400/60"></span>
          </div>
          <h2
            id="hero-heading"
            className="min-h-[3em] text-3xl leading-tight font-semibold sm:min-h-[2.2em] sm:text-4xl lg:text-5xl"
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
                  className="ml-2 inline-block h-6 w-px animate-pulse bg-white/90"
                />
              </>
            )}
          </h2>
          <p className="font-fancy text-lg text-white/80 sm:text-xl">
            {t("home.heroSubtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 sm:px-8 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              {t("home.exploreOurTours")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 sm:px-8 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              {t("home.contactForMore")}
            </Link>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="text-slate-900">
        {/* Stats Section - Below Hero (like tours/excursions pages) */}
        <section className="py-12" aria-labelledby="home-highlights">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase">
                {t("about.smTitle")}
              </p>
              <h2
                id="home-highlights"
                className="mt-4 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl"
              >
                {t("about.experienceTitle")}
              </h2>
              <p className="mt-3 text-base text-taupe-600">
                {t("tours.detailsSubtitle")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {statHighlights.map((stat, idx) => (
                <m.article
                  key={stat.id}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-3xl border border-orange-100 bg-white px-6 py-6 shadow-lg shadow-orange-100/70"
                >
                  <p className="text-4xl font-bold text-orange-600">
                    {stat.value}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">
                    {stat.label}
                  </h3>
                  <p className="mt-2 text-sm text-taupe-600">
                    {stat.description}
                  </p>
                </m.article>
              ))}
            </div>
          </div>
        </section>

        <FeaturedTours />
        <ServicesSection />
        <TestimonialsSection />
        <VideoSection />
      </main>
    </>
  );
}
