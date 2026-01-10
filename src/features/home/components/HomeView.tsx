"use client";

import { useMemo, useState, useEffect } from "react";
import { m } from "motion/react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { fadeInUp } from "@/lib/constants/animations";
import { Link } from "@/i18n/routing";

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

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % headerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [headerImages.length]);

  // Optimized typing animation using requestAnimationFrame for smooth, performant updates
  useEffect(() => {
    const heroTexts = [
      t("home.heroTitle"),
      t("home.heroAlt1") || "Adventure Awaits Beyond the Dunes",
      t("home.heroAlt2") || "Pack your bags — Morocco calls",
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let lastUpdate = 0;
    let pauseUntil = 0;
    let rafId: number;

    // Timing configuration (in ms)
    const TYPING_SPEED = 80;
    const DELETING_SPEED = 40;
    const PAUSE_AFTER_TYPING = 2000;
    const PAUSE_AFTER_DELETING = 300;

    function animate(timestamp: number) {
      // Handle pause states
      if (pauseUntil > 0) {
        if (timestamp < pauseUntil) {
          rafId = requestAnimationFrame(animate);
          return;
        }
        pauseUntil = 0;
      }

      const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;

      // Only update when enough time has passed
      if (timestamp - lastUpdate >= speed) {
        lastUpdate = timestamp;
        const current = heroTexts[textIndex] || "";

        if (!isDeleting) {
          // Typing
          charIndex = Math.min(current.length, charIndex + 1);
          setTyped(current.slice(0, charIndex));

          if (charIndex >= current.length) {
            // Pause at full text, then start deleting
            isDeleting = true;
            pauseUntil = timestamp + PAUSE_AFTER_TYPING;
          }
        } else {
          // Deleting
          charIndex = Math.max(0, charIndex - 1);
          setTyped(current.slice(0, charIndex));

          if (charIndex <= 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % heroTexts.length;
            pauseUntil = timestamp + PAUSE_AFTER_DELETING;
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    // Start animation
    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
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
      {/* Hero with background slider */}
      <header
        className="home-header relative isolate h-screen w-full overflow-hidden bg-slate-950 shadow-xl"
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
        <div className="relative z-20 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-24 text-center text-white sm:py-32">
          <div className="flex-1 space-y-4">
            <p className="text-sm tracking-[0.4em] text-orange-300 uppercase">
              {t("home.title")}
            </p>
            <h1
              id="hero-heading"
              className="text-4xl leading-tight font-semibold sm:text-5xl"
            >
              <span>{typed}</span>
              <span
                aria-hidden
                className="ml-2 inline-block h-6 w-px animate-pulse bg-white/90"
              />
            </h1>
            <p className="font-fancy text-lg text-white/80 sm:text-xl">
              {t("home.heroSubtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-8 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {t("home.exploreOurTours")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                {t("home.contactForMore")}
              </Link>
            </div>
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
              <p className="mt-3 text-base text-slate-600">
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
                  <p className="mt-2 text-sm text-slate-600">
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
