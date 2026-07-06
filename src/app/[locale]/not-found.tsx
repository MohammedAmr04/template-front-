import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common");
  return (
    // Change styles according to the main "not-found.tsx" page
    <main>
      <h2>{t("not-found")}</h2>
      <p>{t("could-not-find-requested-resource")}</p>
      <Link href="/">{t("return-home")}</Link>
    </main>
  );
}
