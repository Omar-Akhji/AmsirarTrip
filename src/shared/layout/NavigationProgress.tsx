"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/routing";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset loading when pathname changes (navigation complete)
  useEffect(() => {
    // Use microtasks to defer setState calls and avoid synchronous state updates
    Promise.resolve().then(() => {
      setLoading(false);
      setProgress(100);
    });
    const timer = setTimeout(() => {
      setProgress(0);
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
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.includes("#");
        const isSamePage = href === window.location.href;

        // Start loading for internal navigation links
        if (!isExternal && !isSpecial && !isSamePage) {
          setLoading(true);
          setProgress(10);
        }
      }
    };

    // Use capture phase to catch click before Next.js
    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  // Animate progress
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 h-1 bg-slate-200">
      <div
        className="bg-orange h-full transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
