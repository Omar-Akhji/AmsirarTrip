"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Custom hook to detect media query matches using React 18's useSyncExternalStore
 * @param query - The media query string (e.g., '(max-width: 1023px)')
 * @returns boolean - True if the media query matches, false otherwise.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") return () => {};
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => {
    return false;
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
