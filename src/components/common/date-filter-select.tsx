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

const dateFilterItems = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

export default function DateFilterSelect() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const selectedFilter = searchParams.get("sortByDate") || "all";

  const applyFilter = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === "all") {
      newParams.delete("sortByDate");
    } else {
      newParams.set("sortByDate", value);
    }

    router.replace(`${pathName}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <Select value={selectedFilter} onValueChange={applyFilter}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Filter by date" />
      </SelectTrigger>
      <SelectContent>
        {dateFilterItems.map((item, i) => (
          <SelectItem key={i} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
