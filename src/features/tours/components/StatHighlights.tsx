"use client";

import { m } from "motion/react";
import { fadeInUp } from "@/lib/constants/animations";

interface Stat {
  id: string;
  value: string;
  label: string;
  description: string;
}

interface StatHighlightsProps {
  stats: Stat[];
}

export function StatHighlights({ stats }: StatHighlightsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, idx) => (
        <m.article
          key={stat.id}
          {...fadeInUp}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="rounded-3xl border border-orange-100 bg-white px-6 py-6 shadow-lg shadow-orange-100/70"
        >
          <p className="text-4xl font-bold text-orange-600">{stat.value}</p>
          <h3 className="mbs-3 text-lg font-semibold text-slate-900">
            {stat.label}
          </h3>
          <p className="mbs-2 text-sm text-taupe-600">{stat.description}</p>
        </m.article>
      ))}
    </div>
  );
}
