import { useTranslations } from "next-intl";
import { LegalSection } from "../types";

interface LegalSectionCardProps {
  section: LegalSection;
  index: number;
}

/**
 * LegalSectionCard Component
 * @description Renders a single section of a legal document
 */
export function LegalSectionCard({ section, index }: LegalSectionCardProps) {
  const t = useTranslations();

  return (
    <article
      id={`legal-${section.id}`}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition-shadow sm:p-8 pointer-fine:hover:shadow-md"
      aria-labelledby={`legal-${section.id}-heading`}
    >
      <h2
        id={`legal-${section.id}-heading`}
        className="mbe-4 flex items-center gap-3 text-lg font-semibold text-neutral-900 sm:text-xl"
      >
        <span className="flex shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white block-8 inline-8">
          {index + 1}
        </span>
        {t(section.titleKey)}
      </h2>
      <div className="prose prose-slate prose-sm max-inline-none">
        <p className="leading-relaxed text-neutral-600">{t(section.contentKey)}</p>
      </div>
    </article>
  );
}
