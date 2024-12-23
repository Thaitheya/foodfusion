import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
};
