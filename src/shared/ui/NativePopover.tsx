"use client";

import React, { useRef, useEffect, useId, useCallback } from "react";
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
 * Includes dynamic anchoring to keep the popover positioned relative to its trigger.
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
  const popoverRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const positionPopover = useCallback(() => {
    const popover = popoverRef.current;
    const triggerEl = triggerRef.current;
    if (!popover || !triggerEl || !isOpen) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Default positioning: Below the trigger
    let top = triggerRect.bottom + 8;
    let left = triggerRect.left;

    // Wait for the next frame to measure popover dimensions if needed
    // But for most calendars, we can assume a standard size or use a more robust check
    const popoverWidth = 340; // Approximate width of the calendar
    const popoverHeight = 400; // Approximate height

    // Horizontal overflow check
    if (left + popoverWidth > viewportWidth) {
      left = Math.max(8, viewportWidth - popoverWidth - 16);
    }

    // Vertical overflow check (show above if no space below)
    if (top + popoverHeight > viewportHeight && triggerRect.top > popoverHeight) {
      top = triggerRect.top - popoverHeight - 8;
    }

    popover.style.position = "fixed";
    popover.style.margin = "0";
    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  }, [isOpen]);

  // Sync React state with Native Popover state and position it
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;

    if (isOpen) {
      try {
        if (!popover.matches(":popover-open")) {
          popover.showPopover();
          // Position immediately after showing
          positionPopover();
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
  }, [isOpen, positionPopover]);

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

  // Keep anchored on resize or scroll
  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("resize", positionPopover);
    window.addEventListener("scroll", positionPopover, { capture: true });

    return () => {
      window.removeEventListener("resize", positionPopover);
      window.removeEventListener("scroll", positionPopover, { capture: true });
    };
  }, [isOpen, positionPopover]);

  return (
    <div className="relative inline-block w-full">
      {/* Trigger Container */}
      <div 
        ref={triggerRef} 
        className="w-full"
        onClick={() => onOpenChange(!isOpen)}
      >
        {trigger}
      </div>

      {/* Popover Element using Dialog tag */}
      <dialog
        ref={popoverRef}
        id={popoverId}
        popover="auto"
        className={cn(
          "m-0 border-none bg-transparent p-0 outline-none backdrop:bg-black/20",
          /* inset-auto is critical for manual positioning in top layer */
          "fixed inset-auto", 
          className
        )}
      >
        {isOpen && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            {children}
          </div>
        )}
      </dialog>
    </div>
  );
}
