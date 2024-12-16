import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  permission: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, permission, ...rest }) => {
  const { hasPermission } = useAuth();

  return hasPermission(permission) ? <Component {...rest} /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;