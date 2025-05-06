import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Route disponible para cualquier usuario registrado
 * @param {{redirectPath: string}} props
 * @returns
 */
const PrivateRoute = ({ redirectPath }) => {
  const { user, isAuthReady } = useAuth();
  if (isAuthReady && !user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export { PrivateRoute };
