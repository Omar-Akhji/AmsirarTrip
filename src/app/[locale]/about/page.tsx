import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "@/lib/metadata";
import { Metadata } from "next";

const AboutView = dynamic(() => import("@/features/about/components/AboutView"));

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
      "Amsirar Trip about",
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
