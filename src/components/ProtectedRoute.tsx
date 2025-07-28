import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Snackbar, Alert, AlertTitle, Box } from '@mui/material';
import { useState, useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: ('client' | 'barber' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (isAuthenticated && roles && user && !roles.includes(user.role)) {
      setErrorTitle('Acceso Denegado');
      setErrorMessage(`No tienes permisos para acceder a esta sección. Tu rol actual es: ${user.role}`);
      setShowError(true);
      // Programar la redirección después de 2 segundos
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (!isAuthenticated) {
      setErrorTitle('Autenticación Requerida');
      setErrorMessage('Debes iniciar sesión para acceder a esta sección');
      setShowError(true);
      // Programar la redirección después de 2 segundos
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, roles, user]);

  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowError(false);
  };

  const renderError = () => (
    <Snackbar 
      open={showError} 
      autoHideDuration={6000} 
      onClose={handleCloseError}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ maxWidth: '600px', width: '100%' }}
    >
      <Alert 
        onClose={handleCloseError} 
        severity="error" 
        variant="filled"
        sx={{ 
          width: '100%',
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <AlertTitle>{errorTitle}</AlertTitle>
        {errorMessage}
        <div style={{ marginTop: '8px', fontSize: '0.9em' }}>
          Serás redirigido en 2 segundos...
        </div>
      </Alert>
    </Snackbar>
  );

  if (!isAuthenticated) {
    return (
      <Box>
        {shouldRedirect && <Navigate to="/login" state={{ from: location }} replace />}
        {renderError()}
      </Box>
    );
  }

  if (roles && user && !roles.includes(user.role)) {
    return (
      <Box>
        {shouldRedirect && <Navigate to="/" replace />}
        {renderError()}
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 