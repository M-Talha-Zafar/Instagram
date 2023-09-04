import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ROUTE_LOGIN } from "../../utilities/routeNames";
import Layout from "./Layout";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  return isLoading ? null : !isAuthenticated ? (
    <Navigate to={ROUTE_LOGIN} />
  ) : (
    <Layout>{children}</Layout>
  );
};

export default ProtectedRoute;
