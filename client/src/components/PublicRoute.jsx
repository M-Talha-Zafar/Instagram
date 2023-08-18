import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  return isLoading ? null : isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
