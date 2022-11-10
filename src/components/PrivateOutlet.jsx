import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import React from "react";

const PrivateOutlet = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
