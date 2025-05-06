import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Route disponible solo para usuarios sin autenticar
 * @param {{redirectPath: string}} props
 * @returns
 */
export const GuestRoute = ({ redirectPath }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

