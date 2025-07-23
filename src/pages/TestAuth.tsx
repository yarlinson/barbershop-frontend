import { Button, Container, Typography, Stack, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';

const TestAuth = () => {
  const dispatch = useDispatch();

  const loginAs = (role: 'client' | 'barber' | 'admin') => {
    // Simular login con diferentes roles
    dispatch(setCredentials({
      user: {
        id: 1,
        email: `test${role}@example.com`,
        name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
        role: role
      },
      token: 'fake-jwt-token'
    }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Página de Prueba - Autenticación
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          Usa estos botones para probar diferentes roles de usuario y la protección de rutas.
        </Typography>

        <Stack spacing={2}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => loginAs('client')}
            fullWidth
          >
            Iniciar sesión como Cliente
          </Button>

          <Button 
            variant="contained" 
            color="secondary"
            onClick={() => loginAs('barber')}
            fullWidth
          >
            Iniciar sesión como Barbero
          </Button>

          <Button 
            variant="contained" 
            color="success"
            onClick={() => loginAs('admin')}
            fullWidth
          >
            Iniciar sesión como Administrador
          </Button>
        </Stack>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Instrucciones de prueba:
        </Typography>

        <Typography component="div" sx={{ mb: 2 }}>
          1. Selecciona un rol haciendo clic en uno de los botones de arriba
          <br />
          2. Usa el menú de usuario en la barra de navegación para ver las opciones disponibles
          <br />
          3. Intenta acceder a las siguientes rutas para probar la protección:
          <ul>
            <li>/appointments (solo para clientes)</li>
            <li>/barber/schedule (solo para barberos)</li>
            <li>/admin/dashboard (solo para administradores)</li>
          </ul>
          4. Observa los mensajes de error cuando intentes acceder a rutas no autorizadas
        </Typography>
      </Paper>
    </Container>
  );
};

export default TestAuth; 