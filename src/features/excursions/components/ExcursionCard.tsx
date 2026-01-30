"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { m } from "motion/react";
import { fadeInScale } from "@/lib/constants/animations";

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
      className="group relative mb-8 block h-117.5 cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out"
    >
      <div className="thumbnail relative h-100 overflow-hidden rounded-t-3xl bg-black">
        <Image
          src={excursion.image}
          alt={translations.alt}
          fill
          sizes="(max-width: 900px) 100vw, (max-width: 1149px) 50vw, 33vw"
          priority={idx < 2}
          className="block w-[120%] transform object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-60"
        />

        <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-orange-200 uppercase backdrop-blur-sm">
          {translations.category}
        </span>
      </div>

      <div className="post-content absolute bottom-0 box-border min-h-50 w-full rounded-b-3xl bg-white p-7.5 pb-24 transition-all duration-500 ease-out">
        <h3 className="m-0 mb-2 text-[1.3rem] leading-[1.2] font-bold tracking-[0.5px] text-orange-600">
          {translations.title}
        </h3>

        <p className="m-0 pb-1 text-xs font-medium tracking-[0.5px] text-orange-400 normal-case">
          {translations.tagline}
        </p>

        <p className="description max-h-0 overflow-hidden text-sm leading-[1.8em] text-gray-600 opacity-0 transition-[max-height,opacity] duration-500 ease-out group-hover:max-h-[6em] group-hover:opacity-100">
          {translations.description}
        </p>

        <Link
          href={excursion.route}
          className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 transform items-center rounded-[20px] border border-orange-600 bg-transparent px-4 py-2 font-medium text-orange-600 no-underline transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-lg hover:shadow-orange-500/30"
        >
          {translations.exploreLink}
        </Link>
      </div>
    </m.article>
  );
}
