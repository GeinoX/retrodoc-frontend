import { createBrowserRouter } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import HomePage from "../pages/HomePage";

import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage";

import DashboardLayout from "../features/dashboard/components/DashboardLayout";
import OverviewPage from "../features/dashboard/pages/OverviewPage";

import ReportFoundPage from "../features/reports/pages/ReportFoundPage";
import ReportLostPage from "../features/reports/pages/ReportLostPage";
import MyReportsPage from "../features/reports/pages/MyReportsPage";
import ReportFullPage from "../features/reports/pages/ReportFullPage";

import MatchesPage from "../features/matches/pages/MatchesPage";

import DepositsPage from "../features/officer/pages/DepositsPage";
import ClaimsPage from "../features/officer/pages/ClaimsPage";
import RecordsPage from "../features/officer/pages/RecordsPage";

import AccountPage from "../features/account/pages/AccountPage";
import HelpPage from "../features/help/pages/HelpPage";

export const router = createBrowserRouter([
  // ============================================================
  // PUBLIC ROUTES
  // ============================================================

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

  // ============================================================
  // PROTECTED STANDALONE ROUTES
  // ============================================================

  {
    path: "/found",
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <ReportFoundPage />,
      },
    ],
  },

  {
    path: "/lost",
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <ReportLostPage />,
      },
    ],
  },

  // ============================================================
  // REPORTS
  // ============================================================

  {
    path: "/reports",
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <MyReportsPage />,
      },
      {
        path: ":reference",
        element: <ReportFullPage />,
      },
    ],
  },

  // ============================================================
  // PROTECTED DASHBOARD
  // ============================================================

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          // ------------------------------------------------------
          // Overview
          // /dashboard
          // ------------------------------------------------------

          {
            index: true,
            element: <OverviewPage />,
          },

          // ------------------------------------------------------
          // Reports
          // /dashboard/reports
          // ------------------------------------------------------

          {
            path: "reports",
            element: <MyReportsPage />,
          },

          // ------------------------------------------------------
          // Matches
          // /dashboard/matches
          // ------------------------------------------------------

          {
            path: "matches",
            element: <RoleRoute roles={["C"]} />,
            children: [
              {
                index: true,
                element: <MatchesPage />,
              },
            ],
          },

          // ------------------------------------------------------
          // Account
          // /dashboard/account
          // ------------------------------------------------------

          {
            path: "account",
            element: <AccountPage />,
          },

          // ------------------------------------------------------
          // Help
          // /dashboard/help
          // ------------------------------------------------------

          {
            path: "help",
            element: <HelpPage />,
          },

          // ------------------------------------------------------
          // Officer / Admin
          // ------------------------------------------------------

          {
            element: <RoleRoute roles={["O", "A"]} />,
            children: [
              {
                path: "deposits",
                element: <DepositsPage />,
              },

              {
                path: "claims",
                element: <ClaimsPage />,
              },

              {
                path: "records",
                element: <RecordsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
