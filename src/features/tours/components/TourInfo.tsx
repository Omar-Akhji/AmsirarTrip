"use client";

import { Check } from "lucide-react";
import { m } from "motion/react";
import { fadeInUp } from "@/lib/constants/animations";

interface TourInfoProps {
  includes: string;
  excludes: string;
  goodToKnow: string;
  includedTitle: string;
  excludedTitle: string;
  goodToKnowTitle: string;
}

export default function TourInfo({
  includes,
  excludes,
  goodToKnow,
  includedTitle,
  excludedTitle,
  goodToKnowTitle,
}: TourInfoProps) {
  return (
    <>
      {/* Includes */}
      {includes && (
        <m.div {...fadeInUp}>
          <h2 className="mbe-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
            {includedTitle}
          </h2>
          <div className="rounded-lg border border-green-200 bg-green-50 p-6">
            <ul className="space-y-2">
              {includes.split("\n").map((item: string, idx: number) => (
                <m.li
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="mbs-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="flex-1 text-start text-sm text-gray-700 sm:text-base">
                    {item}
                  </span>
                </m.li>
              ))}
            </ul>
          </div>
        </m.div>
      )}

      {/* Excludes */}
      {excludes && (
        <m.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="mbe-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
            {excludedTitle}
          </h2>
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <ul className="space-y-2">
              {excludes.split("\n").map((item: string, idx: number) => (
                <m.li
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="mbs-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    ✕
                  </span>
                  <span className="flex-1 text-start text-sm text-gray-700 sm:text-base">
                    {item}
                  </span>
                </m.li>
              ))}
            </ul>
          </div>
        </m.div>
      )}

      {/* Good to Know */}
      {goodToKnow && (
        <m.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="mbe-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
            {goodToKnowTitle}
          </h2>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <ul className="space-y-2">
              {goodToKnow.split("\n").map((item: string, idx: number) => (
                <m.li
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="mbs-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    i
                  </span>
                  <span className="flex-1 text-start text-sm text-gray-700 sm:text-base">
                    {item}
                  </span>
                </m.li>
              ))}
            </ul>
          </div>
        </m.div>
      )}
    </>
  );
}
