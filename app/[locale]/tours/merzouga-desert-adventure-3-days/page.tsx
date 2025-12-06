import TourLayout from "@/components/sections/TourLayout";
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
    "tour1.overview"
  )} Experience camel trekking, desert camping, and the stunning landscapes of the Dades Valley and Ait Ben Haddou. Perfect 3-day adventure from Marrakech.`;

  return generateSEOMetadata({
    title: `${t("tour1.title")} - 3 Day Merzouga Desert Tour from Marrakech`,
    description: tourDescription,
    keywords: [
      "Merzouga desert tour",
      "3 day Sahara tour",
      "Marrakech to Merzouga",
      "Ait Ben Haddou tour",
      "Dades Valley tour",
      "Camel trekking Morocco",
      "Desert camping Merzouga",
      "Sahara adventure tour",
      "Morocco desert experience",
      "Atlas Mountains tour",
      "Todra Gorge excursion",
      "Morocco desert safari",
    ],
    path: `/${locale}/tours/1`,
    locale,
    image: "/images/Tours/Tour1.webp",
    type: "article",
    publishedTime: "2024-01-15T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    author: "AmsirarTrip",
  });
}

export default function Tour1Page() {
  return (
    <>
      <Script
        id="tour1-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            generateTourJsonLd({
              name: "3 Day Merzouga Desert Tour from Marrakech",
              description:
                "Experience the magic of the Sahara Desert on this 3-day adventure from Marrakech to Merzouga. Explore Ait Ben Haddou, ride camels across golden dunes, camp under starlit skies, and discover the beauty of Morocco's desert wilderness.",
              provider: "AmsirarTrip",
              image: "https://amsirartrip.com/images/Tours/Tour1.webp",
              price: 295,
              currency: "EUR",
              duration: "P3D",
              startLocation: "Marrakech",
              endLocation: "Marrakech",
              url: "https://amsirartrip.com/en/tours/1",
            })
          ),
        }}
      />
      <TourLayout
        tourKey="tour1"
        bookingId={1}
        imageSrc="/images/Tours/Tour1.webp"
      />
    </>
  );
}
