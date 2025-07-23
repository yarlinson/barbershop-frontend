import { useState } from 'react';
import type { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  TextField, 
  Snackbar,
  Alert
} from '@mui/material';
import type { AlertColor } from '@mui/material';
import type { RootState } from '../store';

interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
}

const Profile = (): ReactElement => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: AlertColor, text: string } | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    address: user?.address || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Aquí iría la llamada a la API para actualizar los datos
      // const response = await updateProfile(formData);
      
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
      setIsEditing(false);
    } catch (err) {
      console.error('Error al actualizar el perfil:', err);
      setMessage({ type: 'error', text: 'Error al actualizar el perfil' });
    }
  };

  const handleCloseMessage = () => {
    setMessage(null);
  };

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          No se encontró información del usuario
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Perfil de Usuario
          </Typography>
          <Button 
            variant="contained" 
            color={isEditing ? "error" : "primary"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancelar" : "Editar Perfil"}
          </Button>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Nombre"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <TextField
                fullWidth
                label="Apellido"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Box>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label="Teléfono"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              multiline
              rows={2}
            />
            {isEditing && (
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
              >
                Guardar Cambios
              </Button>
            )}
          </Box>
        </form>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" color="textSecondary">
            <strong>Rol:</strong> {user.role}
          </Typography>
        </Box>
      </Paper>

      {message && (
        <Snackbar 
          open={true} 
          autoHideDuration={6000} 
          onClose={handleCloseMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseMessage} severity={message.type}>
            {message.text}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Profile; 