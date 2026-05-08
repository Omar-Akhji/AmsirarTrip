import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import TourLayout from "@/features/tours/components/TourLayout";
import { generateSEOMetadata } from "@/lib/metadata";
import { generateTourJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/shared/ui/JsonLd";
import {
  getTourSlugs,
  getTourBySlug,
} from "@/features/tours/data/toursMetadata";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate static params for all tours
export async function generateStaticParams() {
  return getTourSlugs().map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {};
  }

  const t = await getTranslations({ locale });

  return generateSEOMetadata({
    title: `${t(tour.tourKey + ".title")} (${tour.durationDays} Days)`,
    description:
      t("tours." + tour.tourKey + ".description") +
      " " +
      t(tour.tourKey + ".overview"),
    keywords: tour.keywords,
    path: `/tours/${slug}`,
    locale,
    image: tour.image,
    type: "article",
    publishedTime: "2024-01-15T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    author: "Amsirar Trip",
  });
}

// Enable Incremental Static Regeneration
export const revalidate = 3600; // Revalidate every hour

export default async function TourPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  // Generate structured data for this tour
  const tourJsonLd = generateTourJsonLd({
    name: tour.jsonLd.name,
    description: tour.jsonLd.description,
    provider: "Amsirar Trip",
    image: `https://amsirartrip.com${tour.image}`,
    price: tour.jsonLd.price,
    currency: tour.jsonLd.currency,
    duration: tour.duration,
    location: { start: tour.startLocation, end: tour.endLocation },
    url: `https://amsirartrip.com/tours/${slug}`,
  });

  return (
    <>
      <JsonLd id={`${tour.tourKey}-jsonld`} data={tourJsonLd} isSync={true} />
      <TourLayout
        tourKey={tour.tourKey}
        bookingId={tour.bookingId}
        imageSrc={tour.image}
      />
    </>
  );
}
