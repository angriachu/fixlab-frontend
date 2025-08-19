import { Card } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  accent = "from-sky-400/30 to-emerald-400/30",
}: {
  title: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <Card className="relative overflow-hidden rounded-xl border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <div className="p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">{title}</div>
        <div className="mt-1 text-2xl font-semibold">{value}</div>
      </div>
    </Card>
  );
}
