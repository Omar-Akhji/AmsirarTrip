"use client";

import * as React from "react";
import { Calendar } from "./calendar";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { Button } from "./button";

interface EnhancedCalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
  onClose?: () => void;
}

export function EnhancedCalendar({
  selected,
  onSelect,
  disabled,
  className,
  onClose,
}: EnhancedCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    selected
  );
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    selected || new Date()
  );

  // Sync with parent
  React.useEffect(() => {
    setSelectedDate(selected);
  }, [selected]);

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onSelect?.(date);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
    onSelect?.(today);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-2xl border-4 border-orange-600 bg-linear-to-br from-white to-orange-50/30 p-5 shadow-xl shadow-orange-900/5 backdrop-blur-sm">
        {/* Month Navigation Header */}
        <div className="mb-4 flex items-center justify-center gap-4 border-b border-orange-100 pb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth("prev")}
            className="h-8 w-8 rounded-full p-0 text-orange-600 hover:bg-orange-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-semibold text-gray-900">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth("next")}
            className="h-8 w-8 rounded-full p-0 text-orange-600 hover:bg-orange-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          disabled={disabled}
          className="rounded-xl"
          initialFocus
        />

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mt-4 border-t border-orange-100 pt-3">
            <div className="flex items-center gap-3 rounded-xl border border-orange-200/40 bg-linear-to-r from-orange-50 to-orange-100/50 px-4 py-2.5">
              <div className="shrink-0">
                <div className="h-2 w-2 animate-pulse rounded-full bg-orange-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-500">
                  Selected Date
                </p>
                <p className="truncate text-sm font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-orange-100 pt-3">
          <Button
            onClick={goToToday}
            variant="outline"
            size="sm"
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            Today
          </Button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedDate) {
                  onSelect?.(selectedDate);
                  onClose?.();
                }
              }}
              disabled={!selectedDate}
              type="button"
              className="rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-orange-500 disabled:hover:to-orange-600"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
