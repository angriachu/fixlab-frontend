import { useEffect, useMemo, useState } from "react";
import { db, Ticket, TicketStatus } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const STATUS: TicketStatus[] = ["open", "in_progress", "closed"];

export default function Tickets() {
  const [items, setItems] = useState<Ticket[]>([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<TicketStatus | "all">("all");

  const refresh = () => setItems(db.tickets.list());
  useEffect(() => { refresh(); }, []);
  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter(t => t.status === filter)),
    [items, filter]
  );

  function createTicket(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") || "");
    const description = String(fd.get("description") || "");
    const service = (fd.get("service") || "online") as "online" | "onsite";
    if (!title.trim()) return;
    db.tickets.upsert({ title, description, status: "open", service });
    toast.success("Ticket created");
    setOpen(false); refresh();
    e.currentTarget.reset();
  }

  function setStatus(t: Ticket, status: TicketStatus) {
    db.tickets.upsert({ ...t, status });
    refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold">Tickets</h1>
          <p className="text-sm text-slate-600">Create and track your service tickets.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="rounded-md border px-3 py-2 text-sm" value={filter} onChange={e => setFilter(e.target.value as any)}>
            <option value="all">All</option>
            {STATUS.map(s => <option key={s} value={s}>{s.replace("_"," ")}</option>)}
          </select>
          <Button onClick={() => setOpen(true)} className="gap-2"><Plus className="h-4 w-4" /> New ticket</Button>
        </div>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/40">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Service</th>
              <th className="px-3 py-2 text-left">Updated</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-3 py-6 text-center text-slate-500">No tickets yet.</td></tr>
            )}
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="px-3 py-2">{t.id}</td>
                <td className="px-3 py-2">{t.title}</td>
                <td className="px-3 py-2 capitalize">{t.status.replace("_"," ")}</td>
                <td className="px-3 py-2">{t.service}</td>
                <td className="px-3 py-2">{new Date(t.updatedAt).toLocaleString()}</td>
                <td className="px-3 py-2">
                  <div className="flex justify-end gap-2">
                    {STATUS.map(s => (
                      <Button key={s} variant={t.status === s ? "default" : "outline"} size="sm" onClick={() => setStatus(t, s)}>
                        {s.replace("_"," ")}
                      </Button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* New ticket dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>New ticket</DialogTitle></DialogHeader>
          <form className="space-y-3" onSubmit={createTicket}>
            <div className="space-y-1">
              <Label>Title</Label>
              <input name="title" className="w-full rounded-md border px-3 py-2 text-sm" placeholder="e.g., NVR offline" />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <textarea name="description" rows={4} className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <Label>Service</Label>
              <select name="service" className="w-full rounded-md border px-3 py-2 text-sm">
                <option value="online">Online</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
            <Button type="submit" className="w-full">Create</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
