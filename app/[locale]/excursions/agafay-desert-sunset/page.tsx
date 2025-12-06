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
    title: t("excursion.list.ourika.title"),
    description:
      t("excursion.list.ourika.description") +
      " " +
      t("excursion.list.ourika.tagline"),
    keywords: [
      "Ourika Valley",
      "Setti Fatma waterfalls",
      "Berber villages Morocco",
      "Ourika day trip",
      "Atlas Mountains tour",
      "Argan cooperative",
      "Morocco mountain valley",
    ],
    path: "/excursions/5",
    locale,
    image: "/images/Excursions/Ourika Valley.webp",
    type: "article",
  });
}

export default function Excursion5Page() {
  return (
    <>
      <Script
        id="excursion5-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateExcursionJsonLd({
              name: "Agafay Desert Sunset Experience",
              description:
                "Ride camels or quads across the stony dunes, then dine under the stars with live music.",
              provider: "AmsirarTrip",
              image: "https://amsirartrip.com/images/Excursions/Agafay.webp",
              duration: "P1D",
              location: "Agafay Desert, Morocco",
              url: "https://amsirartrip.com/en/excursions/5",
            })
          ),
        }}
      />
      <ExcursionLayout
        excursionKey="excursion5"
        bookingId={5}
        imageSrc="/images/Excursions/Agafay.webp"
      />
    </>
  );
}
