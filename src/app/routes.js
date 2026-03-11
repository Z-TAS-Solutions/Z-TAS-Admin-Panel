import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin-layout";
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
