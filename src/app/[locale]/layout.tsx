import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import "@/app/globals.css";
import Providers from "@/components/providers";
import { almarai, montserrat } from "@/fonts/google-fonts";
import { routing } from "@/i18n/routing";
import { LayoutsProps } from "@/types/common.types";
import { cn } from "@/utils/cn";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  // Translation
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: {
      template: `%s | ${t("common.title")}`,
      default: `${t("common.welcome")} | ${t("common.title")}`,
    },
    description: `${t("common.title")}`,
  };
}

export default async function LocaleLayout({ children, params }: LayoutsProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return notFound();
  }

  // Enable static rendering
  // setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning={true}
    >
      <body
        className={cn(
          "text-text-primary tracking-wide",
          locale === "ar" ? almarai.className : montserrat.className,
        )}
      >
        {/* Providers */}
        <Providers>
          {/* Main App */}
          <div className="sidebar-gradient min-h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
