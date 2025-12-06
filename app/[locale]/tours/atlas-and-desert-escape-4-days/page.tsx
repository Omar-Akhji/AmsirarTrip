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
    title: `${t("tour6.title")} - 4 Day Desert Adventure`,
    description: t("tours.tour6.description") + " " + t("tour6.overview"),
    keywords: [
      "4 day Merzouga tour",
      "Atlas Mountains trek",
      "Sahara camping tour",
      "Merzouga adventure",
      "Desert trekking Morocco",
      "Atlas to Sahara tour",
      "Morocco desert camping",
      "Merzouga dunes tour",
    ],
    path: "/tours/6",
    locale,
    image: "/images/Tours/Tour6.webp",
    type: "article",
  });
}

export default function Tour6Page() {
  return (
    <>
      <Script
        id="tour6-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateTourJsonLd({
              name: "Desert Thrill - 4 Days",
              description:
                "Conquer Atlas Mountains, trek Sahara dunes, and camp under stars in a Merzouga adventure!",
              provider: "AmsirarTrip",
              image: "https://amsirartrip.com/images/Tours/Tour6.webp",
              duration: "P4D",
              startLocation: "Marrakech",
              endLocation: "Marrakech",
              url: "https://amsirartrip.com/en/tours/6",
            })
          ),
        }}
      />
      <TourLayout
        tourKey="tour6"
        bookingId={6}
        imageSrc="/images/Tours/Tour6.webp"
      />
    </>
  );
}
