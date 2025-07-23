import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Link,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
} from '@mui/material';
import { AuthCard } from '../components/AuthCard';
import { useForm } from '../hooks/useForm';
import authService from '../services/authService';
import type { RegisterData } from '../services/authService';
import { setCredentials } from '../store/slices/authSlice';

type RegisterForm = {
  [K in keyof RegisterData]: string;
};

const validationRules = {
  username: {
    required: true,
    minLength: 3,
  },
  first_name: {
    required: true,
    minLength: 2,
  },
  last_name: {
    required: true,
    minLength: 2,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 6,
  },
  role: {
    required: true,
    custom: (value: string) => ['client', 'barber'].includes(value),
  },
  phone_number: {
    required: true,
    pattern: /^\+?\d{10,13}$/,
  },
  address: {
    required: true,
    minLength: 5,
  },
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { formData, errors, handleChange, validateForm, resetForm } = useForm<RegisterForm>(
    {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: '',
      phone_number: '',
      address: '',
    },
    validationRules
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await authService.register(formData as RegisterData);
      console.log('Registro exitoso:', response);
      
      // Guardar credenciales en Redux y localStorage
      dispatch(setCredentials({
        user: {
          ...response.user,
          role: response.user.role as 'client' | 'barber' | 'admin'
        },
        token: response.token
      }));
      localStorage.setItem('token', response.token);
      
      // Redirigir inmediatamente después del registro exitoso
      navigate('/', { replace: true });
      
    } catch (err) {
      setError('Error al registrar usuario. Por favor, verifica tus datos.');
    }
  };

  return (
    <>
      <AuthCard title="Registro">
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

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Nombre de Usuario"
                name="username"
                autoComplete="username"
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="first_name"
                label="Nombre"
                name="first_name"
                autoComplete="given-name"
                value={formData.first_name}
                onChange={handleChange}
                error={!!errors.first_name}
                helperText={errors.first_name}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Apellido"
                name="last_name"
                autoComplete="family-name"
                value={formData.last_name}
                onChange={handleChange}
                error={!!errors.last_name}
                helperText={errors.last_name}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone_number"
                label="Número de Teléfono"
                name="phone_number"
                autoComplete="tel"
                value={formData.phone_number}
                onChange={handleChange}
                error={!!errors.phone_number}
                helperText={errors.phone_number || "Formato: +573001234567"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Dirección"
                name="address"
                autoComplete="street-address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl 
                fullWidth 
                error={!!errors.role}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              >
                <InputLabel id="role-label">Tipo de Usuario</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  label="Tipo de Usuario"
                  onChange={handleChange}
                >
                  <MenuItem value="client">Cliente</MenuItem>
                  <MenuItem value="barber">Barbero</MenuItem>
                </Select>
                {errors.role && (
                  <Box 
                    component="span" 
                    sx={{ 
                      color: 'error.main', 
                      fontSize: '0.75rem', 
                      mt: 0.5,
                      ml: 2,
                    }}
                  >
                    {errors.role}
                  </Box>
                )}
              </FormControl>
            </Grid>
          </Grid>

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
            Registrarse
          </Button>

          <Box 
            sx={{ 
              textAlign: 'center',
              mt: 2,
            }}
          >
            <Link 
              component={RouterLink} 
              to="/login" 
              variant="body1"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </Box>
        </Box>
      </AuthCard>

      <Snackbar
        open={false} // Removed success state as it's now handled by immediate navigation
        autoHideDuration={2000}
        message="Registro exitoso. Redirigiendo..."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default Register; 