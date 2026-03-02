import { getTranslations } from "next-intl/server";
import { EXCURSIONS_DATA } from "@/features/excursions/data/excursionsData";
import { ArrowIcon } from "@/shared/ui/icons";
import {
  PageHeader,
  HeaderCTA,
  HeaderSecondaryCTA,
} from "@/shared/layout/PageHeader";
import { StatHighlights } from "@/features/tours/components/StatHighlights";
import { ExcursionCard } from "./ExcursionCard";

export default async function ExcursionView() {
  const t = await getTranslations();

  const highlightStats = [
    {
      id: "routes",
      value: "6+",
      label: t("excursion.stats.routes") || "Signature excursions",
      description:
        t("excursion.stats.routesDesc") ||
        "Handpicked day trips from waterfalls to desert sunsets.",
    },
    {
      id: "local",
      value: "100%",
      label: t("excursion.stats.local") || "Local expertise",
      description:
        t("excursion.stats.localDesc") ||
        "Guided by Marrakech-based storytellers and drivers.",
    },
    {
      id: "support",
      value: "24/7",
      label: t("excursion.stats.support") || "On-trip support",
      description:
        t("excursion.stats.supportDesc") ||
        "Flexible departures and concierge-style planning.",
    },
  ];

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
              <p className="inline-flex items-center justify-center rounded-full border-2 border-white bg-orange-600 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-white uppercase">
                {t("excursion.blog.smTitle")}
              </p>
              <h2
                id="excursion-highlights"
                className="mt-4 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl"
              >
                {t("excursion.detailsTitle")}
              </h2>
              <p className="mt-3 text-base text-taupe-600">
                {t("excursion.detailsSubtitle")}
              </p>
            </div>

            <StatHighlights stats={highlightStats} />
          </div>
        </section>

        <section
          id="excursions-grid"
          className="border-t border-slate-200 bg-linear-to-b from-slate-50 to-white py-16"
          aria-labelledby="excursion-grid-heading"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2
                id="excursion-grid-heading"
                className="mt-4 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl"
              >
                {t("excursion.blog.lgTitle")}
              </h2>
              <p className="mt-3 text-base text-taupe-600">
                {t("excursion.sectionSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 min-[901px]:grid-cols-2 min-[1150px]:grid-cols-3">
              {EXCURSIONS_DATA.map((excursion, idx) => (
                <ExcursionCard
                  key={excursion.id}
                  excursion={excursion}
                  idx={idx}
                  translations={{
                    alt: t(excursion.alt),
                    title: t(excursion.title),
                    tagline: t(excursion.tagline),
                    description: t(excursion.description),
                    category: t("excursion.card.category"),
                    exploreLink: t("excursion.exploreLink"),
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
