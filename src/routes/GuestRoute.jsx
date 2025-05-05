import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate } from "react-router-dom";

/**
 *
 * @param {{children: import("react").ReactNode}} props
 * @returns
 */
const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/movies" replace />;
  }

  return children;
};

export default GuestRoute;
