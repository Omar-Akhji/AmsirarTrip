import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

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

export function TourCard({ tour, translations }: TourCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white p-2.5 shadow-xs ring-1 ring-zinc-100 transition-all duration-500 block-full pointer-fine:hover:-translate-y-2 pointer-fine:hover:shadow-2xl pointer-fine:hover:shadow-orange-900/5">
      <Link href={tour.route} className="absolute inset-0 z-20">
        <span className="sr-only">
          {translations.exploreLink} - {translations.title}
        </span>
      </Link>

      <div className="relative aspect-4/3 shrink-0 overflow-hidden rounded-[15px] bg-zinc-100 inline-full">
        <Image
          src={tour.image}
          alt={translations.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

        <div className="absolute start-4 top-4 z-10">
          <span className="inline-flex rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold tracking-widest text-orange-600 uppercase shadow-xs backdrop-blur-md">
            {tour.duration} Days
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pbs-8 pbe-6">
        <h3 className="mbe-4 line-clamp-2 text-xl leading-snug font-semibold text-zinc-900 transition-colors duration-300 text-shadow-md group-hover:text-orange-600">
          {translations.title}
        </h3>

        <p className="mbe-8 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600">
          {translations.description}
        </p>

        <div className="mbe-6 grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
              {translations.startLabelShort}
            </span>
            <span className="truncate font-bold text-zinc-900">
              {translations.start}
            </span>
          </div>
          <div className="flex flex-col border-s border-zinc-100 ps-4">
            <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
              {translations.endLabelShort}
            </span>
            <span className="truncate font-bold text-zinc-900">
              {translations.end}
            </span>
          </div>
        </div>

        <div className="mbs-auto flex items-center justify-between border-t border-zinc-100 pbs-5">
          <span className="font-bold tracking-wide text-orange-600">
            {translations.exploreLink}
          </span>
          <div className="flex items-center justify-center rounded-full bg-zinc-50 text-orange-600 transition-all duration-300 block-10 inline-10 group-hover:bg-orange-500 group-hover:text-white">
            <ArrowRight className="size-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </div>
        </div>
      </div>
    </article>
  );
}
