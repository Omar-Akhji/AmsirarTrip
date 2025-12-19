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
    title: `${t("tour2.title")} - 6 Day Imperial Cities Tour`,
    description: t("tours.tour2.description") + " " + t("tour2.overview"),
    keywords: [
      "Morocco 6 day tour",
      "Casablanca to Marrakech",
      "Chefchaouen blue city",
      "Fes imperial city",
      "Morocco cultural tour",
      "Imperial cities Morocco",
      "Sahara desert Fes",
      "Morocco odyssey tour",
    ],
    path: "/tours/2",
    locale,
    image: "/images/Tours/Tour2.webp",
    type: "article",
  });
}

export default function Tour2Page() {
  return (
    <>
      <Script
        id="tour2-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateTourJsonLd({
              name: "Morocco Odyssey - 6 Days",
              description:
                "Discover Casablanca's vibrant energy, Chefchaouen's mystical blues, Fes's ancient labyrinth, and Sahara's golden dunes in an epic cultural adventure!",
              provider: "AmsirarTrip",
              image: "https://amsirartrip.com/images/Tours/Tour2.webp",
              duration: "P6D",
              startLocation: "Casablanca",
              endLocation: "Marrakech",
              url: "https://amsirartrip.com/en/tours/2",
            })
          ),
        }}
      />
      <TourLayout
        tourKey="tour2"
        bookingId={2}
        imageSrc="/images/Tours/Tour2.webp"
      />
    </>
  );
}
