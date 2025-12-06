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
    "tour7.overview"
  )} Experience the coastal charm of Essaouira, fresh seafood, beautiful beaches, and vibrant local markets. Perfect 4-day adventure from Marrakech.`;

  return generateSEOMetadata({
    title: `${t("tour7.title")} - 4 Day Essaouira Beach Tour from Marrakech`,
    description: tourDescription,
    keywords: [
      "Essaouira tour",
      "4 day coastal tour",
      "Marrakech to Essaouira",
      "Morocco beach tour",
      "Coastal adventure Morocco",
      "Essaouira beaches",
      "Atlantic coast tour",
      "Moroccan fishing village",
      "Beach vacation Morocco",
      "Argan oil tour",
      "Essaouira medina tour",
      "Morocco seaside escape",
    ],
    path: `/tours/7`,
    locale,
    image: "/images/Tours/Tour7.webp",
    type: "article",
    publishedTime: "2024-01-20T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    author: "AmsirarTrip",
  });
}

export default function Tour7Page() {
  return (
    <>
      <Script
        id="tour7-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            JSON.stringify(
              generateTourJsonLd({
                name: "4 Day Agadir to Marrakech via Merzouga Desert",
                description:
                  "Explore Morocco's diverse landscapes on this 4-day adventure from Agadir to Marrakech. Journey through the Anti-Atlas Mountains, the valleys and kasbahs of Dades, and the Sahara Desert dunes at Merzouga. Ride camels, witness desert sunsets and sunrises, and experience traditional Berber hospitality.",
                provider: "AmsirarTrip",
                image: "https://amsirartrip.com/images/Tours/Tour7.webp",
                price: 420,
                currency: "EUR",
                duration: "P4D",
                startLocation: "Agadir",
                endLocation: "Marrakech",
                url: "https://amsirartrip.com/en/tours/7",
              })
            )
          ),
        }}
      />
      <TourLayout
        tourKey="tour7"
        bookingId={7}
        imageSrc="/images/Tours/Tour7.webp"
      />
    </>
  );
}
