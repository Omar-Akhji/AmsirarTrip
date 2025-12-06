import { getTranslations } from "next-intl/server";
import ToursView from "@/components/sections/ToursView";
import { generateSEOMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });

  return generateSEOMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "Morocco multi-day tours",
      "Sahara desert tours",
      "Merzouga tours",
      "Atlas Mountains tours",
      "Imperial cities tour",
      "Morocco adventure tours",
      "Desert camping Morocco",
      "Marrakech to Fes tour",
    ],
    path: "/tours",
    locale,
    image: "/images/Tours/Tour1.webp",
  });
}

export default function ToursPage() {
  return <ToursView />;
}
