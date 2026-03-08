 import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/AdminLayout";
import { Users } from "./pages/Users";
import { Alerts } from "./pages/Alerts";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Users /> },
      { path: "users", element: <Users /> },
      { path: "alerts", element: <Alerts /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
