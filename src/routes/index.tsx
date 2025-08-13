// routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "./PublicLayout";
import { PrivateLayout } from "./PrivateLayout";
import { PrivateRoutes } from "./PrivateRoutes";

import LoginPage from "@/pages/Login";
import DashboardPage from "@/pages/Dashboard";
import SettingsPage from "@/pages/Settings";
import SellsPage from "@/pages/Sells";
import ProfilePage from "@/pages/Profile";
import OpeningHourPage from "@/pages/OpeningHour";
import AboutPage from "@/pages/About";
import TeamPage from "@/pages/Team";
import MenuPage from "@/pages/Menu";

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
        children: [{ path: "/profile", element: <ProfilePage /> }],
      },
      {
        element: <PrivateLayout />,
        children: [{ path: "/opening-hour", element: <OpeningHourPage /> }],
      },
      {
        element: <PrivateLayout />,
        children: [{ path: "/about", element: <AboutPage /> }],
      },
      {
        element: <PrivateLayout />,
        children: [{ path: "/team", element: <TeamPage /> }],
      },
      {
        element: <PrivateLayout />,
        children: [{ path: "/menu", element: <MenuPage /> }],
      },
    ],
  },
]);
