"use client";

import { Link } from "@/i18n/routing";
import { useTranslation } from "@/lib/hooks/useTranslation";

export function FooterBrand() {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-1">
      <Link
        href="/"
        prefetch={true}
        className="group mbe-2 inline-flex items-center gap-1"
        aria-label="Amsirar Trip homepage"
      >
        <span className="text-3xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
          Amsirar
        </span>
        <span className="text-orange font-brand text-3xl transition-all duration-300 group-hover:text-amber-400">
          Trip
        </span>
      </Link>
      <span className="bg-orange mbe-6 block rounded block-1 inline-12" />
      <p className="font-fancy text-xl leading-relaxed text-slate-400 lg:max-inline-sm">
        {t("footer.description")}
      </p>
    </div>
  );
}
