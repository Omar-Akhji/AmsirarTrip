"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { EXCURSIONS_DATA } from "@/features/excursions/data/excursionsData";
import { motion } from "framer-motion";

export default function ExcursionView() {
  const { t } = useTranslation();
  const highlightStats = React.useMemo(
    () => [
      {
        id: "routes",
        value: "6+",
        label: t("excursion.stats.routes", "Signature excursions"),
        description: t(
          "excursion.stats.routesDesc",
          "Handpicked day trips from waterfalls to desert sunsets."
        ),
      },
      {
        id: "local",
        value: "100%",
        label: t("excursion.stats.local", "Local expertise"),
        description: t(
          "excursion.stats.localDesc",
          "Guided by Marrakech-based storytellers and drivers."
        ),
      },
      {
        id: "support",
        value: "24/7",
        label: t("excursion.stats.support", "On-trip support"),
        description: t(
          "excursion.stats.supportDesc",
          "Flexible departures and concierge-style planning."
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <header className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.35),transparent_65%)]"
          aria-hidden="true"
        ></div>
        <div
          className="absolute inset-0 z-10 bg-linear-to-br from-slate-900/80 via-slate-900/60 to-slate-900 opacity-80"
          aria-hidden="true"
        ></div>
        <div
          className="absolute inset-0 z-10 bg-linear-to-br from-black/60 via-black/20 to-transparent"
          aria-hidden="true"
        ></div>
        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-24 text-center lg:flex-row lg:items-center lg:py-28 lg:text-left">
          <div className="contact-hero-content flex-1 space-y-6 pt-6 text-center lg:pt-12">
            <h1 className="text-4xl font-semibold tracking-[0.2em] text-orange-200 uppercase sm:text-5xl">
              {t("excursion.title")}
            </h1>
            <p className="text-lg text-slate-200 lg:text-xl">
              {t("excursion.headerSubtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
              <a
                href="https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                Offers on TripAdvisor
              </a>
              <a
                href="#excursions-grid"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                <span>{t("excursion.detailsTitle")}</span>
                <ArrowIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="text-slate-900">
        <section className="py-12" aria-labelledby="excursion-highlights">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase">
                {t("excursion.blog.smTitle")}
              </p>
              <h2
                id="excursion-highlights"
                className="mt-4 text-3xl leading-tight font-bold md:text-4xl"
              >
                {t("excursion.detailsTitle")}
              </h2>
              <p className="mt-3 text-base text-slate-600">
                {t("excursion.detailsSubtitle")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {highlightStats.map((stat, idx) => (
                <motion.article
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
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
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="excursions-grid"
          className="border-t border-slate-200 bg-linear-to-b from-slate-50 to-white py-16"
          aria-labelledby="excursion-grid-heading"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase">
                {t("excursion.blog.smTitle")}
              </p>
              <h2
                id="excursion-grid-heading"
                className="mt-4 text-3xl leading-tight font-bold md:text-4xl"
              >
                {t("excursion.blog.lgTitle")}
              </h2>
              <p className="mt-3 text-base text-slate-600">
                {t("excursion.sectionSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 min-[901px]:grid-cols-2 min-[1150px]:grid-cols-3">
              {EXCURSIONS_DATA.map((excursion, idx) => (
                <motion.article
                  key={excursion.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative mb-8 block h-117.5 cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out"
                >
                  <div className="thumbnail relative h-100 overflow-hidden rounded-t-3xl bg-black">
                    <Image
                      src={excursion.image}
                      alt={t(excursion.alt)}
                      fill
                      sizes="(max-width: 900px) 100vw, (max-width: 1149px) 50vw, 33vw"
                      priority={idx < 2}
                      className="block w-[120%] transform object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-60"
                    />

                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-orange-200 uppercase backdrop-blur-sm">
                      {t("excursion.card.category")}
                    </span>
                  </div>

                  <div className="post-content absolute bottom-0 box-border min-h-50 w-full rounded-b-3xl bg-white p-7.5 pb-24 transition-all duration-500 ease-out">
                    <h3 className="m-0 mb-2 text-[1.3rem] leading-[1.2] font-bold tracking-[0.5px] text-orange-600">
                      {t(excursion.title)}
                    </h3>

                    <p className="m-0 pb-1 text-xs font-medium tracking-[0.5px] text-orange-400 normal-case">
                      {t(excursion.tagline)}
                    </p>

                    <p className="description max-h-0 overflow-hidden text-sm leading-[1.8em] text-gray-600 opacity-0 transition-[max-height,opacity] duration-500 ease-out group-hover:max-h-[6em] group-hover:opacity-100">
                      {t(excursion.description)}
                    </p>

                    <div className="post-meta absolute bottom-6 left-1/2 flex -translate-x-1/2 transform items-center justify-center text-orange-600">
                      <Link
                        href={excursion.route}
                        className="inline-flex transform items-center rounded-[20px] border border-orange-600 bg-transparent px-4 py-2 font-medium text-orange-600 no-underline transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-lg hover:shadow-orange-500/30"
                      >
                        {t("excursion.exploreLink")}
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
