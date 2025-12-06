import ExcursionLayout from "@/components/sections/ExcursionLayout";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "@/lib/metadata";
import { generateExcursionJsonLd } from "@/lib/structuredData";
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
    title: t("excursion.list.imlil.title"),
    description:
      t("excursion.list.imlil.description") +
      " " +
      t("excursion.list.imlil.tagline"),
    keywords: [
      "Imlil trekking",
      "Mount Toubkal",
      "High Atlas trekking",
      "Imlil day trip",
      "Berber villages trek",
      "Morocco mountain hiking",
      "Atlas Mountains Imlil",
    ],
    path: "/excursions/6",
    locale,
    image: "/images/Excursions/Imlil.webp",
    type: "article",
  });
}

export default function Excursion6Page() {
  return (
    <>
      <Script
        id="excursion6-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateExcursionJsonLd({
              name: "Sunrise Hot Air Balloon Ride",
              description:
                "Lift off before dawn for sweeping views of Marrakech, then savor a Berber breakfast after landing.",
              provider: "AmsirarTrip",
              image:
                "https://amsirartrip.com/images/Excursions/Hot Air Balloon Ride.webp",
              duration: "P1D",
              location: "Marrakech, Morocco",
              url: "https://amsirartrip.com/en/excursions/6",
            })
          ),
        }}
      />
      <ExcursionLayout
        excursionKey="excursion6"
        bookingId={6}
        imageSrc="/images/Excursions/Hot Air Balloon Ride.webp"
      />
    </>
  );
}
