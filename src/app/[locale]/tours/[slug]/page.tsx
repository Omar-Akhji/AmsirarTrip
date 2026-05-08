import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import TourLayout from "@/features/tours/components/TourLayout";
import { generateSEOMetadata } from "@/lib/metadata";
import { generateFaqJsonLd, generateTourJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/shared/ui/JsonLd";
import {
  getTourSlugs,
  getTourBySlug,
} from "@/features/tours/data/toursMetadata";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const CONTENT_LAST_MODIFIED = "2026-05-08T00:00:00Z";

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

  const isEnglish = locale === "en";
  const t = await getTranslations({ locale });
  const keywords = Array.from(
    new Set([
      tour.seo.primaryKeyword,
      ...tour.seo.secondaryKeywords,
      ...tour.keywords,
    ]),
  ).slice(0, 15);

  return generateSEOMetadata({
    title: isEnglish
      ? tour.seo.title
      : `${t(`${tour.tourKey}.title`)} (${tour.durationDays} ${t("tours.days")})`,
    description: isEnglish
      ? tour.seo.metaDescription
      : `${t("tours." + tour.tourKey + ".description")} ${t(`${tour.tourKey}.overview`)}`,
    keywords: isEnglish ? keywords : tour.keywords,
    path: `/tours/${slug}`,
    locale,
    image: tour.image,
    type: "article",
    publishedTime: "2024-01-15T00:00:00Z",
    modifiedTime: CONTENT_LAST_MODIFIED,
    author: "Amsirar Trip",
  });
}

// Enable Incremental Static Regeneration
export const revalidate = 3600; // Revalidate every hour

export default async function TourPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const t = await getTranslations({ locale });
  const itinerary = Array.from({ length: tour.durationDays }, (_, index) => {
    const dayNumber = index + 1;
    const dayKey = `${tour.tourKey}.day${dayNumber}`;
    let name = `Day ${dayNumber}`;
    let description = "";

    try {
      name = t(`${dayKey}.title`);
    } catch {
      // Keep the stable fallback when a localized day title is unavailable.
    }

    try {
      const dayText = t.raw(`${dayKey}.text`);
      if (Array.isArray(dayText)) {
        description = dayText.slice(0, 2).join(" ");
      }
    } catch {
      // JSON-LD descriptions are helpful, not required.
    }

    return {
      position: dayNumber,
      name: `Day ${dayNumber}: ${name}`,
      description,
    };
  });

  // Generate structured data for this tour
  const tourJsonLd = generateTourJsonLd({
    name: tour.jsonLd.name,
    description: tour.seo.lead || tour.jsonLd.description,
    provider: "Amsirar Trip",
    image: `https://amsirartrip.com${tour.image}`,
    price: tour.jsonLd.price,
    currency: tour.jsonLd.currency,
    duration: tour.duration,
    location: { start: tour.startLocation, end: tour.endLocation },
    url: `https://amsirartrip.com/tours/${slug}`,
    itinerary,
  });
  const faqJsonLd = generateFaqJsonLd(tour.seo.faqs);

  return (
    <>
      <JsonLd id={`${tour.tourKey}-jsonld`} data={tourJsonLd} isSync={true} />
      <JsonLd id={`${tour.tourKey}-faq-jsonld`} data={faqJsonLd} />
      <TourLayout
        tourKey={tour.tourKey}
        bookingId={tour.bookingId}
        imageSrc={tour.image}
        seo={tour.seo}
      />
    </>
  );
}
