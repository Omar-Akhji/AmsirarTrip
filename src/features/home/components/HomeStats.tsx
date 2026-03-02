"use client";

import { m } from "motion/react";
import { useTranslation } from "@/lib/hooks";
import { fadeInUp } from "@/lib/constants/animations";

export default function HomeStats() {
  const { t } = useTranslation();

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
    <section className="py-12" aria-labelledby="home-highlights">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="inline-flex items-center justify-center rounded-full border-2 border-white bg-orange-600 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-white uppercase">
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
  );
}
