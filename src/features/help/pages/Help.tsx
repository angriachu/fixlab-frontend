import { Card } from "@/components/ui/card";

const FAQ = [
  { q: "How does Fixlab work?", a: "Create a ticket (online or onsite). A technician is assigned automatically based on your plan and location. Track status in Tickets." },
  { q: "How to raise a ticket?", a: "Go to Dashboard → Quick Raise Ticket, or the Tickets page → New ticket. Add details and choose service preference." },
  { q: "Onsite vs Online service?", a: "Online is remote assistance (chat/call/screen-share). Onsite sends a technician to your address." },
  { q: "What is AMC?", a: "Annual Maintenance Contract with priority SLAs and scheduled health checks." },
  { q: "How do I contact support?", a: "Use Help page contact options, or WhatsApp us from the header avatar menu (coming soon)." },
];

export default function Help() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Help & Guides</h1>

      <Card className="rounded-xl border p-5">
        <h3 className="text-sm font-semibold mb-3">Frequently Asked Questions</h3>
        <ul className="space-y-3 text-sm">
          {FAQ.map((f, i) => (
            <li key={i}>
              <div className="font-medium">{f.q}</div>
              <p className="text-slate-600">{f.a}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="rounded-xl border p-5">
        <h3 className="text-sm font-semibold mb-2">Articles</h3>
        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
          <li>Best practices to describe issues clearly</li>
          <li>Preparing for an onsite visit</li>
          <li>Keeping devices healthy (backups, updates)</li>
        </ul>
      </Card>
    </div>
  );
}
