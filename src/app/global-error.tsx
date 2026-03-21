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
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 font-sans">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">
          A Critical Error Occurred
        </h2>
        <p className="mb-6 max-w-md text-center text-slate-600">
          We apologize for the inconvenience. Our team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-md bg-orange-600 px-6 py-2 font-medium text-white transition-colors hover:bg-orange-700"
        >
          Try to Recover
        </button>
      </body>
    </html>
  );
}
