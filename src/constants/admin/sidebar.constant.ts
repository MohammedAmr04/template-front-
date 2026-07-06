import {
  Ambulance,
  BarChart3,
  CalendarCheck,
  FlaskConical,
  HeartPulse,
  Home,
  Hospital,
  MessageCircle,
  Pill,
  ScanLine,
  Syringe,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

export const ADMIN_SIDEBAR_LINKS = [
  { icon: Home, title: "home", href: "/admin" },
  {
    icon: MessageCircle,
    title: "medical-services",
    href: "/admin/doctors",
    subItems: [
      { icon: UserRound, title: "doctors", href: "/admin/doctors" },
      { icon: Hospital, title: "hospital", href: "/admin/hospitals" },
      { icon: FlaskConical, title: "laboratory", href: "/admin/laboratories" },
      { icon: Pill, title: "pharmacy", href: "/admin/pharmacies" },
      { icon: Ambulance, title: "ambulance", href: "/admin/ambulances" },
      { icon: Syringe, title: "vaccine", href: "/admin/vaccines" },
    ],
  },
  { icon: CalendarCheck, title: "booking", href: "/admin/bookings" },
  { icon: Users, title: "patients", href: "/admin/patients" },
  {
    icon: HeartPulse,
    title: "specializations",
    href: "/admin/specializations",
  },
  { icon: ScanLine, title: "radiology", href: "/admin/radiology" },
  { icon: BarChart3, title: "reports", href: "/admin/reports" },
  { icon: Wallet, title: "accounts", href: "/admin/accounts" },
];
