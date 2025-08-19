import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PLANS = [
  { name: "Free", price: "₹0", perks: ["Community help", "Basic ticketing"], cta: "Current" },
  { name: "Basic", price: "₹399", perks: ["Priority support", "2 onsite/year"], highlight: true },
  { name: "Executive", price: "₹699", perks: ["Priority + faster SLA", "4 onsite/year", "Annual health check"] },
  { name: "Custom", price: "Let's talk", perks: ["Tailored SLA", "Bulk devices/pricing"] },
];

export default function Plans() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Plans</h1>
      <div className="grid gap-4 md:grid-cols-4">
        {PLANS.map(p => (
          <Card key={p.name} className={`rounded-xl border p-5 ${p.highlight ? "ring-2 ring-sky-300" : ""}`}>
            <div className="text-sm text-slate-500">{p.name}</div>
            <div className="mt-1 text-2xl font-semibold">{p.price}</div>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {p.perks.map(x => <li key={x}>• {x}</li>)}
            </ul>
            <Button className="mt-4 w-full">{p.cta ?? "Choose"}</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
