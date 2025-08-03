// routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "./PublicLayout";
import { PrivateLayout } from "./PrivateLayout";
import { PrivateRoutes } from "./PrivateRoutes";

import LoginPage from "@/pages/Login";
import DashboardPage from "@/pages/Dashboard";
import SettingsPage from "@/pages/Settings";
import SellsPage from "@/pages/Sells";
import Profile from "@/pages/Profile";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <PrivateLayout />,
        children: [{ path: "/", element: <DashboardPage /> }],
      },
      {
        element: <PrivateLayout />,
        children: [{ path: "/settings", element: <SettingsPage /> }],
      },
      {
        element: <PrivateLayout />,
        children: [{ path: "/sells", element: <SellsPage /> }],
      },
      {
        element: <PrivateLayout />,
        children: [{ path: "/profile", element: <Profile /> }],
      },
    ],
  },
]);
