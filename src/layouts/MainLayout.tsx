import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Navbar />
      <Container 
        component="main" 
        maxWidth={false}
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 2, sm: 3, md: 4 },
          py: 3,
        }}
      >
        <Outlet />
      </Container>
      {/* Aquí irá el Footer cuando lo creemos */}
    </Box>
  );
};

export default MainLayout; 