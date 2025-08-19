import { useQuery } from "@tanstack/react-query";
import { mockDashboard } from "@/lib/mockData";
import StatCard from "./StatCard";
import RecentTickets from "./RecentTickets";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import RaiseTicketWizard from "./RaiseTicketWizard";

export default function Overview() {
  const [open, setOpen] = useState(false);

  // later: switch to real /api/dashboard when backend ready
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      // fetch from API here if not mocking
      return mockDashboard();
    },
  });

  const s = data?.stats;

  return (
    <div className="space-y-6">
      {/* page heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Overview</h1>
          <p className="text-sm text-slate-600">
            Track tickets, manage devices, and view your plan & health summary.
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Quick Raise Ticket
        </Button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard title="Active tickets" value={isLoading ? "…" : s?.activeTickets ?? 0} />
        <StatCard title="Upcoming visits" value={isLoading ? "…" : s?.upcomingVisits ?? 0} accent="from-fuchsia-400/30 to-sky-400/30" />
        <StatCard title="Devices" value={isLoading ? "…" : s?.devices ?? 0} accent="from-emerald-400/30 to-lime-400/30" />
        <StatCard title="Plan" value={isLoading ? "…" : s?.plan ?? "-"} accent="from-violet-400/30 to-fuchsia-400/30" />
      </div>

      {/* two columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Placeholder for charts or health summary */}
          <div className="rounded-xl border bg-gradient-to-br from-sky-50 to-emerald-50 p-6 shadow-sm dark:from-slate-900 dark:to-slate-900 dark:border-slate-700">
            <h3 className="text-sm font-semibold mb-2">Service Health (preview)</h3>
            <p className="text-sm text-slate-600">
              Charts coming next. For now, enjoy the clean layout and quick actions.
            </p>
          </div>
        </div>
        <RecentTickets items={data?.recentTickets ?? []} />
      </div>

      <RaiseTicketWizard open={open} onOpenChange={setOpen} />
    </div>
  );
}
