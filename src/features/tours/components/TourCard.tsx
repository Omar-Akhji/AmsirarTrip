"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { m } from "motion/react";
import { ClockIcon } from "@/shared/ui/icons";
import { fadeInScale } from "@/lib/constants/animations";

interface TourCardProps {
  tour: {
    id: number;
    image: string;
    title: string;
    description: string;
    duration: number;
    start: string;
    end: string;
    route: string;
  };
  idx: number;
  translations: {
    title: string;
    description: string;
    durationLabel: string;
    featured: string;
    startLabelShort: string;
    endLabelShort: string;
    start: string;
    end: string;
    exploreLink: string;
  };
}

export function TourCard({ tour, idx, translations }: TourCardProps) {
  return (
    <m.article
      {...fadeInScale}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group relative mb-8 block h-117.5 cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out group-hover:min-h-135"
    >
      <div className="thumbnail relative h-100 overflow-hidden rounded-t-3xl bg-black">
        <Image
          src={tour.image}
          alt={translations.title}
          fill
          sizes="(max-width: 900px) 100vw, (max-width: 1149px) 50vw, 33vw"
          className="block w-[120%] transform object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-60 hover:scale-105 hover:opacity-90"
        />

        <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-orange-100 uppercase backdrop-blur-sm">
          {translations.featured}
        </span>
      </div>

      <div className="post-content absolute bottom-0 box-border min-h-50 w-full rounded-b-3xl bg-white p-7.5 pb-16 transition-all duration-500 ease-out">
        <div className="mb-3 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-[20px] border border-orange-600 bg-white/10 px-3 py-1 text-xs font-semibold text-orange-600 uppercase backdrop-blur-sm">
            <ClockIcon className="size-3 text-orange-600" />
            <time dateTime={`P${tour.duration}D`}>
              {translations.durationLabel}
            </time>
          </span>
        </div>

        <h3 className="m-0 mb-2 text-lg leading-[1.2] font-bold tracking-[0.5px] text-slate-900">
          {translations.title}
        </h3>

        <p className="description max-h-0 overflow-hidden text-sm leading-[1.8em] text-slate-600 opacity-0 transition-[max-height,opacity] duration-500 ease-out group-hover:max-h-[12em] group-hover:opacity-100">
          {translations.description}
        </p>

        <div className="mt-2 mb-2 grid grid-cols-2 gap-4 text-center text-sm text-slate-600">
          <div>
            <p className="text-xs tracking-[0.35em] text-slate-400 uppercase">
              {translations.startLabelShort}
            </p>
            <p className="mt-1 font-semibold text-slate-800">
              {translations.start}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.35em] text-slate-400 uppercase">
              {translations.endLabelShort}
            </p>
            <p className="mt-1 font-semibold text-slate-800">
              {translations.end}
            </p>
          </div>
        </div>

        <Link
          href={tour.route}
          className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 transform items-center rounded-[20px] border border-orange-600 bg-transparent px-4 py-2 font-medium text-orange-600 no-underline transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-lg"
        >
          {translations.exploreLink}
        </Link>
      </div>
    </m.article>
  );
}
