import ExcursionLayout from "@/components/sections/ExcursionLayout";
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

  return generateSEOMetadata({
    title: "Imlil & Toubkal Mountain Adventure from Marrakech",
    description:
      "Experience the High Atlas Mountains with a day trip to Imlil and Mount Toubkal. Hike scenic trails, meet Berber families, and enjoy panoramic views of Morocco's highest peak.",
    keywords: [
      "Imlil Morocco",
      "Mount Toubkal",
      "Atlas Mountains",
      "Berber villages",
      "Mountain hiking Morocco",
      "High Atlas trek",
      "Morocco adventure",
      "Mountain views Morocco",
    ],
    path: "/excursions/3",
    locale,
    image: "/images/Excursions/Ait Ben Haddou.webp",
    type: "article",
  });
}

export default function Excursion3Page() {
  return (
    <>
      <Script
        id="excursion3-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateExcursionJsonLd({
              name: "Imlil & Toubkal Mountain Adventure",
              description:
                "Experience the High Atlas Mountains with a day trip to Imlil and Mount Toubkal. Hike scenic trails, meet Berber families, and enjoy panoramic views of Morocco's highest peak.",
              provider: "AmsirarTrip",
              image:
                "https://amsirartrip.com/images/Excursions/Imlil & Toubkal.webp",
              duration: "P1D",
              location: "Imlil & Mount Toubkal, Morocco",
              url: "https://amsirartrip.com/en/excursions/3",
            })
          ),
        }}
      />
      <ExcursionLayout
        excursionKey="excursion3"
        bookingId={3}
        imageSrc="/images/Excursions/Imlil & Toubkal.webp"
      />
    </>
  );
}
