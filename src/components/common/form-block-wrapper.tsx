import { cn } from "@/utils/cn";

type FormBlockWrapperProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function FormBlockWrapper({
  title,
  children,
  className,
}: FormBlockWrapperProps) {
  return (
    <section className="h-full rounded-xl bg-white">
      {/* Block title pass it as key in en/er json translations files */}
      <header className="bg-brand-light text-text-secondary relative mb-5 rounded-xl p-4 py-6 text-sm font-semibold">
        <h3>{title}</h3>
      </header>

      <div
        className={cn("grid gap-8 md:grid-cols-2 lg:grid-cols-3", className)}
      >
        {children}
      </div>
    </section>
  );
}
