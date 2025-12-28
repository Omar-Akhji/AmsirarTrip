import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Script from "next/script";
import ExcursionLayout from "@/features/excursions/components/ExcursionLayout";
import { generateSEOMetadata } from "@/lib/metadata";
import { generateExcursionJsonLd } from "@/lib/structuredData";
import {
  getExcursionSlugs,
  getExcursionBySlug,
} from "@/features/excursions/data/excursionsMetadata";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate static params for all excursions
export async function generateStaticParams() {
  return getExcursionSlugs().map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const excursion = getExcursionBySlug(slug);

  if (!excursion) {
    return {};
  }

  const t = await getTranslations({ locale });
  const keyPrefix = `excursion.list.${excursion.i18nKeyPrefix}`;

  return generateSEOMetadata({
    title: t(`${keyPrefix}.title`),
    description:
      t(`${keyPrefix}.description`) + " " + t(`${keyPrefix}.tagline`),
    keywords: excursion.keywords,
    path: `/${locale}/excursions/${slug}`,
    locale,
    image: excursion.image,
    type: "article",
  });
}

export default async function ExcursionPage({ params }: PageProps) {
  const { slug } = await params;
  const excursion = getExcursionBySlug(slug);

  if (!excursion) {
    notFound();
  }

  return (
    <>
      <Script
        id={`${excursion.excursionKey}-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateExcursionJsonLd({
              name: excursion.jsonLd.name,
              description: excursion.jsonLd.description,
              provider: "AmsirarTrip",
              image: `https://amsirartrip.com${excursion.image}`,
              duration: excursion.duration,
              location: excursion.location,
              url: `https://amsirartrip.com/en/excursions/${slug}`,
            })
          ),
        }}
      />
      <ExcursionLayout
        excursionKey={excursion.excursionKey}
        bookingId={excursion.bookingId}
        imageSrc={excursion.image}
      />
    </>
  );
}
