import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate } from "react-router-dom";

/**
 *
 * @param {{children: import("react").ReactNode}} props
 * @returns
 */
const PrivateRoute = ({ children }) => {
  const { selectedProfile, isAuthReady } = useAuth();
  if (isAuthReady && !selectedProfile) {
    return <Navigate to="/profiles" replace />;
  }

  return children;
};

export default PrivateRoute;
