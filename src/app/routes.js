import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin-layout";
import { MFASettings } from "./pages/mfa-settings";
import { Analytics } from "./pages/analytics";
import { Users } from "./pages/users";
import { Settings } from "./pages/settings";
import { Alerts } from "./pages/alerts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: MFASettings },
      { path: "analytics", Component: Analytics },
      { index: true, Component: Users },
      { path: "users", Component: Users },
      { path: "settings", Component: Settings },
      { path: "alerts", Component: Alerts },
    ],
  },
]);
