import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin-layout";
import { Dashboard } from "./pages/dashboard";

import { MFASettings } from "./pages/mfa-settings";
import { Users } from "./pages/users";
import { Settings } from "./pages/settings";
import { AuthLogs } from "./pages/auth-logs";
import { Devices } from "./pages/devices";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { UserEnrollment } from "./pages/user-enrollment";

export const router = createBrowserRouter([
  { path: "/", Component: Login },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    path: "/dashboard",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "auth-logs", Component: AuthLogs },
      { path: "devices", Component: Devices },

      { path: "mfa-settings", Component: MFASettings },
      { path: "users", Component: Users },
      { path: "user-enrollment", Component: UserEnrollment },
      { path: "settings", Component: Settings },
    ],
  },
]);
