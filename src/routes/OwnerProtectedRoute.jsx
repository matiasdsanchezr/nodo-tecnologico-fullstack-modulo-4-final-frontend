import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Route disponible para el perfil principal
 * @param {{redirectPath: string}} props
 * @returns
 */
export const OwnerProtectedRoute = ({ redirectPath }) => {
  const { selectedProfile, isAuthReady } = useAuth();

  if (isAuthReady && !selectedProfile) {
    return <Navigate to={redirectPath} replace />;
  }

  if (selectedProfile?.role.name != "owner") {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
