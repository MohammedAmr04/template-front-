import {
  CalendarCheck,
  FlaskConical,
  HeartPulse,
  Home,
  Hospital,
  ScanLine,
  Syringe,
  UserRound,
  Wallet,
} from "lucide-react";

export const HOSPITAL_SIDEBAR_LINKS = [
  { icon: Home, title: "home", href: "/hospital" },
  { icon: CalendarCheck, title: "bookings", href: "/hospital/bookings" },
  {
    icon: HeartPulse,
    title: "specializations",
    href: "/hospital/specializations",
  },
  { icon: UserRound, title: "doctors", href: "/hospital/doctors" },
  {
    icon: FlaskConical,
    title: "laboratories",
    href: "/admin/laboratories",
    subItems: [
      { icon: ScanLine, title: "radiology", href: "/hospital/radiology" },
      {
        icon: Hospital,
        title: "upload-results",
        href: "/hospital/upload-results",
      },
    ],
  },
  { icon: Syringe, title: "vaccines", href: "/hospital/vaccines" },
  { icon: Wallet, title: "finances", href: "/hospital/finances" },
];
