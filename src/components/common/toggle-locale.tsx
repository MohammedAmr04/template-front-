"use client";
import { useSearchParams } from "next/navigation";
import { Locale, useLocale } from "next-intl";
import Image from "next/image";

import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

export default function ToggleLocale() {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Variables
  const locale = useLocale();
  const language: Record<Locale, string> = {
    en: "English",
    ar: "العربية",
  };

  const localeFlags: Record<Locale, { src: string; alt: string }> = {
    en: {
      src: "/assets/uk-flag.svg.png",
      alt: "UK flag",
    },
    ar: {
      src: "/assets/egypt-flag.svg.png",
      alt: "Egypt flag",
    },
  };

  //   Function
  const handleToggle = (nextLocale: Locale) => {
    router.push(`${pathname}?${searchParams.toString()}`, {
      locale: nextLocale,
    });
    queryClient.invalidateQueries({});
  };

  return (
    <Select
      value={locale}
      onValueChange={(value) => handleToggle(value as Locale)}
    >
      <SelectTrigger>
        <SelectValue aria-label={language[locale]}>
          <span className="flex items-center gap-2">
            {locale === "ar" && <span>{language[locale]}</span>}
            <div className="relative size-5 overflow-hidden rounded-md">
              <Image
                src={localeFlags[locale].src}
                alt={localeFlags[locale].alt}
                fill
                className="object-cover object-center"
                sizes="5vw"
              />
            </div>
            {locale === "en" && <span>{language[locale]}</span>}
          </span>
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {routing.locales.map((loc) => (
          <SelectItem value={loc} key={loc}>
            <div className="relative size-5 overflow-hidden rounded-md">
              <Image
                src={localeFlags[loc].src}
                alt={localeFlags[loc].alt}
                fill
                className="object-cover object-center"
                sizes="5vw"
              />
            </div>
            {language[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
