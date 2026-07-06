import React from "react";

type PageWraperProps = {
  children: React.ReactNode;
  title: React.ReactNode;
  CTA?: () => React.ReactNode;
};

export default function DashboardPageWrapper({
  children,
  title,
  CTA,
}: PageWraperProps) {
  return (
    <section className="">
      <header className="mb-7 flex items-center justify-between">
        {typeof title === "string" ? (
          <h1 className="text-foreground text-3xl font-semibold">{title}</h1>
        ) : (
          title
        )}

        {CTA && CTA()}
      </header>

      <div className="space-y-6">{children}</div>
    </section>
  );
}
