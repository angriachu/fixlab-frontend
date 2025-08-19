import { registerSW } from "virtual:pwa-register";

export const setupPWA = () => {
  const updateSW = registerSW({
    onNeedRefresh() {
      // You can show a custom toast/modal here.
      const ok = confirm("A new version is available. Reload now?");
      if (ok) updateSW(true);
    },
    onOfflineReady() {
      // Optional: toast "App ready to work offline"
      console.log("Offline ready");
    },
  });
};
