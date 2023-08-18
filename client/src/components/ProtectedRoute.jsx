import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  return isLoading ? null : !isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

export default ProtectedRoute;
