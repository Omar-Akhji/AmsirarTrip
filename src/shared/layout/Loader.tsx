"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/routing";

interface LoaderProps {
  fullscreen?: boolean;
  duration?: number;
}

function Loader({ fullscreen = true, duration = 800 }: LoaderProps) {
  // Start with loader visible on initial mount to cover hydration shifts
  const [show, setShow] = useState(true);
  const pathname = usePathname();

  // Initial load auto-hide
  useEffect(() => {
    // Prevent scrolling while loader is visible
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [duration]);

  // Show loader when pathname changes (navigation)
  useEffect(() => {
    // Defer to avoid synchronous state update during render
    const showTimer = setTimeout(() => {
      setShow(true);
      document.body.style.overflow = "hidden";
    }, 0);

    const hideTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, [pathname, duration]);

  if (!show) return null;

  return (
    <div id="ftco-loader" className={`show ${fullscreen ? "fullscreen" : ""}`}>
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
