import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import NotFound from "../../components/Not Found/NotFound";
import { AuthRoute } from "../../components/AuthRoute/AuthRoute";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  return user.isAdmin ? (
    children
  ) : (
    <NotFound
      linkRoute="/dashboard"
      linkText="Return to dashboard"
      message="Yoy don't have access to this page"
    />
  );
};

const ExportAdmin = ({ children }) => (
  <AuthRoute>
    <AdminRoute>{children}</AdminRoute>
  </AuthRoute>
);

export default ExportAdmin;
