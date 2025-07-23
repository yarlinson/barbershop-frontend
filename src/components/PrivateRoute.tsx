import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import authService from '../services/authService';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: ('client' | 'barber' | 'admin')[];
}

export const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Verificar el token y el estado actual
  const token = localStorage.getItem('access_token');
  const isTokenValid = authService.isTokenValid();

  // Si no hay token o no es válido, redirigir a login
  if (!token || !isTokenValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si no está autenticado en Redux o no hay usuario, redirigir a login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si se especifican roles y el usuario no tiene el rol requerido
  if (roles && !roles.includes(user.role as 'client' | 'barber' | 'admin')) {
    return <Navigate to="/?access=denied" replace />;
  }

  // Si todo está bien, mostrar el contenido
  return <>{children}</>;
}; 