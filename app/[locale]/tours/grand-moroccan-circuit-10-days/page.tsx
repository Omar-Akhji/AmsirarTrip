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
    title: `${t("tour5.title")} - 10 Day Grand Morocco Tour`,
    description: t("tours.tour5.description") + " " + t("tour5.overview"),
    keywords: [
      "Morocco 10 day tour",
      "Grand Morocco tour",
      "Complete Morocco tour",
      "Sahara Atlas tour",
      "Morocco epic adventure",
      "Imperial cities Sahara",
      "Morocco comprehensive tour",
      "Best Morocco tour",
    ],
    path: "/tours/5",
    locale,
    image: "/images/Tours/Tour5.webp",
    type: "article",
  });
}

export default function Tour5Page() {
  return (
    <>
      <Script
        id="tour5-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateTourJsonLd({
              name: "Morocco Wonders - 10 Days",
              description:
                "Traverse Sahara dunes, imperial cities, Atlas peaks, and coastal elegance in an epic adventure!",
              provider: "AmsirarTrip",
              image: "https://amsirartrip.com/images/Tours/Tour5.webp",
              duration: "P10D",
              startLocation: "Marrakech",
              endLocation: "Marrakech",
              url: "https://amsirartrip.com/en/tours/5",
            })
          ),
        }}
      />
      <TourLayout
        tourKey="tour5"
        bookingId={5}
        imageSrc="/images/Tours/Tour5.webp"
      />
    </>
  );
}
