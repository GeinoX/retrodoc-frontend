import { createBrowserRouter } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoute";

import HomePage from "../pages/HomePage";

import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage.tsx";

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
  { path: "/login", element: <LoginPage /> },
  { path: "/dashboard", element: <DashboardPage /> },

  // Protected routes
  {
    element: <ProtectedRoutes />,
    children: [
      // {
      //   path: "/dashboard",
      //   element: <DashboardPage />,
      // },
    ],
  },
]);
