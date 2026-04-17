import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ExcursionLayout from "@/features/excursions/components/ExcursionLayout";
import { generateSEOMetadata } from "@/lib/metadata";
import { generateExcursionJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/shared/ui/JsonLd";
import {
  getExcursionSlugs,
  getExcursionBySlug,
} from "@/features/excursions/data/excursionsMetadata";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate static params for all excursions and locales
export async function generateStaticParams() {
  const locales = ["en", "fr", "de", "es"];
  const slugs = getExcursionSlugs();

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  
  // Find excursion with case-insensitive matching for robustness
  const slugs = getExcursionSlugs();
  const matchedSlug = slugs.find(s => s.toLowerCase() === slug.toLowerCase());
  const excursion = matchedSlug ? getExcursionBySlug(matchedSlug) : undefined;

  if (!excursion) {
    return {
      title: "Excursion Not Found",
    };
  }

  const t = await getTranslations({ locale });
  const keyPrefix = `excursion.list.${excursion.i18nKeyPrefix}`;

  return generateSEOMetadata({
    title: t(`${keyPrefix}.title`),
    description:
      t(`${keyPrefix}.description`) + " " + t(`${keyPrefix}.tagline`),
    keywords: excursion.keywords,
    path: `/excursions/${excursion.slug}`,
    locale,
    image: excursion.image,
    type: "article",
  });
}

// Enable Incremental Static Regeneration
export const revalidate = 3600; // Revalidate every hour

export default async function ExcursionPage({ params }: PageProps) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  
  // Find excursion with case-insensitive matching
  const slugs = getExcursionSlugs();
  const matchedSlug = slugs.find(s => s.toLowerCase() === slug.toLowerCase());
  const excursion = matchedSlug ? getExcursionBySlug(matchedSlug) : undefined;

  if (!excursion) {
    notFound();
  }

  // Generate structured data for this excursion
  const excursionJsonLd = generateExcursionJsonLd({
    name: excursion.jsonLd.name,
    description: excursion.jsonLd.description,
    provider: "Amsirar Trip",
    image: `https://amsirartrip.com${excursion.image}`,
    duration: excursion.duration,
    location: excursion.location,
    url: `https://amsirartrip.com/excursions/${excursion.slug}`,
  });

  return (
    <>
      <JsonLd
        id={`${excursion.excursionKey}-jsonld`}
        data={excursionJsonLd}
        isSync={true}
      />
      <ExcursionLayout
        excursionKey={excursion.excursionKey}
        bookingId={excursion.bookingId}
        imageSrc={excursion.image}
      />
    </>
  );
}
