"use client";

import { useSyncExternalStore } from "react";

/**
 * Custom hook to detect media query matches using React 18's useSyncExternalStore
 * @param query - The media query string (e.g., '(max-width: 1023px)')
 * @returns boolean - True if the media query matches, false otherwise.
 */
const getServerSnapshot = () => {
  return false;
};

export function useMediaQuery(query: string): boolean {
  // Manual useCallback removed - React Compiler handles this automatically
  const subscribe = (callback: () => void) => {
    if (globalThis.window === undefined) return () => {};
    const matchMedia = globalThis.matchMedia(query);
    matchMedia.addEventListener("change", callback);
    return () => {
      matchMedia.removeEventListener("change", callback);
    };
  };

  const getSnapshot = () => {
    if (globalThis.window === undefined) return false;
    return globalThis.matchMedia(query).matches;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
