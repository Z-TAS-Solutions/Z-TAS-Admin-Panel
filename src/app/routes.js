import { createBrowserRouter } from "react-router";
// Match the exact filename: AdminLayout.jsx
import { AdminLayout } from "./components/AdminLayout"; 

// Match the lowercase filenames: users.jsx, settings.jsx, alerts.jsx
import { Users } from "./pages/users";
import { Settings } from "./pages/settings";
import { Alerts } from "./pages/alerts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Users },
      { path: "users", Component: Users },
      { path: "settings", Component: Settings },
      { path: "alerts", Component: Alerts },
    ],
  },
]);