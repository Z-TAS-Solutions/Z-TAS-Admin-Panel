import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin-layout";
import { Dashboard } from "./pages/dashboard";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
     
    ],
  },
]);
