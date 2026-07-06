"use client";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

export default function FilterTabs({
  filterTabs,
  filterName,
  hasAllKey = false,
}: {
  filterTabs: { label: string; value: string }[];
  filterName: string;
  hasAllKey?: boolean;
}) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const selectedFilter = searchParams.get(filterName) || "";

  const applyFilter = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterName, value);

    const queryString = newParams.toString();
    const nextUrl = queryString ? `${pathName}?${queryString}` : pathName;

    router.replace(nextUrl, { scroll: false });
  };

  const clearFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(filterName);

    const queryString = newParams.toString();
    const nextUrl = queryString ? `${pathName}?${queryString}` : pathName;

    router.replace(nextUrl, { scroll: false });
  };

  return (
    <div className="bg-muted flex w-fit gap-2 rounded-xl p-2">
      {hasAllKey && (
        <Button
          variant={!selectedFilter ? "brand" : "ghost"}
          className={cn(!selectedFilter ? "" : "hover:bg-brand-light")}
          size={"filterTabs"}
          onClick={clearFilter}
        >
          {t("common.all")}
        </Button>
      )}

      {filterTabs.map((data, i) => (
        <Button
          key={i}
          variant={data.value === selectedFilter ? "brand" : "ghost"}
          className={cn(
            data.value === selectedFilter ? "" : "hover:bg-brand-light",
          )}
          size={"filterTabs"}
          onClick={() => applyFilter(data.value)}
        >
          {t(data.label)}
        </Button>
      ))}
    </div>
  );
}
