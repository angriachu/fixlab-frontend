import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { db, Device } from "@/lib/db";
import { toast } from "sonner";

const schema = z.object({
  brand: z.string().min(2, "Choose brand"),
  model: z.string().min(1, "Enter model"),
  serial: z.string().min(1, "Enter serial number"),
  description: z.string().optional(),
});
type Values = z.infer<typeof schema>;

export const BRANDS = [
  "Dell","HP","Lenovo","Acer","ASUS","Apple","MSI","Samsung","Toshiba","Sony","LG","Microsoft","Razer","Huawei","Honor"
];

export default function DeviceForm({
  initial,
  onSubmit,
}: {
  initial?: Device | null;
  onSubmit: (d: Device) => void;
}) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: initial ?? { brand: "", model: "", serial: "", description: "" },
  });

  useEffect(() => { if (initial) form.reset(initial); }, [initial]);

  function handleSubmit(v: Values) {
    try {
      const saved = db.devices.upsert({ ...(initial ?? {}), ...v });
      toast.success(initial ? "Device updated" : "Device added");
      onSubmit(saved);
    } catch {
      toast.error("Failed to save device");
    }
  }

  return (
    <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="space-y-1">
        <Label>Brand</Label>
        <select
          className="w-full rounded-md border px-3 py-2 text-sm"
          {...form.register("brand")}
        >
          <option value="">Select brand</option>
          {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        {form.formState.errors.brand && <p className="text-xs text-red-500">{form.formState.errors.brand.message}</p>}
      </div>
      <div className="space-y-1">
        <Label>Model</Label>
        <input className="w-full rounded-md border px-3 py-2 text-sm" {...form.register("model")} placeholder="e.g., Latitude 7420" />
      </div>
      <div className="space-y-1">
        <Label>Serial number</Label>
        <input className="w-full rounded-md border px-3 py-2 text-sm" {...form.register("serial")} />
      </div>
      <div className="space-y-1">
        <Label>Description</Label>
        <textarea rows={3} className="w-full rounded-md border px-3 py-2 text-sm" {...form.register("description")} placeholder="Notes…" />
      </div>
      <Button type="submit" className="w-full">{initial ? "Save changes" : "Add device"}</Button>
    </form>
  );
}
