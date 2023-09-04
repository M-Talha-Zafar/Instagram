import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ROUTE_HOME } from "../../utilities/routeNames";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  return isLoading ? null : isAuthenticated ? (
    <Navigate to={ROUTE_HOME} />
  ) : (
    children
  );
};

export default PublicRoute;
