import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Aquí irá el Navbar cuando lo creemos */}
      <Box component="main" sx={{ padding: 3 }}>
        <Outlet />
      </Box>
      {/* Aquí irá el Footer cuando lo creemos */}
    </Box>
  );
};

export default MainLayout; 