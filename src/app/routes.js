import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin-layout";
import { Dashboard } from "./pages/dashboard";
import { Passkeys } from "./pages/passkeys";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "passkeys", Component: Passkeys },
    ],
  },
]);
