import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function ProtectedRoutes() {
  const { user, isLoading } = useAuth();
  console.log("protected", isLoading, user);
  const location = useLocation();

  if (isLoading) return null;
  if (!user)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <Outlet />;
}
