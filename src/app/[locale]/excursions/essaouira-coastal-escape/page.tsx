import ExcursionLayout from "@/features/excursions/components/ExcursionLayout";
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
    title: t("excursion.list.essaouira.title"),
    description:
      t("excursion.list.essaouira.description") +
      " " +
      t("excursion.list.essaouira.tagline"),
    keywords: [
      "Essaouira day trip",
      "Essaouira from Marrakech",
      "Morocco coastal tour",
      "Essaouira medina",
      "Atlantic coast Morocco",
      "Essaouira beach",
      "Morocco port city",
    ],
    path: "/excursions/2",
    locale,
    image: "/images/Excursions/Essaouira.webp",
    type: "article",
  });
}

export default function Excursion2Page() {
  return (
    <>
      <Script
        id="excursion2-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateExcursionJsonLd({
              name: "Essaouira Coastal Escape",
              description:
                "Stroll the fortified medina, watch blue fishing boats in the harbor, and enjoy ocean-fresh seafood.",
              provider: "AmsirarTrip",
              image: "https://amsirartrip.com/images/Excursions/Essaouira.webp",
              duration: "P1D",
              location: "Essaouira, Morocco",
              url: "https://amsirartrip.com/en/excursions/2",
            })
          ),
        }}
      />
      <ExcursionLayout
        excursionKey="excursion2"
        bookingId={2}
        imageSrc="/images/Excursions/Essaouira.webp"
      />
    </>
  );
}
