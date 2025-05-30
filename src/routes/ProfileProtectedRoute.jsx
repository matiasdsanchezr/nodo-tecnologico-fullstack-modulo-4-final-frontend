import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Route disponible para usuarios registrados con perfil activo
 * @param {{redirectPath: string}} props
 * @returns
 */
export const ProfileProtectedRoute = ({ redirectPath }) => {
  const { selectedProfile, isAuthReady } = useAuth();

  if (isAuthReady && !selectedProfile) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
