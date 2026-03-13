import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin-layout";
import { MFASettings } from "./pages/mfa-settings";
import { Analytics } from "./pages/analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: MFASettings },
      { path: "analytics", Component: Analytics },
    ],
  },
]);
