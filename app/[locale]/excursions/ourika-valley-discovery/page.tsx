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
      "Ourika day trip",
      "Marrakech mountains",
      "Agafay sunset",
      "Desert dinner Morocco",
      "Camel ride Agafay",
      "Quad biking Agafay",
    ],
    path: "/excursions/4",
    locale,
    image: "/images/Excursions/Agafay Desert.webp",
    type: "article",
  });
}

export default function Excursion4Page() {
  return (
    <>
      <Script
        id="excursion4-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateExcursionJsonLd({
              name: "Ourika Valley Discovery",
              description:
                "Explore Berber villages, visit an argan cooperative, and hike to the Setti Fatma waterfalls.",
              provider: "AmsirarTrip",
              image:
                "https://amsirartrip.com/images/Excursions/Ourika_Valley.webp",
              duration: "P1D",
              location: "Ourika Valley, Morocco",
              url: "https://amsirartrip.com/en/excursions/4",
            })
          ),
        }}
      />
      <ExcursionLayout
        excursionKey="excursion4"
        bookingId={4}
        imageSrc="/images/Excursions/Ourika_Valley.webp"
      />
    </>
  );
}
