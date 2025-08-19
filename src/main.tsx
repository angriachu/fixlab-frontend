import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppProviders from "@/components/AppProviders";
import { RouterProvider } from "react-router-dom";
import { router } from "@/lib/router";
import { setupPWA } from "@/lib/pwa";

setupPWA();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);
