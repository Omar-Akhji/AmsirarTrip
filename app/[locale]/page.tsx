import { getTranslations } from "next-intl/server";
import HomeView from "@/components/sections/HomeView";
import { generateSEOMetadata, defaultKeywords } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return generateSEOMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: defaultKeywords,
    path: "",
    locale,
    image: "/images/Header/header-1.webp",
  });
}

export default function HomePage() {
  return <HomeView />;
}
