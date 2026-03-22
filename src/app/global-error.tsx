"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-block-screen flex-col items-center justify-center bg-slate-50 font-sans">
        <h2 className="mbe-4 text-2xl font-bold text-slate-800">
          A Critical Error Occurred
        </h2>
        <p className="mbe-6 max-inline-md text-center text-slate-600">
          We apologize for the inconvenience. Our team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-md bg-orange-600 px-6 py-2 font-medium text-white transition-colors pointer-fine:hover:bg-orange-700"
        >
          Try to Recover
        </button>
      </body>
    </html>
  );
}
