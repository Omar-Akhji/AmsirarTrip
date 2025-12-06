import { getTranslations } from "next-intl/server";
import AboutView from "@/components/sections/AboutView";
import { generateSEOMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return generateSEOMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "Morocco travel agency",
      "AmsirarTrip about",
      "Morocco tour company",
      "20 years experience Morocco tours",
      "Marrakech travel agency",
      "Authentic Morocco tours",
    ],
    path: "/about",
    locale,
    image: "/images/Home/about.webp",
    type: "website",
  });
}

export default function AboutPage() {
  return <AboutView />;
}
