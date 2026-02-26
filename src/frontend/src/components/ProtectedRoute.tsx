import { useAuthContext } from "../store/AuthContext";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRoutes{
  children: ReactNode;
}

const ProtectedRoute = ({children} : ProtectedRoutes) => {
  const { isAuthenticated } = useAuthContext();

  if(!isAuthenticated){
    return <Navigate to="/login" />
  }
  return children;
}

export default ProtectedRoute;