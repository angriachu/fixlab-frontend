import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function RaiseTicketWizard({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [service, setService] = useState<"online" | "onsite">("online");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function submit() {
    // wire to /api/tickets later
    toast.success("Ticket raised (mock)");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Raise a Ticket</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="title">Issue title</Label>
            <input
              id="title"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              placeholder="e.g., NVR offline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="desc">Description</Label>
            <textarea
              id="desc"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              rows={4}
              placeholder="Describe the issue, times, environment…"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-1 block">Service preference</Label>
            <RadioGroup value={service} onValueChange={(v: any) => setService(v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="online" value="online" />
                <Label htmlFor="online">Online</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="onsite" value="onsite" />
                <Label htmlFor="onsite">Onsite</Label>
              </div>
            </RadioGroup>
          </div>
          <Button className="w-full" onClick={submit} disabled={!title.trim()}>
            Submit ticket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
