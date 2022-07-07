import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../features/auth/authContext";

export default function RequireAuth() {
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    user.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace/>
  )
}