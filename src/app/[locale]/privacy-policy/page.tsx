import { getTranslations } from "next-intl/server";
import { PrivacyPolicyView } from "@/features/legal";
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
    title: t("privacy.meta.title"),
    description: t("privacy.meta.description"),
    keywords: [
      "AmsirarTrip privacy policy",
      "Morocco travel privacy",
      "data protection Morocco tours",
      "travel agency privacy",
    ],
    path: "/privacy-policy",
    locale,
    type: "website",
    noIndex: true,
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}
