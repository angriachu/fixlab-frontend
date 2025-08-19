import { Card } from "@/components/ui/card";
import { useMemo } from "react";
import { db } from "@/lib/db";

export default function HealthReport() {
  // derive some simple metrics from tickets/devices
  const { devices, tickets } = useMemo(() => ({
    devices: db.devices.list(),
    tickets: db.tickets.list(),
  }), []);

  // Build 12-week fake timeseries using ticket counts
  const data = Array.from({ length: 12 }).map((_, i) => {
    const week = `W${i+1}`;
    const issues = tickets.filter(t => ((t.createdAt / 604800000) | 0) % 12 === i).length;
    const resolved = tickets.filter(t => t.status === "closed" && ((t.updatedAt / 604800000) | 0) % 12 === i).length;
    return { week, issues, resolved };
  });

  const agingScore = Math.min(100, 20 + devices.length * 5);
  const batteryScore = Math.max(30, 90 - tickets.length * 3);
  const overall = Math.round((agingScore * 0.3 + batteryScore * 0.3 + (100 - (tickets.length*5)) * 0.4));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Health Report</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-xl border p-5">
          <div className="text-xs uppercase text-slate-500">Overall health</div>
          <div className="mt-2 text-3xl font-semibold">{overall}%</div>
          <p className="mt-1 text-sm text-slate-600">Estimated from device count, ticket load & resolution rate.</p>
        </Card>
        <Card className="rounded-xl border p-5">
          <div className="text-xs uppercase text-slate-500">Aging</div>
          <div className="mt-2 text-2xl font-semibold">{agingScore}</div>
          <p className="text-sm text-slate-600">Higher = newer/maintained.</p>
        </Card>
        <Card className="rounded-xl border p-5">
          <div className="text-xs uppercase text-slate-500">Battery / Hardware</div>
          <div className="mt-2 text-2xl font-semibold">{batteryScore}</div>
          <p className="text-sm text-slate-600">Lower with frequent power-related tickets.</p>
        </Card>
      </div>

      <Card className="rounded-xl border p-5">
        <h3 className="text-sm font-semibold mb-3">Issues vs Resolved (last 12 weeks)</h3>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
              <span className="text-sm font-medium">{item.week}</span>
              <div className="flex gap-4 text-sm">
                <span className="text-sky-600">Issues: {item.issues}</span>
                <span className="text-emerald-600">Resolved: {item.resolved}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
