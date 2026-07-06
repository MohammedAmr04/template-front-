"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function YearPicker() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentYear =
    Number(searchParams.get("year")) || new Date().getFullYear();

  const updateYear = (newYear: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", newYear.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePrev = () => updateYear(currentYear - 1);
  const handleNext = () => updateYear(currentYear + 1);

  return (
    <div
      className="flex items-center justify-center gap-4 py-2"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrev}
        className="text-muted-foreground hover:text-foreground h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span className="text-sm tracking-tight text-gray-800">
        {currentYear}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className="text-muted-foreground hover:text-foreground h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
