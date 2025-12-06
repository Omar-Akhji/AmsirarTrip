import { getTranslations } from "next-intl/server";
import ContactView from "@/components/sections/ContactView";
import { generateSEOMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return generateSEOMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "Contact Morocco tours",
      "AmsirarTrip contact",
      "Morocco travel inquiry",
      "Book Morocco tour",
      "Marrakech tour booking",
    ],
    path: "/contact",
    locale,
    type: "website",
  });
}

export default function ContactPage() {
  return <ContactView />;
}
