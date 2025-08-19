// tiny localStorage DB for devices, tickets, profile

export type Device = {
  id: string;
  brand: string;
  model: string;
  serial: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
};

export type TicketStatus = "open" | "in_progress" | "closed";
export type Ticket = {
  id: string;
  title: string;
  description?: string;
  status: TicketStatus;
  deviceId?: string | null;
  category?: string;
  service?: "online" | "onsite";
  createdAt: number;
  updatedAt: number;
};

export type Profile = {
  fullName?: string;
  email?: string;
  phone?: string;
  altPhone?: string;
  avatar?: string;     // data URL
  addresses?: Array<{ id: string; label?: string; line1: string; line2?: string; city?: string; state?: string; zip?: string }>;
  privacy?: { shareDiagnostics: boolean };
  security?: { twoFactorEnabled: boolean };
  appearance?: { theme: "system" | "light" | "dark" };
};

const KEY = {
  devices: "fixlab-devices",
  tickets: "fixlab-tickets",
  profile: "fixlab-profile",
};

const parse = <T,>(k: string, fallback: T): T => {
  try { return JSON.parse(localStorage.getItem(k) || "") as T; } catch { return fallback; }
};
const save = (k: string, v: any) => localStorage.setItem(k, JSON.stringify(v));
export const createId = () => Math.random().toString(36).slice(2, 10).toUpperCase();

export const db = {
  devices: {
    list(): Device[] { return parse<Device[]>(KEY.devices, []); },
    upsert(d: Partial<Device> & { id?: string }): Device {
      const list = db.devices.list();
      if (!d.id) {
        const now = Date.now();
        const item: Device = {
          id: createId(),
          brand: d.brand || "",
          model: d.model || "",
          serial: d.serial || "",
          description: d.description || "",
          createdAt: now, updatedAt: now,
        };
        save(KEY.devices, [item, ...list]); return item;
      } else {
        const idx = list.findIndex(x => x.id === d.id);
        if (idx >= 0) {
          const updated = { ...list[idx], ...d, updatedAt: Date.now() } as Device;
          list[idx] = updated; save(KEY.devices, list); return updated;
        }
        throw new Error("Device not found");
      }
    },
    remove(id: string) {
      const list = db.devices.list().filter(x => x.id !== id);
      save(KEY.devices, list);
    }
  },
  tickets: {
    list(): Ticket[] { return parse<Ticket[]>(KEY.tickets, []); },
    upsert(t: Partial<Ticket> & { id?: string }): Ticket {
      const list = db.tickets.list();
      if (!t.id) {
        const now = Date.now();
        const item: Ticket = {
          id: "TCK-" + createId(),
          title: t.title || "",
          description: t.description || "",
          status: t.status || "open",
          deviceId: t.deviceId ?? null,
          category: t.category || "",
          service: t.service || "online",
          createdAt: now, updatedAt: now,
        };
        save(KEY.tickets, [item, ...list]); return item;
      } else {
        const idx = list.findIndex(x => x.id === t.id);
        if (idx >= 0) {
          const updated = { ...list[idx], ...t, updatedAt: Date.now() } as Ticket;
          list[idx] = updated; save(KEY.tickets, list); return updated;
        }
        throw new Error("Ticket not found");
      }
    },
    remove(id: string) {
      const list = db.tickets.list().filter(x => x.id !== id);
      save(KEY.tickets, list);
    }
  },
  profile: {
    get(): Profile { return parse<Profile>(KEY.profile, { appearance: { theme: "system" } }); },
    set(p: Profile) { save(KEY.profile, p); },
  }
};
