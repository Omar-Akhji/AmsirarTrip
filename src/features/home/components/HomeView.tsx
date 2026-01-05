"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { m, LazyMotion, domAnimation } from "motion/react";
import { useTranslation } from "@/lib/hooks/useTranslation";

// Extracted components
import FeaturedTours from "./FeaturedTours";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import VideoSection from "./VideoSection";

export default function HomeView() {
  const { t } = useTranslation();

  // Header background images
  const headerImages = useMemo(
    () => [
      "/images/Header/header-1.webp",
      "/images/Header/header-2.webp",
      "/images/Header/header-3.webp",
    ],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Typing carousel: cycle through multiple hero texts, typing then deleting each
  const [typed, setTyped] = useState("");
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % headerImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [headerImages.length]);

  // Typing animation effect - resets to beginning each time component mounts
  useEffect(() => {
    // Reset all refs to initial state
    idxRef.current = 0;
    charRef.current = 0;
    deletingRef.current = false;
    setTyped("");

    const heroTexts = [
      t("home.heroTitle"),
      t("home.heroAlt1") || "Adventure Awaits Beyond the Dunes",
      t("home.heroAlt2") || "Pack your bags — Morocco calls",
    ];

    // Start typing from the beginning
    function step() {
      const current = heroTexts[idxRef.current] || "";

      if (!deletingRef.current) {
        // typing
        charRef.current = Math.min(current.length, charRef.current + 1);
        setTyped(current.slice(0, charRef.current));

        if (charRef.current >= current.length) {
          // pause at full text then start deleting
          timerRef.current = setTimeout(() => {
            deletingRef.current = true;
            step();
          }, 2000);
          return;
        }
        timerRef.current = setTimeout(step, 80);
      } else {
        // deleting
        charRef.current = Math.max(0, charRef.current - 1);
        setTyped(current.slice(0, charRef.current));

        if (charRef.current <= 0) {
          // move to next text
          deletingRef.current = false;
          idxRef.current = (idxRef.current + 1) % heroTexts.length;
          timerRef.current = setTimeout(step, 300);
          return;
        }
        timerRef.current = setTimeout(step, 40);
      }
    }

    // Start the animation after a brief delay
    timerRef.current = setTimeout(step, 100);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statHighlights = useMemo(
    () => [
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
    ],
    [t]
  );

  return (
    <>
      <LazyMotion features={domAnimation}>
        {/* Hero with background slider */}
        <header
          className="home-header relative isolate w-full overflow-hidden bg-slate-950 shadow-xl"
          aria-labelledby="hero-heading"
        >
          {/* Background images with CSS crossfade animation */}
          {headerImages.map((image, index) => (
            <div
              key={image}
              className={`home-header-bg ${
                index === currentImageIndex ? "active" : ""
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div
            className="absolute inset-0 z-10 bg-linear-to-br from-slate-900/80 via-slate-900/60 to-slate-900 opacity-80"
            aria-hidden="true"
          ></div>
          <div
            className="absolute inset-0 z-10 bg-linear-to-br from-black/60 via-black/20 to-transparent"
            aria-hidden="true"
          ></div>
          <div className="relative z-20 mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 text-center text-white sm:py-32 lg:flex-row lg:text-left">
            <div className="flex-1 space-y-6">
              <p className="text-sm tracking-[0.4em] text-orange-300 uppercase">
                {t("home.title")}
              </p>
              <h1
                id="hero-heading"
                className="min-h-[3.3em] text-4xl leading-tight font-semibold sm:text-5xl"
              >
                <span>{typed}</span>
                <span
                  aria-hidden
                  className="ml-2 inline-block h-6 w-px animate-pulse bg-white/90"
                />
              </h1>
              <p className="text-lg text-white/80 sm:text-xl">
                {t("home.heroSubtitle")}
              </p>
            </div>
            <div className="flex-1">
              <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold tracking-[0.4em] text-orange-200 uppercase">
                  {t("excursion.detailsSubtitle")}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {statHighlights.map((stat, idx) => (
                    <m.div
                      key={stat.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-left shadow-sm"
                    >
                      <p className="text-3xl font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs tracking-[0.3em] text-orange-200 uppercase">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-sm text-white/80">
                        {stat.description}
                      </p>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main>
          <FeaturedTours />
          <ServicesSection />
          <TestimonialsSection />
          <VideoSection />
        </main>
      </LazyMotion>
    </>
  );
}
