import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const AdminGuard = ({ children }: Props) => {

  function isNotAdmin(): boolean {
    const admin = localStorage.getItem('admin')
    return !admin || admin === 'false'
  }

  return isNotAdmin() ? <Navigate to="/login" replace={true} /> : <>{children}</>;
};

export default AdminGuard;
