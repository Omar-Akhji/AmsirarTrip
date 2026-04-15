"use client";

import { useEffect, useReducer, useRef } from "react";
import { usePathname } from "@/i18n/routing";

interface LoaderProps {
  fullscreen?: boolean;
  duration?: number;
}

type LoaderAction = { type: "show" } | { type: "hide" };

function loaderReducer(_state: boolean, action: LoaderAction): boolean {
  return action.type === "show";
}

function Loader({ fullscreen = true, duration = 800 }: LoaderProps) {
  // Start with loader visible on initial mount
  const [show, dispatch] = useReducer(loaderReducer, true);
  const pathname = usePathname();
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Copy ref values to local variables to ensure stable cleanup (ESLint best practice)
    const currentShowTimer = showTimerRef.current;
    const currentHideTimer = hideTimerRef.current;

    // 1. Clear any existing timers
    if (currentShowTimer) clearTimeout(currentShowTimer);
    if (currentHideTimer) clearTimeout(currentHideTimer);

    // 2. Logic to show/hide loader on pathname change or mount
    const handleTransition = () => {
      // Ensure loader is visible
      dispatch({ type: "show" });
      document.body.style.overflow = "hidden";

      // Set timer to hide it
      hideTimerRef.current = setTimeout(() => {
        dispatch({ type: "hide" });
        document.body.style.overflow = "";
      }, duration);
    };

    // We use a tiny delay for subsequent navigations if needed, 
    // but here we just trigger it immediately.
    handleTransition();

    return () => {
      // Use local variables for cleanup to satisfy exhaustive-deps
      if (currentShowTimer) clearTimeout(currentShowTimer);
      if (currentHideTimer) clearTimeout(currentHideTimer);
      // Ensure scroll is restored on unmount
      document.body.style.overflow = "";
    };
  }, [pathname, duration]);

  if (!show) return null;

  return (
    <div className={`ftco-loader show ${fullscreen ? "fullscreen" : ""}`}>
      <svg className="circular" width="48px" height="48px">
        <circle
          className="path-bg"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="4"
          stroke="var(--color-light-grey-alt2)"
        />
        <circle
          className="path"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
          stroke="var(--color-orange)"
        />
      </svg>
    </div>
  );
}

export default Loader;
