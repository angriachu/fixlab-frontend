import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { db, Profile } from "@/lib/db";
import { toast } from "sonner";

export default function SettingsPage() {
  const [p, setP] = useState<Profile>(() => db.profile.get());
  useEffect(() => { setP(db.profile.get()); }, []);

  function save() { db.profile.set(p); toast.success("Settings saved"); }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-xl border p-5">
          <h3 className="text-sm font-semibold mb-3">Privacy</h3>
          <div className="flex items-center gap-2">
            <input id="diag" type="checkbox" checked={!!p.privacy?.shareDiagnostics} onChange={e => setP({ ...p, privacy: { ...p.privacy, shareDiagnostics: e.target.checked } })} />
            <Label htmlFor="diag">Share anonymous diagnostics</Label>
          </div>
        </Card>

        <Card className="rounded-xl border p-5">
          <h3 className="text-sm font-semibold mb-3">Security</h3>
          <div className="flex items-center gap-2">
            <input id="2fa" type="checkbox" checked={!!p.security?.twoFactorEnabled} onChange={e => setP({ ...p, security: { ...p.security, twoFactorEnabled: e.target.checked } })} />
            <Label htmlFor="2fa">Enable 2-factor authentication</Label>
          </div>
        </Card>

        <Card className="rounded-xl border p-5">
          <h3 className="text-sm font-semibold mb-3">Appearance</h3>
          <select
            className="rounded-md border px-3 py-2 text-sm"
            value={p.appearance?.theme ?? "system"}
            onChange={e => setP({ ...p, appearance: { theme: e.target.value as any } })}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
