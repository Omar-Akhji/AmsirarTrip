"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { m } from "motion/react";
import { fadeInScale } from "@/lib/constants/animations";
import { ArrowRight } from "lucide-react";

interface ExcursionCardProps {
  excursion: {
    id: number;
    image: string;
    route: string;
    alt: string;
    title: string;
    tagline: string;
    description: string;
  };
  idx: number;
  translations: {
    alt: string;
    title: string;
    tagline: string;
    description: string;
    category: string;
    exploreLink: string;
  };
}

export function ExcursionCard({
  excursion,
  idx,
  translations,
}: ExcursionCardProps) {
  return (
    <m.article
      {...fadeInScale}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white p-2.5 shadow-sm ring-1 ring-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/5"
    >
      <Link href={excursion.route} className="absolute inset-0 z-20">
        <span className="sr-only">
          {translations.exploreLink} - {translations.title}
        </span>
      </Link>

      <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-[15px] bg-slate-100">
        <Image
          src={excursion.image}
          alt={translations.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={idx < 2}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold tracking-widest text-orange-600 uppercase shadow-sm backdrop-blur-md">
            {translations.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-8 pb-6">
        <h3 className="mb-2 line-clamp-2 text-xl leading-snug font-bold text-slate-900 transition-colors duration-300 group-hover:text-orange-600">
          {translations.title}
        </h3>

        <p className="mb-4 text-sm font-semibold tracking-wide text-orange-500 uppercase">
          {translations.tagline}
        </p>

        <p className="mb-8 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {translations.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
          <span className="font-bold tracking-wide text-orange-600">
            {translations.exploreLink}
          </span>
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
            <ArrowRight className="size-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </div>
        </div>
      </div>
    </m.article>
  );
}
