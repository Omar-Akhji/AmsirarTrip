"use client";

import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { TOURS_DATA } from "../data";
import { m } from "motion/react";
import { ArrowIcon, ClockIcon } from "@/shared/ui/icons";
import { fadeInUp, fadeInScale } from "@/lib/constants/animations";
import {
  PageHeader,
  HeaderCTA,
  HeaderSecondaryCTA,
} from "@/shared/layout/PageHeader";

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
      <PageHeader
        title={t("tours.title")}
        subtitle={t("tours.headerSubtitle")}
        bgImage="/images/Header/header-1.webp"
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.tours") },
        ]}
      >
        <HeaderCTA href="#tours-grid">
          <span>{t("tours.detailsTitle")}</span>
          <ArrowIcon className="size-4" />
        </HeaderCTA>
        <HeaderSecondaryCTA
          href="https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html"
          external
        >
          Offers on TripAdvisor
        </HeaderSecondaryCTA>
      </PageHeader>

      <main className="text-slate-900">
        <section className="py-12" aria-labelledby="tour-highlights">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase">
                {t("tours.tour.smTitle")}
              </p>
              <h2
                id="tour-highlights"
                className="mt-4 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl"
              >
                {t("tours.detailsTitle")}
              </h2>
              <p className="mt-3 text-base text-slate-600">
                {t("tours.detailsSubtitle")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {tourStats.map((stat, idx) => (
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
                className="mt-4 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl"
              >
                {t("tours.tour.lgTitle")}
              </h2>
              <p className="mt-3 text-base text-slate-600">
                {t("tours.sectionSubtitle", t("tours.detailsSubtitle"))}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 min-[901px]:grid-cols-2 min-[1150px]:grid-cols-3">
              {TOURS_DATA.map((tour, idx) => (
                <m.article
                  key={tour.id}
                  {...fadeInScale}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative mb-8 block h-117.5 cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out group-hover:min-h-135"
                >
                  <div className="thumbnail relative h-100 overflow-hidden rounded-t-3xl bg-black">
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

                  <div className="post-content absolute bottom-0 box-border min-h-50 w-full rounded-b-3xl bg-white p-7.5 pb-16 transition-all duration-500 ease-out">
                    <div className="mb-3 flex justify-center">
                      <span className="inline-flex items-center gap-2 rounded-[20px] border border-orange-600 bg-white/10 px-3 py-1 text-xs font-semibold text-orange-600 uppercase backdrop-blur-sm">
                        <ClockIcon className="size-3 text-orange-600" />
                        <time dateTime={`P${tour.duration}D`}>
                          {t("tours.durationLabel", {
                            count: tour.duration,
                          }).toUpperCase()}
                        </time>
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
                </m.article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
