"use client";

import React, { useCallback, useEffect, useId, useRef } from "react";
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
  const generatedId = useId().replaceAll(":", "");
  const popoverId = preferredId || generatedId;
  const popoverRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const onOpenChangeRef = useRef(onOpenChange);

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

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

    const popoverWidth = 340;
    const popoverHeight = 400;

    if (left + popoverWidth > viewportWidth) {
      left = Math.max(8, viewportWidth - popoverWidth - 16);
    }

    if (top + popoverHeight > viewportHeight && triggerRect.top > popoverHeight) {
      top = triggerRect.top - popoverHeight - 8;
    }

    Object.assign(popover.style, {
      position: "fixed",
      margin: "0",
      top: `${top}px`,
      left: `${left}px`,
    });
  }, [isOpen]);

  const positionPopoverHandlerRef = useRef(positionPopover);

  useEffect(() => {
    positionPopoverHandlerRef.current = positionPopover;
  }, [positionPopover]);

  // Sync React state with Native Popover state and position it
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;

    if (isOpen) {
      try {
        if (!popover.matches(":popover-open")) {
          popover.showPopover();
          positionPopover();
        }
      } catch (error) {
        console.warn("Popover error:", error);
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
        onOpenChangeRef.current(newState);
      }
    };

    popover.addEventListener("toggle", handleToggle);
    return () => popover.removeEventListener("toggle", handleToggle);
  }, [isOpen]);

  // Keep anchored on resize or scroll
  useEffect(() => {
    if (!isOpen) return;

    const handler = () => positionPopoverHandlerRef.current();

    window.addEventListener("resize", handler, { passive: true });
    window.addEventListener("scroll", handler, { capture: true, passive: true });

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler, { capture: true });
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block inline-full">
      {/* Trigger Container */}
      <div
        ref={triggerRef}
        className="cursor-pointer inline-full"
        role="button"
        tabIndex={0}
        onClick={() => onOpenChange(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenChange(!isOpen);
          }
        }}
      >
        {trigger}
      </div>

      {/* Popover Element using Dialog tag */}
      <dialog
        ref={popoverRef}
        id={popoverId}
        popover="auto"
        className={cn(
          "m-0 border-none bg-transparent p-0 outline-hidden backdrop:bg-black/20",
          /* inset-auto is critical for manual positioning in top layer */
          "fixed inset-auto",
          className,
        )}
      >
        {isOpen && <div className="animate-in fade-in zoom-in-95 duration-200">{children}</div>}
      </dialog>
    </div>
  );
}
