import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <section className="min-h-screen">{children}</section>;
}
