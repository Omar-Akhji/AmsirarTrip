"use client";

import { Link } from "@/i18n/routing";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { m } from "motion/react";
import { fadeInUp } from "@/lib/constants/animations";

export function FooterBrand() {
  const { t } = useTranslation();

  return (
    <m.div {...fadeInUp} className="lg:col-span-1">
      <Link
        href="/"
        prefetch={true}
        className="group mb-2 inline-flex items-center gap-1"
        aria-label="Amsirar Trip homepage"
      >
        <span className="text-3xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
          Amsirar
        </span>
        <span className="text-orange font-brand text-3xl transition-all duration-300 group-hover:text-amber-400">
          Trip
        </span>
      </Link>
      <span className="bg-orange mb-6 block h-1 w-12 rounded" />
      <p className="font-fancy text-xl leading-relaxed text-slate-400 lg:max-w-sm">
        {t("footer.description")}
      </p>
    </m.div>
  );
}
