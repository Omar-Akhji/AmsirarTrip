"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface OverlayContextType {
  activeId: string | null;
  openOverlay: (id: string) => void;
  closeOverlay: () => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const openOverlay = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const closeOverlay = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <OverlayContext.Provider value={{ activeId, openOverlay, closeOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}
