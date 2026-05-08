import { getTranslations } from "next-intl/server";
import { TOURS_DATA } from "../data";
import { ArrowRight } from "lucide-react";
import {
  PageHeader,
  HeaderCTA,
  HeaderSecondaryCTA,
} from "@/shared/layout/PageHeader";
import { StatHighlights } from "./StatHighlights";
import { TourCard } from "./TourCard";
import { AnimateOnScroll } from "@/shared/ui";

export default async function ToursView() {
  const t = await getTranslations();

  const tourStats = [
    {
      id: "routes",
      value: "12+",
      label: t("tours.stats.routes") || "Signature itineraries",
      description:
        t("tours.stats.routesDesc") ||
        "Multi-day journeys curated across imperial cities, desert dunes, and Atlas passes.",
    },
    {
      id: "comfort",
      value: "4x4",
      label: t("tours.stats.comfort") || "Comfort fleet",
      description:
        t("tours.stats.comfortDesc") ||
        "Modern 4x4s and mini-coaches with seasoned driver-guides on every route.",
    },
    {
      id: "support",
      value: "24/7",
      label: t("tours.stats.support") || "Concierge support",
      description:
        t("tours.stats.supportDesc") ||
        "On-trip coordination for hotels, dietary requests, and schedule tweaks.",
    },
  ];

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
          <ArrowRight className="size-4" />
        </HeaderCTA>
        <HeaderSecondaryCTA
          href="https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html"
          external
        >
          Offers on TripAdvisor
        </HeaderSecondaryCTA>
      </PageHeader>

      <main className="text-zinc-900">
        <section className="py-12" aria-labelledby="tour-highlights">
          <div className="mx-auto px-4 max-inline-7xl">
            <div className="mx-auto mbe-10 text-center max-inline-3xl">
              <p className="inline-flex items-center justify-center rounded-full border-2 border-white bg-orange-600 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-white uppercase">
                {t("tours.tour.smTitle")}
              </p>
              <h2
                id="tour-highlights"
                className="mbs-4 text-2xl leading-tight font-semibold text-shadow-md sm:text-3xl md:text-4xl"
              >
                {t("tours.detailsTitle")}
              </h2>
              <div
                className="mx-auto mbs-4 rounded-full bg-orange-500 block-1 inline-20"
                aria-hidden="true"
              />
              <p className="mbs-4 text-base text-taupe-600">
                {t("tours.detailsSubtitle")}
              </p>
            </div>

            <AnimateOnScroll animation="fade-up">
              <StatHighlights stats={tourStats} />
            </AnimateOnScroll>
          </div>
        </section>

        <section
          id="tours-grid"
          className="border-t border-zinc-200 bg-linear-to-b from-zinc-50 to-white py-16"
          aria-labelledby="tours-grid-heading"
        >
          <div className="mx-auto px-4 max-inline-7xl">
            <div className="mbe-12 text-center">
              <h2
                id="tours-grid-heading"
                className="mbs-4 text-2xl leading-tight font-semibold text-shadow-md sm:text-3xl md:text-4xl"
              >
                {t("tours.tour.lgTitle")}
              </h2>
              <div
                className="mx-auto mbs-4 rounded-full bg-orange-500 block-1 inline-20"
                aria-hidden="true"
              />
              <p className="mbs-4 text-base text-taupe-600">
                {t("tours.sectionSubtitle") || t("tours.detailsSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 min-[901px]:grid-cols-2 min-[1150px]:grid-cols-3">
              {TOURS_DATA.map((tour, idx) => (
                <AnimateOnScroll
                  key={tour.id}
                  animation="fade-up"
                  delay={idx * 150}
                  className="flex block-full inline-full"
                >
                  <TourCard
                    tour={tour}
                    idx={idx}
                    translations={{
                      title: t(tour.title),
                      description: t(tour.description),
                      durationLabel: t("tours.durationLabel", {
                        count: tour.duration,
                      }).toUpperCase(),
                      featured: t("tours.featured"),
                      startLabelShort: t("tours.startLabelShort") || "Start",
                      endLabelShort: t("tours.endLabelShort") || "End",
                      start: t(tour.start),
                      end: t(tour.end),
                      exploreLink: t("tours.exploreLink"),
                    }}
                  />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
