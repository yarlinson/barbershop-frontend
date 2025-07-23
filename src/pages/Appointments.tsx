import { Box, Typography, Paper } from '@mui/material';

const Appointments = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Mis Citas
        </Typography>
        <Typography variant="body1">
          Próximamente: Sistema de gestión de citas
        </Typography>
      </Paper>
    </Box>
  );
};

export default Appointments; 