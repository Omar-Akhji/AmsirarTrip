"use client";

import { useEffect, useReducer } from "react";
import { usePathname } from "@/i18n/routing";

interface NavProgressState {
  loading: boolean;
  progress: number;
}

type NavProgressAction =
  | { type: "start" }
  | { type: "complete" }
  | { type: "reset" }
  | { type: "tick"; delta: number };

function navProgressReducer(state: NavProgressState, action: NavProgressAction): NavProgressState {
  switch (action.type) {
    case "start":
      return { loading: true, progress: 10 };
    case "complete":
      return { loading: false, progress: 100 };
    case "reset":
      return { loading: false, progress: 0 };
    case "tick":
      return state.progress >= 90 ? state : { ...state, progress: state.progress + action.delta };
  }
}

export default function NavigationProgress() {
  const pathname = usePathname();
  const [state, dispatch] = useReducer(navProgressReducer, { loading: false, progress: 0 });

  // Reset loading when pathname changes (navigation complete)
  useEffect(() => {
    // Use microtasks to defer setState calls and avoid synchronous state updates
    Promise.resolve().then(() => {
      dispatch({ type: "complete" });
    });
    const timer = setTimeout(() => {
      dispatch({ type: "reset" });
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Intercept all link clicks BEFORE Next.js navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      // Check if it's a navigation link (not external, mailto, tel, or hash)
      if (link?.href) {
        const href = link.href;
        const currentOrigin = window.location.origin;
        const isExternal = !href.startsWith(currentOrigin);
        const isSpecial =
          href.startsWith("mailto:") || href.startsWith("tel:") || href.includes("#");
        const isSamePage = href === window.location.href;

        // Start loading for internal navigation links
        if (!isExternal && !isSpecial && !isSamePage) {
          dispatch({ type: "start" });
        }
      }
    };

    // Use capture phase to catch click before Next.js
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  // Animate progress
  useEffect(() => {
    if (!state.loading) return;

    const interval = setInterval(() => {
      dispatch({ type: "tick", delta: Math.random() * 10 });
    }, 200);

    return () => clearInterval(interval);
  }, [state.loading]);

  if (!state.loading) return null;

  return (
    <div className="fixed start-0 end-0 top-0 z-50 bg-zinc-200 block-1">
      <div
        className="bg-orange transition-all duration-200 ease-out block-full"
        style={{ width: `${state.progress}%` }}
      />
    </div>
  );
}
