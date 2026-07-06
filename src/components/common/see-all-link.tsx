import React from "react";
import { Link } from "@/i18n/navigation";

export default function SeeAllLink({
  href,
  label = "See All",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      className="text-brand text-lg font-semibold underline-offset-2 transition-all hover:underline"
      href={href}
    >
      {label}
    </Link>
  );
}
