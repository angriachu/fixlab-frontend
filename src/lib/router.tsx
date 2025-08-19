import { createBrowserRouter } from "react-router-dom";
import Login from "@/components/Login";
import Overview from "@/components/Overview";
import { useAuthStore } from "@/lib/auth";
import { PropsWithChildren } from "react";
import AppLayout from "@/components/AppLayout";
import Devices from "@/features/devices/pages/Devices";
import Tickets from "@/features/tickets/pages/Tickets";
import Plans from "@/features/plans/pages/Plans";
import HealthReport from "@/features/health/pages/HealthReport";
import Downloads from "@/features/downloads/pages/Downloads";
import Help from "@/features/help/pages/Help";
import ProfilePage from "@/features/profile/pages/Profile";
import SettingsPage from "@/features/settings/pages/Settings";

// simple guard
function Protected({ children }: PropsWithChildren) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Login />; // server-side naive guard
  return <>{children}</>;
}

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <Protected>
        <AppLayout />
      </Protected>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: "devices", element: <Devices /> },
      { path: "tickets", element: <Tickets /> },
      { path: "plans", element: <Plans /> },
      { path: "health", element: <HealthReport /> },
      { path: "downloads", element: <Downloads /> },
      { path: "help", element: <Help /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
