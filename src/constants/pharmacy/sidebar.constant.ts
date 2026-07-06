import { AlignHorizontalJustifyEnd, Home, MapPlus, Wallet } from "lucide-react";

export const PHARMACY_SIDEBAR_LINKS = [
  { icon: Home, title: "home", href: "/pharmacy" },
  {
    icon: AlignHorizontalJustifyEnd,
    title: "orders",
    href: "/pharmacy/orders",
  },
  {
    icon: MapPlus,
    title: "branches",
    href: "/pharmacy/branches",
  },
  { icon: Wallet, title: "finances", href: "/pharmacy/finances" },
];
