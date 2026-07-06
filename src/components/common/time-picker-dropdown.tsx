"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/cn";

type TimePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
};

export function TimePickerDropdown({
  value,
  onChange,
  placeholder = "hh:mm aa",
}: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleTimeChange = (type: "hour" | "minute" | "ampm", val: string) => {
    const baseDate = value ? new Date(value) : new Date();
    const newDate = new Date(baseDate);

    if (type === "hour") {
      newDate.setHours(
        (parseInt(val) % 12) + (newDate.getHours() >= 12 ? 12 : 0),
      );
    }

    if (type === "minute") {
      newDate.setMinutes(parseInt(val));
    }

    if (type === "ampm") {
      const current = newDate.getHours();
      newDate.setHours(val === "PM" ? (current % 12) + 12 : current % 12);
    }

    onChange?.(newDate);
  };

  const formattedTime =
    value &&
    value.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

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
          {formattedTime || placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto bg-white p-0">
        <div className="flex divide-x">
          {/* Hours */}
          <ScrollArea className="w-full">
            <div className="flex flex-col items-center p-2">
              {hours.reverse().map((hour) => (
                <Button
                  key={hour}
                  size="icon"
                  variant={
                    value && value.getHours() % 12 === hour % 12
                      ? "brand"
                      : "ghost"
                  }
                  className="aspect-square text-sm"
                  onClick={() => handleTimeChange("hour", hour.toString())}
                >
                  {hour}
                </Button>
              ))}
            </div>
          </ScrollArea>

          {/* Minutes */}
          <ScrollArea className="w-full">
            <div className="flex flex-col items-center p-2">
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  size="icon"
                  variant={
                    value && value.getMinutes() === minute ? "brand" : "ghost"
                  }
                  className="aspect-square text-sm"
                  onClick={() => handleTimeChange("minute", minute.toString())}
                >
                  {minute.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
          </ScrollArea>

          {/* AM / PM */}
          <ScrollArea className="w-full">
            <div className="flex flex-col items-center p-2">
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
                  className="aspect-square text-sm"
                  onClick={() => handleTimeChange("ampm", ampm)}
                >
                  {ampm}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
