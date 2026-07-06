import {
  AlignHorizontalJustifyEnd,
  FlaskConical,
  FolderUp,
  Home,
  Hospital,
  MapPlus,
  ScanLine,
  Users,
  Wallet,
} from "lucide-react";

export const LABORATORY_SIDEBAR_LINKS = [
  { icon: Home, title: "home", href: "/laboratory" },
  {
    icon: AlignHorizontalJustifyEnd,
    title: "orders",
    href: "/laboratory/orders",
  },
  { icon: Hospital, title: "bookings", href: "/laboratory/bookings" },
  {
    icon: FolderUp,
    title: "upload-results",
    href: "/laboratory/upload-results",
  },
  { icon: FlaskConical, title: "tests", href: "/laboratory/tests" },
  { icon: ScanLine, title: "radiologies", href: "/laboratory/radiologies" },
  { icon: Users, title: "patients", href: "/laboratory/patients" },
  {
    icon: MapPlus,
    title: "branches",
    href: "/laboratory/branches",
  },
  { icon: Wallet, title: "finances", href: "/laboratory/finances" },
];
