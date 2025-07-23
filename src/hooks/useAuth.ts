import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import authService from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token && authService.isTokenValid()) {
        try {
          // Hacer una petición al backend para obtener los datos del usuario
          const response = await fetch('http://localhost:8000/api/auth/user/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const user = await response.json();
            dispatch(setCredentials({ user, token }));
          } else {
            // Si hay un error, limpiar el almacenamiento local
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
        } catch (error) {
          console.error('Error al inicializar la autenticación:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
    };

    initializeAuth();
  }, [dispatch]);
}; 