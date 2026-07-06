"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Translation
  const t = useTranslations("common");

  return (
    // Please add styles according to the main "error.tsx" file.
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      {/* Headline */}
      <h2 className="text-destructive text-2xl font-bold">
        {t("error-message")}
      </h2>
      {/* Description */}
      <p className="text-muted-foreground text-lg font-medium">
        {error.message}
      </p>
      {/* Action */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button onClick={() => reset()}>{t("refresh")}</Button>
        <Button variant={"destructive"} asChild>
          <Link href={"/"}>{t("home")}</Link>
        </Button>
      </div>
    </main>
  );
}
