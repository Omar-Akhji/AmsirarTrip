"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { EXCURSIONS_DATA } from "@/features/excursions/data/excursionsData";
import { m } from "motion/react";
import { ArrowIcon } from "@/shared/ui/icons";
import { fadeInUp, fadeInScale } from "@/lib/constants/animations";
import {
  PageHeader,
  HeaderCTA,
  HeaderSecondaryCTA,
} from "@/shared/layout/PageHeader";

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
      <PageHeader
        title={t("excursion.title")}
        subtitle={t("excursion.headerSubtitle")}
        bgImage="/images/Header/header-1.webp"
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.excursions") },
        ]}
      >
        <HeaderSecondaryCTA
          href="https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html"
          external
        >
          Offers on TripAdvisor
        </HeaderSecondaryCTA>
        <HeaderCTA href="#excursions-grid">
          <span>{t("excursion.detailsTitle")}</span>
          <ArrowIcon className="size-4" />
        </HeaderCTA>
      </PageHeader>

      <main className="text-slate-900">
        <section className="py-12" aria-labelledby="excursion-highlights">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase">
                {t("excursion.blog.smTitle")}
              </p>
              <h2
                id="excursion-highlights"
                className="mt-4 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl"
              >
                {t("excursion.detailsTitle")}
              </h2>
              <p className="mt-3 text-base text-slate-600">
                {t("excursion.detailsSubtitle")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {highlightStats.map((stat, idx) => (
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
                className="mt-4 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl"
              >
                {t("excursion.blog.lgTitle")}
              </h2>
              <p className="mt-3 text-base text-slate-600">
                {t("excursion.sectionSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 min-[901px]:grid-cols-2 min-[1150px]:grid-cols-3">
              {EXCURSIONS_DATA.map((excursion, idx) => (
                <m.article
                  key={excursion.id}
                  {...fadeInScale}
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
                </m.article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
