import { Navigate } from "react-router-dom";
import RouteLayout from "./RouteLayout";
// import { useAuth } from "../../shared/hooks/useAuth";

const PrivateRoute: React.FC = () => {
  // const { isAuth } = useAuth();
  const isAuth = false;

  return isAuth ? <RouteLayout isAuthPage={false} /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;