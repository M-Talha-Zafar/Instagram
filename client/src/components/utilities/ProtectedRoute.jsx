import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  return isLoading ? null : !isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    <Layout>{children}</Layout>
  );
};

export default ProtectedRoute;
