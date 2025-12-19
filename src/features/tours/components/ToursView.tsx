"use client";

import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { TOURS_DATA } from "../data";
import { motion } from "framer-motion";

export default function ToursView() {
  const { t } = useTranslation();

  const tourStats = React.useMemo(
    () => [
      {
        id: "routes",
        value: "12+",
        label: t("tours.stats.routes", "Signature itineraries"),
        description: t(
          "tours.stats.routesDesc",
          "Multi-day journeys curated across imperial cities, desert dunes, and Atlas passes."
        ),
      },
      {
        id: "comfort",
        value: "4x4",
        label: t("tours.stats.comfort", "Comfort fleet"),
        description: t(
          "tours.stats.comfortDesc",
          "Modern 4x4s and mini-coaches with seasoned driver-guides on every route."
        ),
      },
      {
        id: "support",
        value: "24/7",
        label: t("tours.stats.support", "Concierge support"),
        description: t(
          "tours.stats.supportDesc",
          "On-trip coordination for hotels, dietary requests, and schedule tweaks."
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
              {t("tours.title")}
            </h1>
            <p className="text-lg text-slate-200 lg:text-xl">
              {t("tours.headerSubtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-center">
              <a
                href="#tours-grid"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                <span>{t("tours.detailsTitle")}</span>
                <ArrowIcon className="size-4" />
              </a>
              <a
                href="tel:+212661173144"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5"
              >
                <PhoneIcon className="size-4" />
                <span>{t("helplineTitle")}</span>
              </a>
            </div>
          </div>

          {/* No right column for Tours header; single column hero like Contact/About */}
        </div>
      </header>

      <main className="text-slate-900">
        <section className="py-12" aria-labelledby="tour-highlights">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase">
                {t("tours.tour.smTitle")}
              </p>
              <h2
                id="tour-highlights"
                className="mt-4 text-3xl leading-tight font-bold md:text-4xl"
              >
                {t("tours.detailsTitle")}
              </h2>
              <p className="mt-3 text-base text-slate-600">
                {t("tours.detailsSubtitle")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {tourStats.map((stat, idx) => (
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
          id="tours-grid"
          className="border-t border-slate-200 bg-linear-to-b from-slate-50 to-white py-16"
          aria-labelledby="tours-grid-heading"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase">
                {t("tours.tour.smTitle")}
              </p>
              <h2
                id="tours-grid-heading"
                className="mt-4 text-3xl leading-tight font-bold md:text-4xl"
              >
                {t("tours.tour.lgTitle")}
              </h2>
              <p className="mt-3 text-base text-slate-600">
                {t("tours.sectionSubtitle", t("tours.detailsSubtitle"))}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 min-[901px]:grid-cols-2 min-[1150px]:grid-cols-3">
              {TOURS_DATA.map((tour, idx) => (
                <motion.article
                  key={tour.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative mb-8 block h-[470px] cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out group-hover:min-h-[540px]"
                >
                  <div className="thumbnail relative h-[400px] overflow-hidden rounded-t-3xl bg-black">
                    <Image
                      src={tour.image}
                      alt={t(tour.title)}
                      fill
                      sizes="(max-width: 900px) 100vw, (max-width: 1149px) 50vw, 33vw"
                      className="block w-[120%] transform object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-60 hover:scale-105 hover:opacity-90"
                    />

                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-orange-100 uppercase backdrop-blur-sm">
                      {t("tours.featured")}
                    </span>
                  </div>

                  <div className="post-content absolute bottom-0 box-border min-h-50 w-full rounded-b-3xl bg-white p-[30px] pb-16 transition-all duration-500 ease-out">
                    <div className="mb-3 flex justify-center">
                      <span className="inline-flex items-center gap-2 rounded-[20px] border border-orange-600 bg-white/10 px-3 py-1 text-xs font-semibold text-orange-600 uppercase backdrop-blur-sm">
                        <ClockIcon className="size-3 text-orange-600" />
                        <span>
                          {t("tours.durationLabel", {
                            count: tour.duration,
                          }).toUpperCase()}
                        </span>
                      </span>
                    </div>

                    <h3 className="m-0 mb-2 text-lg leading-[1.2] font-bold tracking-[0.5px] text-slate-900">
                      {t(tour.title)}
                    </h3>

                    <p className="description max-h-0 overflow-hidden text-sm leading-[1.8em] text-slate-600 opacity-0 transition-[max-height,opacity] duration-500 ease-out group-hover:max-h-[12em] group-hover:opacity-100">
                      {t(tour.description)}
                    </p>

                    <div className="mt-2 mb-2 grid grid-cols-2 gap-4 text-center text-sm text-slate-600">
                      <div>
                        <p className="text-xs tracking-[0.35em] text-slate-400 uppercase">
                          {t("tours.startLabelShort", "Start")}
                        </p>
                        <p className="mt-1 font-semibold text-slate-800">
                          {t(tour.start)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.35em] text-slate-400 uppercase">
                          {t("tours.endLabelShort", "End")}
                        </p>
                        <p className="mt-1 font-semibold text-slate-800">
                          {t(tour.end)}
                        </p>
                      </div>
                    </div>

                    <div className="post-meta absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center justify-center text-orange-600">
                      <Link
                        href={tour.route}
                        className="inline-flex transform items-center rounded-[20px] border border-orange-600 bg-transparent px-4 py-2 font-medium text-orange-600 no-underline transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-lg"
                      >
                        {t("tours.exploreLink")}
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

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.12 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2L8.09 9.91a16 16 0 0 0 6 6l1.38-1.38a2 2 0 0 1 2-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
