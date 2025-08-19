import { useEffect, useState } from "react";
import { db, Device } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DeviceForm from "../components/DeviceForm";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function Devices() {
  const [items, setItems] = useState<Device[]>([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Device | null>(null);

  const refresh = () => setItems(db.devices.list());
  useEffect(() => { refresh(); }, []);

  function onSaved() { setOpen(false); setEdit(null); refresh(); }
  function del(id: string) { db.devices.remove(id); toast.success("Device removed"); refresh(); }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold">Devices</h1>
          <p className="text-sm text-slate-600">Manage your registered computers/laptops.</p>
        </div>
        <Button onClick={() => { setEdit(null); setOpen(true); }} className="gap-2"><Plus className="h-4 w-4" /> Add device</Button>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/40">
            <tr>
              <th className="px-3 py-2 text-left">Brand</th>
              <th className="px-3 py-2 text-left">Model</th>
              <th className="px-3 py-2 text-left">Serial</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-3 py-6 text-center text-slate-500">No devices yet. Add your first device.</td></tr>
            )}
            {items.map(d => (
              <tr key={d.id}>
                <td className="px-3 py-2">{d.brand}</td>
                <td className="px-3 py-2">{d.model}</td>
                <td className="px-3 py-2">{d.serial}</td>
                <td className="px-3 py-2">{d.description}</td>
                <td className="px-3 py-2">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => { setEdit(d); setOpen(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => del(d.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{edit ? "Edit device" : "Add device"}</DialogTitle></DialogHeader>
          <DeviceForm initial={edit} onSubmit={onSaved} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
