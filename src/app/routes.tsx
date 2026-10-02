import { createBrowserRouter } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoute";

import HomePage from "../pages/HomePage";

import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage";
import DashboardLayout from "../features/dashboard/components/DashboardLayout";
import OverviewPage from "../features/dashboard/pages/OverviewPage";
import PlaceholderPage from "../features/dashboard/components/PlaceholderPage";
import RoleRoute from "./RoleRoute";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
  },

  // Protected routes
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <OverviewPage /> },
          { path: "reports", element: <PlaceholderPage name="reports" /> },
          {
            element: <RoleRoute roles={["O"]} />,
            children: [
              {
                path: "deposits",
                element: <PlaceholderPage name="deposits" />,
              },
              { path: "claims", element: <PlaceholderPage name="claims" /> },
              { path: "records", element: <PlaceholderPage name="records" /> },
            ],
          },
        ],
      },
    ],
  },
]);
