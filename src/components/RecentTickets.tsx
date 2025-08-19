import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function statusBadge(s: string) {
  const map: Record<string, string> = {
    open: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
    in_progress: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
    closed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  };
  return map[s] ?? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200";
}

export default function RecentTickets({ items }: { items: Array<{ id: string; title: string; status: string; updatedAt: number; }> }) {
  return (
    <Card className="rounded-xl border bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Recent Tickets</h3>
      </div>
      <ul className="divide-y text-sm dark:divide-slate-800">
        {items.map((t) => (
          <li key={t.id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <div className="truncate font-medium">{t.title}</div>
              <div className="text-xs text-slate-500">#{t.id}</div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Badge className={statusBadge(t.status)}>{t.status.replace("_", " ")}</Badge>
              <div className="text-xs text-slate-500">{new Date(t.updatedAt).toLocaleString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
