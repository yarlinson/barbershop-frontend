import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import TestAuth from '../pages/TestAuth';
import Services from '../pages/Services';

// Rutas públicas y protegidas
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      // Ruta de prueba
      {
        path: '/test-auth',
        element: <TestAuth />,
      },
      // Ruta de servicios
      {
        path: '/services',
        element: <Services />,
      },
      // Rutas protegidas para clientes
      {
        path: '/appointments',
        element: (
          <ProtectedRoute roles={['client']}>
            <div>Mis Citas</div>
          </ProtectedRoute>
        ),
      },
      // Rutas protegidas para barberos
      {
        path: '/barber/schedule',
        element: (
          <ProtectedRoute roles={['barber']}>
            <div>Mi Horario</div>
          </ProtectedRoute>
        ),
      },
      // Rutas protegidas para administradores
      {
        path: '/admin/dashboard',
        element: (
          <ProtectedRoute roles={['admin']}>
            <div>Panel de Administración</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
]); 