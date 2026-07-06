"use client";

import * as React from "react";
import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/utils/cn";

type DateTimePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onBlur?: () => void;
};

export function DateTimePickerDropdown({
  value,
  onChange,
}: DateTimePickerProps) {
  // const [date, setDate] = React.useState<Date>();
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    onChange?.(selectedDate);
  };

  const handleTimeChange = (type: "hour" | "minute" | "ampm", val: string) => {
    if (!value) return;

    const newDate = new Date(value);

    if (type === "hour") {
      newDate.setHours(
        (parseInt(val) % 12) + (newDate.getHours() >= 12 ? 12 : 0),
      );
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(val));
    } else if (type === "ampm") {
      const current = newDate.getHours();
      newDate.setHours(val === "PM" ? (current % 12) + 12 : current % 12);
    }

    onChange?.(newDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "text-text-primary h-14! w-full justify-start text-left font-normal",
            !value && "text-text-muted",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "MM/dd/yyyy hh:mm aa")
          ) : (
            <span>MM/DD/YYYY hh:mm aa</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-bg-light w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
            <ScrollArea className="bg-bg-light w-64 sm:w-auto">
              <div className="flex p-2 sm:flex-col">
                {hours.reverse().map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      value && value.getHours() % 12 === hour % 12
                        ? "brand"
                        : "ghost"
                    }
                    className="aspect-square shrink-0 text-sm sm:w-full"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 bg-white sm:w-auto">
              <div className="flex p-2 sm:flex-col">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      value && value.getMinutes() === minute ? "brand" : "ghost"
                    }
                    className="aspect-square shrink-0 text-sm sm:w-full"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="bg-bg-light">
              <div className="flex p-2 sm:flex-col">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      value &&
                      ((ampm === "AM" && value.getHours() < 12) ||
                        (ampm === "PM" && value.getHours() >= 12))
                        ? "brand"
                        : "ghost"
                    }
                    className="aspect-square shrink-0 p-1 text-sm sm:w-full"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
