"use client";

import React, { useRef, useEffect, useId } from "react";
import { cn } from "@/lib/utils";

interface NativePopoverProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  id?: string;
}

/**
 * A native popover implementation using the Browser's Popover API.
 * This provides peak performance as it utilizes the top layer and compositor transitions.
 */
export function NativePopover({
  children,
  trigger,
  isOpen,
  onOpenChange,
  className,
  id: preferredId,
}: NativePopoverProps) {
  const generatedId = useId().replace(/:/g, "");
  const popoverId = preferredId || generatedId;
  const popoverRef = useRef<HTMLDivElement>(null);

  // Sync React state with Native Popover state
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;

    if (isOpen) {
      try {
        // Only show if not already showing (prevents throw)
        if (!popover.matches(":popover-open")) {
          popover.showPopover();
        }
      } catch (e) {
        console.warn("Popover error:", e);
      }
    } else {
      try {
        if (popover.matches(":popover-open")) {
          popover.hidePopover();
        }
      } catch {
        // Silently fail if already hidden
      }
    }
  }, [isOpen]);

  // Handle light-dismiss (clicking outside or pressing Escape)
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;

    const handleToggle = (event: Event) => {
      const toggleEvent = event as ToggleEvent;
      const newState = toggleEvent.newState === "open";
      if (newState !== isOpen) {
        onOpenChange(newState);
      }
    };

    popover.addEventListener("toggle", handleToggle);
    return () => popover.removeEventListener("toggle", handleToggle);
  }, [isOpen, onOpenChange]);

  return (
    <>
      {/* Trigger Button */}
      <div className="relative inline-full">
        <div onClick={() => onOpenChange(!isOpen)}>
          {trigger}
        </div>

        {/* Popover Element */}
        <div
          ref={popoverRef}
          id={popoverId}
          popover="auto"
          className={cn(
            "m-0 border-none bg-transparent p-0 outline-none backdrop:bg-black/20",
            /* Base styles for visibility management */
            "fixed inset-auto", 
            className
          )}
        >
          {isOpen && children}
        </div>
      </div>
    </>
  );
}
