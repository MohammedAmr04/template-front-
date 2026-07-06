"use client";

import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type FilterSelectProps = {
  filterItems: {
    label: string;
    value: string;
  }[];
  filterName: string;
  placeholder: string;
};

export default function FilterSelect({
  filterItems,
  filterName,
  placeholder,
}: FilterSelectProps) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const selectedFilter = searchParams.get(filterName) || filterItems[0].value;

  const applyFilter = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterName, value);

    router.replace(`${pathName}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <Select onValueChange={applyFilter}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {filterItems.map((item, i) => (
          <SelectItem key={i} value={item.value} className="py-2">
            {t(item.label)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
