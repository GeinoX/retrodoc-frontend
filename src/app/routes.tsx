import { createBrowserRouter } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoute";

import HomePage from "../pages/HomePage";

import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage";

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
      // {
      //   path: "/dashboard",
      //   element: <DashboardPage />,
      // },
    ],
  },
]);
