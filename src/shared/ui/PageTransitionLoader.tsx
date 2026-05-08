"use client";

import { useEffect, useReducer, useRef } from "react";
import { usePathname } from "@/i18n/routing";

interface PageTransitionLoaderProps {
  fullscreen?: boolean;
  duration?: number;
}

type LoaderAction = { type: "show" } | { type: "hide" };

function loaderReducer(_state: boolean, action: LoaderAction): boolean {
  return action.type === "show";
}

/**
 * Full-page transition loader that locks scroll on mount and pathname changes.
 */
export function PageTransitionLoader({
  fullscreen = true,
  duration = 800,
}: PageTransitionLoaderProps) {
  // Start with loader visible on initial mount
  const [show, dispatch] = useReducer(loaderReducer, true);
  const pathname = usePathname();
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Copy ref values to local variables to ensure stable cleanup
    const currentShowTimer = showTimerRef.current;
    const currentHideTimer = hideTimerRef.current;

    if (currentShowTimer) clearTimeout(currentShowTimer);
    if (currentHideTimer) clearTimeout(currentHideTimer);

    const handleTransition = () => {
      dispatch({ type: "show" });
      document.body.style.overflow = "hidden";

      hideTimerRef.current = setTimeout(() => {
        dispatch({ type: "hide" });
        document.body.style.overflow = "";
      }, duration);
    };

    handleTransition();

    return () => {
      if (currentShowTimer) clearTimeout(currentShowTimer);
      if (currentHideTimer) clearTimeout(currentHideTimer);
      document.body.style.overflow = "";
    };
  }, [pathname, duration]);

  if (!show) return null;

  return (
    <div
      className={`fixed z-[999999] flex items-center justify-center opacity-100 transition-opacity duration-400 ease-out ${
        fullscreen
          ? "inset-0 block-full inline-full bg-slate-100"
          : "top-1/2 left-1/2 block-24 inline-24 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/90 shadow-[0_24px_64px_rgba(0,0,0,0.24)]"
      }`}
    >
      <svg
        className="animate-loader-rotate block-12 inline-12 origin-center"
        width="48px"
        height="48px"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="4"
          stroke="var(--color-light-grey-alt2)"
        />
        <circle
          className="animate-loader-dash stroke-orange-500"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeDasharray="1 200"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
}
