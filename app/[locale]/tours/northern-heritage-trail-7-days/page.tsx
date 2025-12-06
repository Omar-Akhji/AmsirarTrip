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
    "tour9.overview"
  )} Discover Northern Morocco's highlights on this 7-day journey from Tangier through Chefchaouen, Fes, and ancient Roman ruins to vibrant Marrakech.`;

  return generateSEOMetadata({
    title: `${t("tour9.title")} - 7 Days Tangier to Marrakech Morocco Tour`,
    description: tourDescription,
    keywords: [
      "Northern Morocco tour",
      "7 day Morocco tour",
      "Tangier to Marrakech",
      "Chefchaouen blue city tour",
      "Fes medina tour",
      "Volubilis Roman ruins",
      "Morocco imperial cities",
      "Middle Atlas tour",
      "Tetouan tour",
      "Meknes tour",
      "Morocco culture tour",
      "Northern Morocco highlights",
    ],
    path: `/tours/9`,
    locale,
    image: "/images/Tours/Tour9.webp",
    type: "article",
    publishedTime: "2024-02-01T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    author: "AmsirarTrip",
  });
}

export default function Tour9Page() {
  return (
    <>
      <Script
        id="tour9-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            JSON.stringify(
              generateTourJsonLd({
                name: "7 Days North Morocco Tour from Tangier to Marrakech",
                description:
                  "Discover Northern Morocco's highlights on this 7-day journey from Tangier through Chefchaouen, Fes, and ancient Roman ruins to vibrant Marrakech. A perfect mix of culture, history, nature, and authentic Moroccan experiences.",
                provider: "AmsirarTrip",
                image: "https://amsirartrip.com/images/Tours/Tour9.webp",
                price: 750,
                currency: "EUR",
                duration: "P7D",
                startLocation: "Tangier",
                endLocation: "Marrakech",
                url: "https://amsirartrip.com/en/tours/9",
              })
            )
          ),
        }}
      />
      <TourLayout
        tourKey="tour9"
        bookingId={9}
        imageSrc="/images/Tours/Tour9.webp"
      />
    </>
  );
}
