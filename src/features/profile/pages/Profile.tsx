import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { db, Profile, createId } from "@/lib/db";
import { toast } from "sonner";

export default function ProfilePage() {
  const [p, setP] = useState<Profile>(() => db.profile.get());
  useEffect(() => { setP(db.profile.get()); }, []);

  function save() { db.profile.set(p); toast.success("Profile saved"); }
  function onAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setP({ ...p, avatar: String(reader.result) });
    reader.readAsDataURL(f);
  }

  const addAddress = () => {
    const a = { id: createId(), label: "Address", line1: "" };
    setP({ ...p, addresses: [ ...(p.addresses ?? []), a ] });
  };
  const rmAddress = (id: string) =>
    setP({ ...p, addresses: (p.addresses ?? []).filter(x => x.id !== id) });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Profile</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-xl border p-5 md:col-span-2">
          <h3 className="text-sm font-semibold mb-3">Personal</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div><Label>Full name</Label><input className="w-full rounded-md border px-3 py-2 text-sm" value={p.fullName ?? ""} onChange={e => setP({ ...p, fullName: e.target.value })} /></div>
            <div><Label>Email</Label><input className="w-full rounded-md border px-3 py-2 text-sm" value={p.email ?? ""} onChange={e => setP({ ...p, email: e.target.value })} /></div>
            <div><Label>Phone</Label><input className="w-full rounded-md border px-3 py-2 text-sm" value={p.phone ?? ""} onChange={e => setP({ ...p, phone: e.target.value })} /></div>
            <div><Label>Alt phone</Label><input className="w-full rounded-md border px-3 py-2 text-sm" value={p.altPhone ?? ""} onChange={e => setP({ ...p, altPhone: e.target.value })} /></div>
          </div>

          <h3 className="text-sm font-semibold mt-6 mb-2">Addresses</h3>
          <div className="space-y-3">
            {(p.addresses ?? []).map(a => (
              <div key={a.id} className="grid gap-2 md:grid-cols-2">
                <input className="rounded-md border px-3 py-2 text-sm" placeholder="Label (Home/Office)" value={a.label ?? ""} onChange={e => setP({ ...p, addresses: (p.addresses ?? []).map(x => x.id === a.id ? { ...a, label: e.target.value } : x) })} />
                <input className="rounded-md border px-3 py-2 text-sm" placeholder="Address line 1" value={a.line1} onChange={e => setP({ ...p, addresses: (p.addresses ?? []).map(x => x.id === a.id ? { ...a, line1: e.target.value } : x) })} />
                <input className="rounded-md border px-3 py-2 text-sm" placeholder="Address line 2" value={a.line2 ?? ""} onChange={e => setP({ ...p, addresses: (p.addresses ?? []).map(x => x.id === a.id ? { ...a, line2: e.target.value } : x) })} />
                <div className="grid grid-cols-3 gap-2">
                  <input className="rounded-md border px-3 py-2 text-sm" placeholder="City" value={a.city ?? ""} onChange={e => setP({ ...p, addresses: (p.addresses ?? []).map(x => x.id === a.id ? { ...a, city: e.target.value } : x) })} />
                  <input className="rounded-md border px-3 py-2 text-sm" placeholder="State" value={a.state ?? ""} onChange={e => setP({ ...p, addresses: (p.addresses ?? []).map(x => x.id === a.id ? { ...a, state: e.target.value } : x) })} />
                  <input className="rounded-md border px-3 py-2 text-sm" placeholder="ZIP" value={a.zip ?? ""} onChange={e => setP({ ...p, addresses: (p.addresses ?? []).map(x => x.id === a.id ? { ...a, zip: e.target.value } : x) })} />
                </div>
                <div className="col-span-full">
                  <Button variant="destructive" size="sm" onClick={() => rmAddress(a.id)}>Remove</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addAddress}>Add address</Button>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={save}>Save profile</Button>
          </div>
        </Card>

        <Card className="rounded-xl border p-5">
          <h3 className="text-sm font-semibold mb-3">Avatar</h3>
          {p.avatar ? <img src={p.avatar} alt="avatar" className="h-28 w-28 rounded-full object-cover" /> : <div className="h-28 w-28 rounded-full bg-slate-200" />}
          <input type="file" accept="image/*" className="mt-3" onChange={onAvatar} />
          <div className="mt-6 space-y-2">
            <Button variant="destructive" className="w-full" onClick={() => { localStorage.clear(); toast.success("Account data cleared (local)"); location.reload(); }}>Delete account (local)</Button>
            <Button variant="outline" className="w-full" onClick={() => toast.info("Password change handled on backend")}>Change password</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
