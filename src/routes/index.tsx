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
import ClientHomePage from "@/pages/Client/Home";
import ClientMenuPage from "@/pages/Client/Menu";
import DeliverySettings from "@/pages/DeliverySettings";
import OrderTrackingPage from "@/pages/Client/OrderTracking";
import OrderManagerPage from "@/pages/OrderManager";
import OrderHistoryPage from "@/pages/Client/orderHistory";

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
      {
        element: <PrivateLayout />,
        children: [
          { path: "/delivery/settings", element: <DeliverySettings /> },
        ],
      },
      {
        element: <PrivateLayout />,
        children: [{ path: "/order-manager", element: <OrderManagerPage /> }],
      },
    ],
  },
  {
    children: [
      { path: "/client/:id", element: <ClientHomePage /> },
      {
        path: "/client/:id/menu",
        element: <ClientMenuPage />,
      },
      {
        path: "/client/:id/menu/order/:orderId",
        element: <OrderTrackingPage />,
      },
      {
        path: "/client/:id/menu/order-history/:clientId",
        element: <OrderHistoryPage />,
      },
    ],
  },
]);
