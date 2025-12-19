import TourLayout from "@/features/tours/components/TourLayout";
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
    title: `${t("tour4.title")} - 5 Day Northern Morocco Tour`,
    description: t("tours.tour4.description") + " " + t("tour4.overview"),
    keywords: [
      "Northern Morocco tour",
      "Casablanca tour",
      "Fes tour 5 days",
      "Morocco northern cities",
      "Casablanca to Fes",
      "Morocco cultural journey",
      "Hassan II Mosque",
      "Fes medina tour",
    ],
    path: "/tours/4",
    locale,
    image: "/images/Tours/Tour4.webp",
    type: "article",
  });
}

export default function Tour4Page() {
  return (
    <>
      <Script
        id="tour4-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateTourJsonLd({
              name: "Northern Treasures - 5 Days",
              description:
                "From Casablanca's modernity to Fes's ancient wonders, explore Morocco's north in a cultural journey!",
              provider: "AmsirarTrip",
              image: "https://amsirartrip.com/images/Tours/Tour4.webp",
              duration: "P5D",
              startLocation: "Casablanca",
              endLocation: "Marrakech",
              url: "https://amsirartrip.com/en/tours/4",
            })
          ),
        }}
      />
      <TourLayout
        tourKey="tour4"
        bookingId={4}
        imageSrc="/images/Tours/Tour4.webp"
      />
    </>
  );
}
