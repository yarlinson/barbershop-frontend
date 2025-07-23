import { Box, Typography, Paper } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Panel de Administración
        </Typography>
        <Typography variant="body1">
          Próximamente: Dashboard administrativo
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminDashboard; 