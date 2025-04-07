import { Navigate } from "react-router-dom";
import RouteLayout from "./RouteLayout";
import { checkAuth } from "../../shared/lib/checkAuth";

const PrivateRoute: React.FC = () => {
  const isAuth = checkAuth();

  return isAuth ? <RouteLayout isAuthPage={false} /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;