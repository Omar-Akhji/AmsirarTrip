"use client";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { AnimateOnScroll } from "@/shared/ui";

export default function HomeStats() {
  const { t } = useTranslation();

  const statHighlights = [
    {
      id: "experience",
      value: "20+",
      label: t("about.experienceTitle"),
      description: t(
        "home.stats.experience",
        "Years perfecting Sahara crossings and Atlas escapades.",
      ),
    },
    {
      id: "routes",
      value: "35+",
      label: t("excursion.stats.routes", "Signature excursions"),
      description: t(
        "home.stats.routes",
        "Handpicked story-driven routes from dunes to oceans.",
      ),
    },
    {
      id: "care",
      value: "24/7",
      label: t("excursion.stats.support", "On-trip support"),
      description: t(
        "home.stats.care",
        "Dedicated coordinators for every mile of your journey.",
      ),
    },
  ];

  return (
    <section className="py-12" aria-labelledby="home-highlights">
      <div className="mx-auto px-4 max-inline-7xl">
        <AnimateOnScroll animation="fade-up">
          <div className="mx-auto mbe-10 space-y-4 text-center max-inline-4xl">
            <p className="inline-flex items-center justify-center rounded-full border-2 border-white bg-orange-600 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-white uppercase">
              {t("about.smTitle")}
            </p>
            <h2
              id="home-highlights"
              className="mbs-4 text-2xl leading-tight font-bold text-shadow-md sm:text-3xl md:text-4xl"
            >
              {t("about.experienceTitle")}
            </h2>
            <div
              className="mx-auto mbs-4 rounded-full bg-orange-500 block-1 inline-20"
              aria-hidden="true"
            />
            <p className="mbs-4 text-base text-taupe-600">
              {t("tours.detailsSubtitle")}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid gap-6 md:grid-cols-3">
          {statHighlights.map((stat, idx) => (
            <AnimateOnScroll
              key={stat.id}
              animation="fade-up"
              delay={idx * 150}
              className="flex block-full inline-full"
            >
              <article className="inline-full rounded-3xl border border-orange-100 bg-white p-6 shadow-xs shadow-orange-100/70">
                <p className="text-4xl font-bold text-orange-600">
                  {stat.value}
                </p>
                <h3 className="mbs-3 text-lg font-semibold text-slate-900">
                  {stat.label}
                </h3>
                <p className="mbs-2 text-sm text-taupe-600">
                  {stat.description}
                </p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
