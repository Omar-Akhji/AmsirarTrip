import TourLayout from "@/components/sections/TourLayout";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "@/lib/metadata";
import { generateTourJsonLd } from "@/lib/structuredData";
import { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generateSEOMetadata({
    title: `${t("tour3.title")} - 3 Day Marrakech Tour`,
    description: t("tours.tour3.description") + " " + t("tour3.overview"),
    keywords: [
      "Marrakech city tour",
      "Marrakech 3 days",
      "Marrakech souks",
      "Marrakech palaces",
      "Red city Morocco",
      "Marrakech cultural tour",
      "Marrakech medina",
      "Djemaa el Fna",
    ],
    path: "/tours/3",
    locale,
    image: "/images/Tours/Tour3.webp",
    type: "article",
  });
}

export default function Tour3Page() {
  return (
    <>
      <Script
        id="tour3-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateTourJsonLd({
              name: "Marrakech Marvel - 3 Days",
              description:
                "Wander bustling souks, explore stunning palaces, and soak in the vibrant culture of Morocco's red city!",
              provider: "AmsirarTrip",
              image: "https://amsirartrip.com/images/Tours/Tour3.webp",
              duration: "P3D",
              startLocation: "Fes",
              endLocation: "Marrakech",
              url: "https://amsirartrip.com/en/tours/3",
            })
          ),
        }}
      />
      <TourLayout
        tourKey="tour3"
        bookingId={3}
        imageSrc="/images/Tours/Tour3.webp"
      />
    </>
  );
}
