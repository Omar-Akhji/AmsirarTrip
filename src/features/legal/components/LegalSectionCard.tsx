"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { LegalSection } from "../types";
import { fadeInUp } from "@/lib/constants/animations";

interface LegalSectionCardProps {
  section: LegalSection;
  index: number;
}

/**
 * LegalSectionCard Component
 * @description Renders a single section of a legal document with animation
 */
export function LegalSectionCard({ section, index }: LegalSectionCardProps) {
  const t = useTranslations();

  return (
    <motion.article
      {...fadeInUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      id={`legal-${section.id}`}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
      aria-labelledby={`legal-${section.id}-heading`}
    >
      <h2
        id={`legal-${section.id}-heading`}
        className="mb-4 flex items-center gap-3 text-lg font-bold text-gray-900 sm:text-xl"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
          {index + 1}
        </span>
        {t(section.titleKey)}
      </h2>
      <div className="prose prose-slate prose-sm max-w-none">
        <p className="leading-relaxed text-gray-600">{t(section.contentKey)}</p>
      </div>
    </motion.article>
  );
}
