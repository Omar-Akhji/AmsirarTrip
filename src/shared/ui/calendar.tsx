"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";

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
          <button
            type="button"
            onClick={() => navigateMonth("prev")}
            className="flex size-8 items-center justify-center rounded-full text-orange-600 transition-colors hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 focus:outline-none"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4 text-orange-600" />
            <span className="text-sm font-semibold text-gray-900">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigateMonth("next")}
            className="flex size-8 items-center justify-center rounded-full text-orange-600 transition-colors hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 focus:outline-none"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Calendar - Direct react-day-picker */}
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          disabled={disabled}
          showOutsideDays
          classNames={{
            root: "w-fit bg-transparent p-2",
            months: "flex gap-6 flex-col md:flex-row",
            month: "flex flex-col w-full gap-4",
            nav: "hidden",
            month_caption: "hidden",
            weekdays: "flex",
            weekday:
              "text-muted-foreground text-xs font-medium w-9 text-center",
            week: "flex w-full mt-1",
            day: "relative p-0 text-center group/day aspect-square flex items-center justify-center",
            day_button: cn(
              "size-9 p-0 font-normal rounded-full text-sm transition-all duration-200",
              "hover:bg-orange-100 hover:text-orange-900",
              "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1",
              "aria-selected:bg-orange-600 aria-selected:text-white aria-selected:font-semibold",
              "disabled:opacity-30 disabled:cursor-not-allowed"
            ),
            today:
              "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:size-1 after:rounded-full after:bg-orange-600",
            outside: "text-muted-foreground/40",
            disabled: "text-muted-foreground/30",
            hidden: "invisible",
          }}
        />

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mt-4 border-t border-orange-100 pt-3">
            <div className="flex items-center gap-3 rounded-xl border border-orange-200/40 bg-linear-to-r from-orange-50 to-orange-100/50 px-4 py-2.5">
              <div className="shrink-0">
                <div className="size-2 animate-pulse rounded-full bg-orange-600" />
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
          <button
            type="button"
            onClick={goToToday}
            className="rounded-lg border border-orange-200 px-3 py-1.5 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 focus:outline-none"
          >
            Today
          </button>

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
