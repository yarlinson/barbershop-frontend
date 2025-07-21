import { CardContent, CardHeader, Container, Paper } from '@mui/material';
import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  children: ReactNode;
}

export const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <CardHeader
            title={title}
            sx={{
              width: '100%',
              textAlign: 'center',
              pb: 2,
              '& .MuiCardHeader-title': {
                fontSize: '2rem',
                fontWeight: 600,
                color: 'primary.main',
              },
            }}
          />
          <CardContent 
            sx={{ 
              width: '100%',
              p: 0,
            }}
          >
            {children}
          </CardContent>
        </Paper>
      </Container>
    </Container>
  );
}; 