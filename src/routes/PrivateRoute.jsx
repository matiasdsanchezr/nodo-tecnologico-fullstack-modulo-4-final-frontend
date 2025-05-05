import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate } from "react-router-dom";

/**
 *
 * @param {{children: import("react").ReactNode}} props
 * @returns
 */
const PrivateRoute = ({ children }) => {
  const { user, isAuthReady } = useAuth();
  if (isAuthReady && !user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
