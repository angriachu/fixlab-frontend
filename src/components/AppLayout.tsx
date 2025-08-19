import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Menu, LayoutDashboard, HardDrive, Ticket, ShieldCheck, Activity, Download, HelpCircle, User, Settings, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth";
import RaiseTicketWizard from "./RaiseTicketWizard";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/devices", label: "Devices", icon: HardDrive },
  { to: "/tickets", label: "Tickets", icon: Ticket },
  { to: "/plans", label: "Plans", icon: ShieldCheck },
  { to: "/health", label: "Health", icon: Activity },
  { to: "/downloads", label: "Downloads", icon: Download },
  { to: "/help", label: "Help", icon: HelpCircle },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="mt-4 flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
              isActive
                ? "bg-sky-100 text-sky-900 dark:bg-sky-900/30 dark:text-sky-100"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            )
          }
          end={to === "/"}
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const [raiseOpen, setRaiseOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-900/70">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-4">
              <div className="text-lg font-semibold">Fixlab</div>
              <SidebarLinks onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="hidden md:block text-lg font-semibold">Fixlab</div>

          <div className="ml-auto flex items-center gap-2">
            <Button onClick={() => setRaiseOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Raise Ticket
            </Button>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 ring-2 ring-sky-200">
                <AvatarFallback>{(user?.name ?? "U").slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">{user?.name ?? "User"}</div>
                <button
                  className="text-xs text-slate-500 hover:underline"
                  onClick={() => {
                    clearAuth();
                    navigate("/login", { replace: true });
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <div className="sticky top-16 rounded-xl border bg-white/70 p-3 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
            <SidebarLinks />
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      <RaiseTicketWizard open={raiseOpen} onOpenChange={setRaiseOpen} />
    </div>
  );
}
