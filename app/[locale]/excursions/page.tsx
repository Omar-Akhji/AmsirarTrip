import { getTranslations } from "next-intl/server";
import ExcursionView from "@/_components/sections/ExcursionsView";
import { generateSEOMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "excursion" });

  return generateSEOMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "Marrakech day trips",
      "Ouzoud Waterfalls",
      "Essaouira excursion",
      "Ourika Valley",
      "Imlil trekking",
      "Agafay Desert",
      "Morocco excursions",
      "Day tours from Marrakech",
    ],
    path: "/excursions",
    locale,
    image: "/images/Excursions/Excursion1.webp",
  });
}

export default function ExcursionPage() {
  return <ExcursionView />;
}
