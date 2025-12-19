import TourLayout from "@/features/tours/components/TourLayout";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "@/lib/metadata";
import { generateTourJsonLd } from "@/lib/structuredData";
import { sanitizeJsonLd } from "@/lib/sanitize";
import { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const tourDescription = `${t(
    "tour8.overview"
  )} Escape to the Sahara on this 3-day journey from Marrakech to the remote Chegaga dunes.`;

  return generateSEOMetadata({
    title: `${t("tour8.title")} - 3 Day Chegaga Desert Tour from Marrakech`,
    description: tourDescription,
    keywords: [
      "Chegaga desert tour",
      "3 day Sahara tour",
      "Marrakech to Chegaga",
      "Morocco desert tour",
      "Remote desert experience",
      "Chegaga dunes",
      "Camel trekking Morocco",
      "Desert camping Morocco",
      "Draa Valley tour",
      "M'Hamid desert",
      "Sahara expedition",
      "Morocco desert adventure",
    ],
    path: `/tours/8`,
    locale,
    image: "/images/Tours/Tour8.webp",
    type: "article",
    publishedTime: "2024-01-25T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    author: "AmsirarTrip",
  });
}

export default function Tour8Page() {
  return (
    <>
      <Script
        id="tour8-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            JSON.stringify(
              generateTourJsonLd({
                name: "3 Days Marrakech to Chegaga Desert Tour",
                description:
                  "Escape to the Sahara on this 3-day journey from Marrakech to the remote Chegaga dunes. Experience camel trekking, desert camping, and stunning sunsets in Morocco's most remote desert region.",
                provider: "AmsirarTrip",
                image: "https://amsirartrip.com/images/Tours/Tour8.webp",
                price: 350,
                currency: "EUR",
                duration: "P3D",
                startLocation: "Marrakech",
                endLocation: "Marrakech",
                url: "https://amsirartrip.com/en/tours/8",
              })
            )
          ),
        }}
      />
      <TourLayout
        tourKey="tour8"
        bookingId={8}
        imageSrc="/images/Tours/Tour8.webp"
      />
    </>
  );
}
