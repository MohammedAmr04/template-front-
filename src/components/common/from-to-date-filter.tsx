"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTranslations } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export function FromToDateFilter({ prefix }: { prefix?: string }) {
  const t = useTranslations("common");
  const router = useRouter();
  const searchParams = useSearchParams();

  const key = prefix ? `${prefix}-` : "";

  const [from, setFrom] = React.useState<Date | undefined>(() => {
    const v = searchParams.get(`${key}from`);
    return v ? parseISO(v) : undefined;
  });

  const [to, setTo] = React.useState<Date | undefined>(() => {
    const v = searchParams.get(`${key}to`);
    return v ? parseISO(v) : undefined;
  });

  const updateParams = (nextFrom?: Date, nextTo?: Date) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextFrom) {
      params.set(`${key}from`, format(nextFrom, "yyyy-MM-dd"));
    } else {
      params.delete(`${key}from`);
    }

    if (nextTo) {
      params.set(`${key}to`, format(nextTo, "yyyy-MM-dd"));
    } else {
      params.delete(`${key}to`);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      {/* FROM */}
      <div className="flex items-center gap-2">
        <p className="font-medium">{t("from")}:</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="brand"
              className="justify-start font-normal tabular-nums"
            >
              <CalendarIcon />
              {from ? (
                format(from, "LLL dd, y")
              ) : (
                <span>{t("select-date")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={from}
              onSelect={(date) => {
                setFrom(date);
                updateParams(date, to);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* TO */}
      <div className="flex items-center gap-2">
        <p className="font-medium">{t("to")}:</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="brand"
              className="justify-start font-normal tabular-nums"
            >
              <CalendarIcon />
              {to ? format(to, "LLL dd, y") : <span>{t("select-date")}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={to}
              onSelect={(date) => {
                setTo(date);
                updateParams(from, date);
              }}
              disabled={from ? { before: from } : undefined}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
