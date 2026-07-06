"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/utils/cn";

type FilterSearchProps = {
  inputClasses?: string;
  inputPlaceholder?: string;
  filterName?: string;
};

export default function FilterSearch({
  inputClasses,
  inputPlaceholder,
  filterName,
}: FilterSearchProps) {
  const t = useTranslations("common");
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(
    searchParams.get(filterName || "search") || "",
  );

  const applySearch = useDebouncedCallback((value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value) {
      newParams.delete(filterName || "search");
    } else {
      newParams.set(filterName || "search", value);
    }

    router.replace(`${pathName}?${newParams.toString()}`, { scroll: false });
  }, 400);

  return (
    <div className="relative">
      <Input
        type="search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          applySearch(e.target.value);
        }}
        className={cn(inputClasses, "ps-11 rounded-2xl font-semibold bg-main-bg border-0")}
        placeholder={t(inputPlaceholder || "search")}
      />
    </div>

  );
}
