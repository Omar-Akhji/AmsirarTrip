import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "@/lib/metadata";

const PrivacyPolicyView = dynamic(() =>
  import("@/features/legal").then((mod) => ({ default: mod.PrivacyPolicyView })),
);

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
      "Amsirar Trip privacy policy",
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
