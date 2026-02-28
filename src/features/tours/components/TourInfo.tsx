"use client";

import { Check } from "lucide-react";

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
        <div>
          <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
            {includedTitle}
          </h2>
          <div className="rounded-lg border border-green-200 bg-green-50 p-6">
            <ul className="space-y-2">
              {includes.split("\n").map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="flex-1 text-left text-sm text-gray-700 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Excludes */}
      {excludes && (
        <div>
          <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
            {excludedTitle}
          </h2>
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <ul className="space-y-2">
              {excludes.split("\n").map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    ✕
                  </span>
                  <span className="flex-1 text-left text-sm text-gray-700 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Good to Know */}
      {goodToKnow && (
        <div>
          <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
            {goodToKnowTitle}
          </h2>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <ul className="space-y-2">
              {goodToKnow.split("\n").map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    i
                  </span>
                  <span className="flex-1 text-left text-sm text-gray-700 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
