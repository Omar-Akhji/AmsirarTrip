import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Script from "next/script";
import TourLayout from "@/features/tours/components/TourLayout";
import { generateSEOMetadata } from "@/lib/metadata";
import { generateTourJsonLd } from "@/lib/structuredData";
import { sanitizeJsonLd } from "@/lib/sanitize";
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
    title: `${t(tour.tourKey + ".title")} - ${tour.durationDays} Day Morocco Tour`,
    description:
      t("tours." + tour.tourKey + ".description") +
      " " +
      t(tour.tourKey + ".overview"),
    keywords: tour.keywords,
    path: `/${locale}/tours/${slug}`,
    locale,
    image: tour.image,
    type: "article",
    publishedTime: "2024-01-15T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    author: "AmsirarTrip",
  });
}

export default async function TourPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <>
      <Script
        id={`${tour.tourKey}-jsonld`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            generateTourJsonLd({
              name: tour.jsonLd.name,
              description: tour.jsonLd.description,
              provider: "AmsirarTrip",
              image: `https://amsirartrip.com${tour.image}`,
              price: tour.jsonLd.price,
              currency: tour.jsonLd.currency,
              duration: tour.duration,
              startLocation: tour.startLocation,
              endLocation: tour.endLocation,
              url: `https://amsirartrip.com/tours/${slug}`,
            })
          ),
        }}
      />
      <TourLayout
        tourKey={tour.tourKey}
        bookingId={tour.bookingId}
        imageSrc={tour.image}
      />
    </>
  );
}
