"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Bell, Settings } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import FilterSearch from "./filter-search";
import { Button } from "../ui/button";
import ToggleLocale from "./toggle-locale";

const DashboardHeader = () => {
  const locale = useLocale();
  return (
    <header
      className={`${locale === "en" ? "rounded-tl-8xl" : "rounded-tr-8xl"} flex h-28 w-full shrink-0 items-center gap-2 bg-white px-10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-19`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <SidebarTrigger />
          <FilterSearch inputClasses="lg:w-[300px] xl:w-[500px] rounded-2xl" />
        </div>
        <div className="flex items-center gap-5">
          <ToggleLocale />

          <Link href={"#"}>
            <Button
              variant={"ghost"}
              className="bg-secondary text-brand aspect-square size-12 rounded-full"
            >
              <Settings />
            </Button>
          </Link>
          <Link href={"#"}>
            <Button
              variant={"ghost"}
              className="bg-secondary text-brand aspect-square size-12 rounded-full"
            >
              <Bell />
            </Button>
          </Link>
          {/* <UserDropdown /> */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
