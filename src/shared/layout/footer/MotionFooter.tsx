"use client";

import { m } from "motion/react";
import { fadeIn } from "@/lib/constants/animations";

export function MotionFooter({ children }: { children: React.ReactNode }) {
  return (
    <m.footer
      {...fadeIn}
      className="border-orange relative z-10 mt-0 box-border w-full overflow-hidden border-t-4 bg-slate-950 pt-6 text-left leading-[1.6] text-white shadow-[0_-8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/5 sm:pt-8"
      role="contentinfo"
    >
      {children}
    </m.footer>
  );
}
