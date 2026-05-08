import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/shared/layout/PageHeader";
import { LegalSectionCard } from "./LegalSectionCard";
import { LegalPageConfig } from "../types";

interface LegalPageLayoutProps {
  config: LegalPageConfig;
  headingId: string;
}

/**
 * LegalPageLayout Component
 * @description Reusable layout for legal pages (Privacy Policy, Terms of Service)
 */
export function LegalPageLayout({ config, headingId }: LegalPageLayoutProps) {
  const t = useTranslations();

  return (
    <>
      <PageHeader
        title={t(config.titleKey)}
        subtitle={t(config.subtitleKey)}
        headingId={headingId}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t(config.titleKey) },
        ]}
      />

      <main>
        <section
          className="relative isolate overflow-hidden bg-gray-50 py-16 text-gray-900 sm:py-24"
          aria-labelledby={headingId}
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.3),transparent_70%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto px-4 max-inline-7xl">
            {/* Last Updated Notice */}
            <div className="mbe-8 text-center text-sm text-gray-500">
              {t(config.lastUpdatedKey)}
            </div>

            {/* Legal Sections Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {config.sections.map((section, index) => (
                <LegalSectionCard
                  key={section.id}
                  section={section}
                  index={index}
                />
              ))}
            </div>

            {/* Back to Home Link */}
            <div className="mbs-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-orange-600 transition-colors pointer-fine:hover:text-orange-700"
              >
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                {t("legal.backToHome")}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
