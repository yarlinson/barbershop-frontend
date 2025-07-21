import axios, { AxiosError } from 'axios';

// Asegurarnos de que la URL de la API esté definida
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

if (!API_URL) {
  console.error('API_URL no está definida en las variables de entorno');
}

console.log('API URL configurada:', API_URL);

export interface LoginCredentials {
  username: string;  // Cambiado de email a username
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'client' | 'barber';
  phone_number: string;
  address: string;
}

export interface AuthResponse {
  access: string;    // Token de acceso JWT
  refresh: string;   // Token de refresco JWT
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    phone_number: string;
    address: string;
  };
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    console.log('Intentando login con:', credentials);
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, credentials);
      console.log('Respuesta de login:', response.data);
      
      // Guardar ambos tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error de login:', {
          status: error.response?.status,
          data: error.response?.data,
        });
      }
      throw error;
    }
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    console.log('Iniciando registro con datos:', data);
    const url = `${API_URL}/auth/register/`;
    console.log('URL de registro:', url);
    
    try {
      const response = await axios.post(url, data);
      console.log('Respuesta completa del servidor:', response);
      
      // Si la respuesta no tiene el formato esperado, intentamos adaptarla
      if (!response.data.access || !response.data.user) {
        console.log('Respuesta en formato diferente, adaptando...');
        return {
          access: response.data.access || '',
          refresh: response.data.refresh || '',
          user: {
            id: response.data.id || 0,
            username: data.username,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            role: data.role,
            phone_number: data.phone_number,
            address: data.address
          }
        };
      }
      
      // Guardar tokens si el registro fue exitoso
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error detallado del registro:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data
          }
        });

        // Si el usuario se creó pero hay un error en la respuesta, intentamos hacer login
        if (error.response?.status === 400 && error.response?.data?.email) {
          console.log('Intentando login después de registro...');
          try {
            const loginResponse = await authService.login({
              username: data.username,
              password: data.password
            });
            return loginResponse;
          } catch (loginError) {
            console.error('Error en login después de registro:', loginError);
            throw error;
          }
        }
      } else {
        console.error('Error inesperado:', error);
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  getCurrentUser: (): AuthResponse['user'] | null => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload).user;
    } catch {
      return null;
    }
  },
};

export default authService; 