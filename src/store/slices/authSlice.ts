import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'client' | 'barber' | 'admin';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Recuperar el estado inicial del localStorage
const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        isAuthenticated: false,
        user: null,
        token: null,
      };
    }
    return JSON.parse(serializedState);
  } catch {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Guardar en localStorage
      localStorage.setItem('authState', JSON.stringify({
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Limpiar localStorage
      localStorage.removeItem('authState');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer; 