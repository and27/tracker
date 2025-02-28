import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const isAuthenticated = () => {
  const userId = localStorage.getItem("userId");
  return !!userId;
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Layout /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
