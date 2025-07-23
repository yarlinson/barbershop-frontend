import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#1a1a1a',
        width: '100%'
      }}
    >
      <Box 
        sx={{ 
          maxWidth: '1920px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <Toolbar 
          disableGutters 
          sx={{ 
            justifyContent: 'space-between',
            minHeight: { xs: '64px', sm: '72px' },
            px: { xs: 2, sm: 3, md: 4 },
            width: '100%'
          }}
        >
          {/* Logo y nombre */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              mr: { xs: 2, sm: 4 }
            }} 
            onClick={() => navigate('/')}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }
              }}
            >
              BARBERSHOP
            </Typography>
          </Box>

          {/* Menú central */}
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2, md: 4 },
            flex: 1,
            justifyContent: 'center'
          }}>
            <Button
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ 
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                textTransform: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                px: { xs: 1, sm: 2, md: 3 }
              }}
            >
              Inicio
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/services')}
              sx={{ 
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                textTransform: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                px: { xs: 1, sm: 2, md: 3 }
              }}
            >
              Servicios
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/barbers')}
              sx={{ 
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                textTransform: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                px: { xs: 1, sm: 2, md: 3 }
              }}
            >
              Barberos
            </Button>
          </Box>

          {/* Botones de autenticación y menú de usuario */}
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 },
            ml: { xs: 2, sm: 4 },
            alignItems: 'center'
          }}>
            {isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenuOpen}
                  endIcon={<KeyboardArrowDownIcon />}
                  startIcon={<PersonIcon />}
                  sx={{ 
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                    textTransform: 'none',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    px: { xs: 2, sm: 3 }
                  }}
                >
                  {user?.name || 'Usuario'}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {/* Rutas específicas según el rol */}
                  {user?.role === 'client' && (
                    <MenuItem onClick={() => handleMenuClick('/appointments')}>
                      Mis Citas
                    </MenuItem>
                  )}
                  {user?.role === 'barber' && (
                    <MenuItem onClick={() => handleMenuClick('/barber/schedule')}>
                      Mi Horario
                    </MenuItem>
                  )}
                  {user?.role === 'admin' && (
                    <MenuItem onClick={() => handleMenuClick('/admin/dashboard')}>
                      Panel de Administración
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                    textTransform: 'none',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    px: { xs: 2, sm: 3 }
                  }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    border: '1px solid white',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                    textTransform: 'none',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    px: { xs: 2, sm: 3 }
                  }}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar; 