export function mockDashboard() {
  const now = Date.now();
  return {
    stats: {
      activeTickets: 2,
      upcomingVisits: 1,
      devices: 5,
      plan: "Gold • 72 days left",
    },
    recentTickets: [
      { id: "TCK-1207", title: "NVR offline", status: "in_progress", updatedAt: now - 60_000 },
      { id: "TCK-1199", title: "Camera feed blurry", status: "open", updatedAt: now - 3_600_000 },
      { id: "TCK-1182", title: "Router reboot loop", status: "closed", updatedAt: now - 86_400_000 },
    ],
  };
}
