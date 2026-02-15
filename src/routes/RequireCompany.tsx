import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RequireCompanyProps {
  children: ReactNode;
}

const RequireCompany = ({ children }: RequireCompanyProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (!user || user.role !== "company") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default RequireCompany;
