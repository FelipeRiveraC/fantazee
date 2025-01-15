// src/routes/GuestRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuestRoute: React.FC = () => {
  const { token } = useAuth();

  if (token) {
    // Si el usuario está autenticado, redirige al Home
    return <Navigate to="/" replace />;
  }

  // Si no está autenticado, renderiza el componente hijo (ej. Login)
  return <Outlet />;
};

export default GuestRoute;
