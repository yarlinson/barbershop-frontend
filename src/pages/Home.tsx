import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import authService from '../services/authService';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Redirigir a login si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  if (!isAuthenticated || !user) {
    return null; // No mostrar nada mientras se redirige
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'grey.100',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          ¡Bienvenido {user.first_name}!
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Información del Usuario:
          </Typography>
          <Typography>
            <strong>Nombre completo:</strong> {user.first_name} {user.last_name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography>
            <strong>Rol:</strong> {user.role === 'client' ? 'Cliente' : 'Barbero'}
          </Typography>
          <Typography>
            <strong>Teléfono:</strong> {user.phone_number}
          </Typography>
          <Typography>
            <strong>Dirección:</strong> {user.address}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="error"
          sx={{ mt: 4 }}
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </Paper>
    </Box>
  );
};

export default Home; 