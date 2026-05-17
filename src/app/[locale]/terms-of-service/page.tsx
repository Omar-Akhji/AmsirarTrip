import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "@/lib/metadata";

const TermsOfServiceView = dynamic(() =>
  import("@/features/legal").then((mod) => ({ default: mod.TermsOfServiceView })),
);

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
      "Amsirar Trip terms of service",
      "Morocco travel terms",
      "tour booking conditions",
      "travel agency terms",
    ],
    path: "/terms-of-service",
    locale,
    type: "website",
    noIndex: true,
  });
}

export default function TermsOfServicePage() {
  return <TermsOfServiceView />;
}
