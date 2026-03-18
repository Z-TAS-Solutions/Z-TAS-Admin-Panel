import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin-layout";
import { Dashboard } from "./pages/dashboard";
import { Passkeys } from "./pages/passkeys";
import { MFASettings } from "./pages/mfa-settings";
import { Analytics } from "./pages/analytics";
import { Users } from "./pages/users";
import { Settings } from "./pages/settings";
import { Alerts } from "./pages/alerts";
import { AuthLogs } from "./pages/auth-logs";
import { Devices } from "./pages/devices";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "auth-logs", Component: AuthLogs },
      { path: "devices", Component: Devices },
      { path: "passkeys", Component: Passkeys },
      { path: "mfa-settings", Component: MFASettings },
      { path: "analytics", Component: Analytics },
      { path: "users", Component: Users },
      { path: "settings", Component: Settings },
      { path: "alerts", Component: Alerts },
    ],
  },
]);
