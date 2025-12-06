"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/hooks/useTranslation";

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
      {/* Hero with background slider */}
      <header
        className="home-header relative isolate overflow-hidden bg-slate-950"
        aria-labelledby="hero-heading"
      >
        {/* Background images */}
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
              className="text-4xl leading-tight font-semibold sm:text-5xl"
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
                  <motion.div
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Inlined home sections (document order: header then sections) */}
      <FeaturedTours />
      <ServicesSection />
      <TestimonialsSection />
      <VideoSection />
    </>
  );
}

/* Inline: FeaturedTours */
const FeaturedTours = () => {
  const { t } = useTranslation();
  const cities = [
    {
      key: "marrakech",
      image: "/images/Home/Marrakech-tourist.webp",
      titleKey: "featured.cards.marrakech.title",
      descriptionKey: "featured.marrakech.description",
      altKey: "featured.cards.marrakech.alt",
    },
    {
      key: "casablanca",
      image: "/images/Home/Casablanca-tourist.webp",
      titleKey: "featured.cards.casablanca.title",
      descriptionKey: "featured.casablanca.description",
      altKey: "featured.cards.casablanca.alt",
    },
    {
      key: "fez",
      image: "/images/Home/Fez-tourist.webp",
      titleKey: "featured.cards.fez.title",
      descriptionKey: "featured.fez.description",
      altKey: "featured.cards.fez.alt",
    },
    {
      key: "dadesValley",
      image: "/images/Home/valley-tourisit.webp",
      titleKey: "featured.cards.dadesValley.title",
      descriptionKey: "featured.dadesValley.description",
      altKey: "featured.cards.dadesValley.alt",
    },
    {
      key: "chefchaouen",
      image: "/images/Home/Chefchaouen-tourist.webp",
      titleKey: "featured.cards.chefchaouen.title",
      descriptionKey: "featured.chefchaouen.description",
      altKey: "featured.cards.chefchaouen.alt",
    },
    {
      key: "rabat",
      image: "/images/Home/Rabat-tourist.webp",
      titleKey: "featured.cards.rabat.title",
      descriptionKey: "featured.rabat.description",
      altKey: "featured.cards.rabat.alt",
    },
  ];

  return (
    <section
      id="featured"
      className="relative isolate overflow-hidden bg-gray-50 py-24 text-gray-900"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.3),transparent_70%)]"
        aria-hidden="true"
      ></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-orange-400 bg-orange-500/10 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-orange-600 uppercase">
            {t("featured.smTitle")}
          </p>
          <h2 className="mt-6 text-3xl leading-tight font-extrabold tracking-[0.2em] text-gray-900 uppercase md:text-4xl">
            {t("featured.lgTitle")}
          </h2>
        </div>

        <div className="featured-row">
          {cities.map((city, idx) => (
            <motion.article
              key={city.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-article relative h-[300px] w-full overflow-hidden rounded-xl"
            >
              <Image
                src={city.image}
                alt={t(city.altKey)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1090px) 50vw, 33vw"
                className="card-img object-cover"
              />
              <div className="card-data">
                <h3 className="card-title">{t(city.titleKey)}</h3>
                <p className="card-text">{t(city.descriptionKey)}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* Inline: ServicesSection */
const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      key: "handcrafted",
      icon: "/icons/globus-icon.svg",
      altKey: "services.cards.handcrafted.alt",
    },
    {
      key: "guide",
      icon: "/icons/map-icon.svg",
      altKey: "services.cards.guide.alt",
    },
    {
      key: "price",
      icon: "/icons/dollar-icon.svg",
      altKey: "services.cards.price.alt",
    },
  ];

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden py-20 text-orange-200 sm:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="inline-flex items-center justify-center rounded-full border border-orange-100 px-5 py-2 text-sm font-semibold tracking-[0.45em] uppercase">
              {t("services.smTitle")}
            </p>
            <h2
              id="services-heading"
              className="mt-4 text-3xl leading-tight font-bold tracking-[0.2em] text-white uppercase md:text-4xl"
            >
              {t("services.lgTitle")}
            </h2>
            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full bg-orange-200"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-12 grid justify-items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.article
              key={service.key}
              initial={{ opacity: 0, y: 80, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10 hover:shadow-md ${
                idx === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="mr-auto inline-flex h-25 w-25 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <div className="mb-4 flex items-center gap-4 self-start">
                    <div className="mr-auto inline-flex size-25 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                      <Image
                        src={service.icon}
                        alt={t(service.altKey)}
                        width={60}
                        height={60}
                        className="size-15"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white">
                {t(`services.cards.${service.key}.title`)}
              </h3>
              <p className="mt-3 text-sm text-white">
                {t(`services.cards.${service.key}.text`)}
              </p>
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition group-hover:border-orange-200/60"
                aria-hidden
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* Inline: TestimonialsSection */
const TestimonialsSection = () => {
  const { t } = useTranslation();
  const testimonials = [{ key: "kevin" }, { key: "ben" }, { key: "sara" }];

  return (
    <section id="testimonials" className="bg-slate-50 py-12">
      <div className="container">
        <div className="title-wrap mb-8 text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-orange-400 bg-orange-500/10 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-orange-600 uppercase">
            {t("testimonials.smTitle")}
          </p>
          <h2 className="mt-6 text-3xl leading-tight font-extrabold tracking-[0.2em] text-gray-900 uppercase md:text-4xl">
            {t("testimonials.lgTitle")}
          </h2>
        </div>
        <div className="relative">
          <div>
            <div className="relative">
              {/* mobile: 1 column; tablet/md: 2 columns (3rd spans both); desktop/lg: 3 columns */}
              <div className="grid grid-cols-1 justify-items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((tst, idx) => (
                  <motion.article
                    key={tst.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className={`flex h-full w-full transform flex-col justify-between rounded-2xl bg-slate-900 p-6 text-left text-orange-200 shadow-lg ring-1 ring-white/10 transition-transform hover:-translate-y-1 hover:shadow-xl ${
                      idx === 2 ? "md:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <div className="mb-4 flex items-center gap-4 self-start">
                      <div className="mr-auto inline-flex size-25 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                        <Image
                          src="/icons/face-img.svg"
                          alt="User Avatar"
                          width={60}
                          height={60}
                          className="size-15 object-contain"
                        />
                      </div>
                      <div className="mx-2 h-8 w-px bg-white/10" aria-hidden />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {t(`testimonials.items.${tst.key}.name`)}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-300">
                          {t(`testimonials.items.${tst.key}.country`)}
                        </p>
                      </div>
                    </div>
                    {/* small horizontal divider to separate header (avatar/name) from quote */}
                    <div className="my-3 h-px w-full bg-white/10" aria-hidden />
                    <article className="h-full">
                      <blockquote className="mb-4 text-sm leading-snug text-slate-300 italic sm:text-sm">
                        {t(`testimonials.items.${tst.key}.quote`)}
                      </blockquote>
                    </article>

                    <div
                      className="mt-4 flex items-center justify-start text-orange-400"
                      aria-hidden
                    >
                      {Array.from({ length: 5 }).map((_, k) => (
                        <svg
                          key={k}
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mx-0.5"
                          aria-hidden
                        >
                          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Inline: VideoSection */
const VideoSection = () => {
  const { t } = useTranslation();
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Use a web-safe filename (renamed in public/videos)
  const videoSrc = "/videos/Morocco-Video.mp4";

  useEffect(() => {
    if (videoRef.current) videoRef.current.load();
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };
  const handleVideoLoad = () => {
    setIsLoading(false);
    setVideoLoaded(true);
  };
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section
      id="video"
      className="relative w-full overflow-hidden py-4 text-white sm:py-6 lg:py-8"
    >
      <div className="container">
        <div className="relative mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative h-[55vh] w-full overflow-hidden rounded-[34px] bg-slate-900 p-3 shadow-2xl sm:h-[65vh] lg:h-[75vh] xl:h-[85vh]"
          >
            {videoError ? (
              <div className="flex h-full items-center justify-center rounded-[26px] bg-[url(/images/header-1.webp)] bg-cover bg-center px-8 py-12 text-center">
                <div className="rounded-3xl bg-black/60 p-8">
                  <h3 className="text-2xl font-semibold">
                    {t("video.fallback.title")}
                  </h3>
                  <p className="mt-3 text-sm text-white/80">
                    {t("video.fallback.subtitle")}
                  </p>
                  <p className="mt-4 text-xs tracking-[0.35em] text-orange-300 uppercase">
                    {t("video.fallback.cta")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full">
                {isLoading && !videoLoaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[26px] bg-slate-950/60">
                    <div className="space-y-3 text-center">
                      <p className="text-sm tracking-[0.4em] text-orange-200 uppercase">
                        {t("video.loading")}
                      </p>
                      <div className="mx-auto size-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    </div>
                  </div>
                )}
                <video
                  ref={videoRef}
                  loop
                  muted
                  playsInline
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                  onEnded={handleVideoEnd}
                  onClick={() => {
                    if (videoRef.current) {
                      if (videoRef.current.paused) {
                        videoRef.current.play();
                        setIsPlaying(true);
                      } else {
                        videoRef.current.pause();
                        setIsPlaying(false);
                      }
                    }
                  }}
                  preload="metadata"
                  className={`h-full w-full cursor-pointer rounded-[26px] object-cover ${
                    videoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <source src={videoSrc} type="video/mp4" />
                  {t("video.unsupported")}
                </video>
                {videoLoaded && !isPlaying && (
                  <button
                    type="button"
                    className="absolute inset-0 z-10 flex items-center justify-center rounded-[26px] bg-black/40 text-white transition hover:bg-black/50"
                    onClick={handlePlay}
                  >
                    <span className="inline-flex size-20 items-center justify-center rounded-full border border-white/60 bg-white/90 text-slate-900 shadow-lg">
                      <Image
                        src="/icons/play-video_icon.svg"
                        alt="Play Video"
                        width={32}
                        height={32}
                        className="size-8"
                      />
                    </span>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
