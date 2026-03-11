import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin-layout";
import { AuthLogs } from "./pages/auth-logs";
import { Devices } from "./pages/devices";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: AuthLogs },
      { path: "devices", Component: Devices },
    ],
  },
]);
