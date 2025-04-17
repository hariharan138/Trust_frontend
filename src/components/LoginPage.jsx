import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Typography, 
  Grid, 
  Container,
  ThemeProvider,
  createTheme,
  Paper,
  Zoom,
  Grow
} from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import "./LoginPage.css"

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 30px',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
          },
        },
      },
    },
  },
});

function LoginPage() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleLogin = (path) => {
    navigate(path);
  };

  const cardData = [
    { 
      title: 'Trust', 
      icon: <VolunteerActivismIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />, 
      path: '/trustlogin', 
      description: 'Manage trust-related activities and oversee operations.',
      color: '#3f51b5'
    },
    { 
      title: 'User', 
      icon: <PeopleIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />, 
      path: '/userlogin', 
      description: 'Access your personal account and manage your profile.',
      color: '#4caf50'
    },
    { 
      title: 'Admin', 
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />, 
      path: '/admin', 
      description: 'Control and manage the entire platform and its users.',
      color: '#f50057'
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'background.default',
          padding: 3,
          backgroundImage: 'linear-gradient(45deg, #3f51b5 0%, #f50057 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Paper elevation={3} sx={{ padding: 6, borderRadius: 4, backgroundColor: 'background.paper' }}>
              <Typography
                variant="h2"
                align="center"
                gutterBottom
                sx={{
                  marginBottom: 6,
                  color: 'primary.main',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Welcome to Our Platform
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {cardData.map((card, index) => (
                  <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={1000 + index * 500}
                    key={index}
                  >
                    <Grid item xs={12} sm={6} md={4}>
                      <Card 
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          backgroundColor: hoveredCard === index ? `${card.color}22` : 'background.paper',
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center', padding: 4 }}>
                          {React.cloneElement(card.icon, {
                            sx: {
                              fontSize: 80,
                              color: hoveredCard === index ? card.color : theme.palette.primary.main,
                              transition: 'all 0.3s ease-in-out',
                            }
                          })}
                          <Typography variant="h5" component="h2" sx={{ color: 'primary.main', my: 2, fontWeight: 'bold' }}>
                            {card.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {card.description}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', pb: 4 }}>
                          <Button
                            variant="contained"
                            onClick={() => handleLogin(card.path)}
                            sx={{
                              backgroundColor: card.color,
                              '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                                transform: 'scale(1.05)',
                              },
                            }}
                          >
                            Login as {card.title}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grow>
                ))}
              </Grid>
            </Paper>
          </Zoom>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;

 