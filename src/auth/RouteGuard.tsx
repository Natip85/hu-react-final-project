import React, { ReactNode } from "react";
import { verifyToken } from "./TokenManager";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const RouteGuard = ({ children }: Props) => {
  return verifyToken() ? (
    
    <>{children}</>
  ) : (
    <Navigate to="/login" replace={true} />
  );
  
};

export default RouteGuard;
