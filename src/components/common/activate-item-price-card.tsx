import { useTranslations } from "next-intl";
import { Switch } from "../ui/switch";

type ActivateItemPriceCardProps = {
  infoDialog?: React.ReactNode;
  editButton: React.ReactNode;

  items: {
    label: string;
    value: string;
  }[];
  isActive: boolean;
  price?: number;
};

export default function ActivateItemPriceCard({
  price,
  isActive,
  items,
  infoDialog,
  editButton,
}: ActivateItemPriceCardProps) {
  const t = useTranslations();
  return (
    <div className="border-brand-light/50 relative space-y-4 rounded-3xl border bg-white px-5 py-6 shadow">
      <div className="absolute end-6 top-0 -translate-y-1/2 rounded-full">
        {infoDialog}
      </div>

      <div className="bg-brand-light/20 rounded-3xl p-5">
        {items.map((item, i) => (
          <p key={i} className="font-medium">
            <span className="text-text-secondery">{item.label}: </span>
            {item.value}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2">
        {price && (
          <p className="bg-brand rounded-2xl p-3 px-4 text-white">
            {t("common.currency-two-digits", { price: price })}
          </p>
        )}

        <div className="ms-auto flex items-center gap-2">
          <Switch checked={isActive} />

          {editButton}
        </div>
      </div>
    </div>
  );
}
