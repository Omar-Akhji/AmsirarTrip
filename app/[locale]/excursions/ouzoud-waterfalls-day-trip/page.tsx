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
    title: t("excursion.list.ouzoud.title"),
    description:
      t("excursion.list.ouzoud.description") +
      " " +
      t("excursion.list.ouzoud.tagline"),
    keywords: [
      "Ouzoud Waterfalls",
      "Morocco waterfalls",
      "Ouzoud day trip",
      "Middle Atlas waterfalls",
      "Marrakech to Ouzoud",
      "Morocco nature tour",
      "Ouzoud macaques",
    ],
    path: "/excursions/1",
    locale,
    image: "/images/Excursions/Ouzoud Waterfalls.webp",
    type: "article",
  });
}

export default function Excursion1Page() {
  return (
    <>
      <Script
        id="excursion1-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateExcursionJsonLd({
              name: "Ouzoud Waterfalls Day Trip",
              description:
                "Journey to Morocco's tallest waterfalls, meet playful macaques, and cool off by the cascades.",
              provider: "AmsirarTrip",
              image:
                "https://amsirartrip.com/images/Excursions/Ouzoud Waterfalls.webp",
              duration: "P1D",
              location: "Ouzoud, Morocco",
              url: "https://amsirartrip.com/en/excursions/1",
            })
          ),
        }}
      />
      <ExcursionLayout
        excursionKey="excursion1"
        bookingId={1}
        imageSrc="/images/Excursions/Ouzoud Waterfalls.webp"
      />
    </>
  );
}
