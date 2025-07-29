// routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "./PublicLayout";
import { PrivateLayout } from "./PrivateLayout";
import { PrivateRoutes } from "./PrivateRoutes";

import LoginPage from "@/pages/Login";
import DashboardPage from "@/pages/Dashboard";
import SettingsPage from "@/pages/Settings";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <PrivateRoutes />, // check auth
    children: [
      {
        element: <PrivateLayout />, // layout com sidebar
        children: [{ path: "/", element: <DashboardPage /> }],
      },
      {
        element: <PrivateLayout />, // layout com sidebar
        children: [{ path: "/settings", element: <SettingsPage /> }],
      },
    ],
  },
]);
