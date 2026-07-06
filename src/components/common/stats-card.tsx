export default function StatsCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-brand-light/25 space-y-5 rounded-4xl p-10 px-12 pb-12 text-lg font-medium">
      <p>{title}</p>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
}
