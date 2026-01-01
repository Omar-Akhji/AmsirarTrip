import { getTranslations } from "next-intl/server";
import { TermsOfServiceView } from "@/features/legal";
import { generateSEOMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return generateSEOMetadata({
    title: t("terms.meta.title"),
    description: t("terms.meta.description"),
    keywords: [
      "AmsirarTrip terms of service",
      "Morocco travel terms",
      "tour booking conditions",
      "travel agency terms",
    ],
    path: "/terms-of-service",
    locale,
    type: "website",
  });
}

export default function TermsOfServicePage() {
  return <TermsOfServiceView />;
}
