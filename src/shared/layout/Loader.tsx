"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "@/i18n/routing";

interface LoaderProps {
  fullscreen?: boolean;
  autoHide?: boolean;
  duration?: number;
}

const Loader: React.FC<LoaderProps> = ({
  fullscreen = true,
  autoHide = true,
  duration = 800,
}) => {
  // Start with loader hidden to avoid blocking LCP on initial page load
  // Loader will show only during navigation transitions
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  // Show loader on initial load and hide after duration
  useEffect(() => {
    // Prevent scrolling while loader is visible
    document.body.style.overflow = "hidden";

    if (autoHide) {
      const timer = setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "";
      }, duration);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [autoHide, duration]);

  // Show loader when pathname changes
  useEffect(() => {
    // Use a microtask to defer the setState call and avoid synchronous state updates
    Promise.resolve().then(() => setShow(true));
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, duration);

    return () => {
      clearTimeout(timer);
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
          stroke="#e2e8f0"
        />
        <circle
          className="path"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
          stroke="#e54a1f"
        />
      </svg>
    </div>
  );
};

export default Loader;
