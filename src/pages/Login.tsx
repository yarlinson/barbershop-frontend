import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField, Link, Alert } from '@mui/material';
import { AuthCard } from '../components/AuthCard';
import { useForm } from '../hooks/useForm';
import authService from '../services/authService';
import type { LoginCredentials } from '../services/authService';
import { setCredentials } from '../store/slices/authSlice';

type LoginForm = {
  [K in keyof LoginCredentials]: string;
};

const validationRules = {
  username: {
    required: true,
    minLength: 3,
  },
  password: {
    required: true,
    minLength: 6,
  },
};

const initialFormState: LoginForm = {
  username: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { formData, errors, handleChange, validateForm } = useForm<LoginForm>(
    initialFormState,
    validationRules
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await authService.login(formData);
      dispatch(setCredentials({
        user: {
          ...response.user,
          role: response.user.role as 'client' | 'barber' | 'admin'
        },
        token: response.access // Usamos el token de acceso
      }));
      navigate('/', { replace: true });
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <AuthCard title="Iniciar Sesión">
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        noValidate
        sx={{
          width: '100%',
          mt: 1,
        }}
      >
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              borderRadius: 1,
            }}
          >
            {error}
          </Alert>
        )}
        
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Nombre de Usuario"
          name="username"
          autoComplete="username"
          autoFocus
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            },
          }}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            },
          }}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            mb: 2,
            borderRadius: 1,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          Iniciar Sesión
        </Button>
        
        <Box 
          sx={{ 
            textAlign: 'center',
            mt: 2,
          }}
        >
          <Link 
            component={RouterLink} 
            to="/register" 
            variant="body1"
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </Box>
      </Box>
    </AuthCard>
  );
};

export default Login; 