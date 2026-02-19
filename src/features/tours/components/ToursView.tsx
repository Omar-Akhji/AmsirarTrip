import { getTranslations } from "next-intl/server";
import { TOURS_DATA } from "../data";
import { ArrowIcon } from "@/shared/ui/icons";
import {
  PageHeader,
  HeaderCTA,
  HeaderSecondaryCTA,
} from "@/shared/layout/PageHeader";
import { StatHighlights } from "./StatHighlights";
import { TourCard } from "./TourCard";

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
              <p className="mt-3 text-base text-taupe-600">
                {t("tours.detailsSubtitle")}
              </p>
            </div>

            <StatHighlights stats={tourStats} />
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
              <p className="mt-3 text-base text-taupe-600">
                {t("tours.sectionSubtitle") || t("tours.detailsSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 min-[901px]:grid-cols-2 min-[1150px]:grid-cols-3">
              {TOURS_DATA.map((tour, idx) => (
                <TourCard
                  key={tour.id}
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
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
