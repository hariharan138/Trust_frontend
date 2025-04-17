import React from "react";
import {
  Button,
  Typography,
  Container,
  Box,
  Stack,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#f0f4f8",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 900,
      textShadow: "2px 4px 6px rgba(0, 0, 0, 0.3)",
    },
    body1: {
      fontSize: "1.2rem",
      color: "#5f6368",
    },
  },
});

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #1e88e5 10%, #90caf9 80%, #e3f2fd 100%)",
          padding: 4,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            textAlign: "center",
            animation: "fadeIn 1.5s ease-in-out",
          }}
        >
          <RocketLaunchIcon
            sx={{
              fontSize: 100,
              color: "#ffffff",
              marginBottom: 3,
              animation: "bounce 2s infinite, colorChange 4s infinite",
            }}
          />
          <Typography
            variant="h1"
            color="white"
            gutterBottom
            sx={{ animation: "fadeInText 2s ease-in-out" }}
          >
            Welcome to Our Trust Application
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 4,
              color: "#fefefe",
              maxWidth: "80%",
              margin: "auto",
              lineHeight: 1.8,
              animation: "fadeInText 2.5s ease-in-out",
            }}
          >
            Experience cutting-edge features and seamless interactions. Join us
            on an amazing journey today!
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ marginBottom: 4 }}
          >
            <Tooltip title="Click to start your journey!" arrow>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "12px 36px",
                  fontSize: "1rem",
                  boxShadow: "0px 5px 15px rgba(25, 118, 210, 0.6)",
                  animation: "fadeIn 2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                    boxShadow: "0px 7px 20px rgba(21, 101, 192, 0.7)",
                    transform: "scale(1.05) rotate(3deg)",
                  },
                }}
                onClick={() => navigate("/LoginPage")}
                endIcon={<ArrowForwardIcon />}
              >
                Get Started
              </Button>
            </Tooltip>
          </Stack>
          <Card
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "20px",
              marginTop: 3,
              maxWidth: 600,
              margin: "auto",
              animation: "slideUp 1.5s ease-in-out",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Why Choose Us?
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ✔ Cutting-edge technology and tools for all users. <br />
                ✔ Fast, secure, and reliable platform. <br />
                ✔ Exceptional support available 24/7.
              </Typography>
            </CardContent>
          </Card>
        </Container>
        {/* Keyframes for animations */}
        <style>
          {`
            @keyframes colorChange {
              0% { color: #ffffff; }
              50% { color: #ffcc00; }
              100% { color: #ffffff; }
            }
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
              }
              40% {
                transform: translateY(-15px);
              }
              60% {
                transform: translateY(-7px);
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes fadeInText {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes slideUp {
              from {
                transform: translateY(50px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}
        </style>
      </Box>
    </ThemeProvider>
  );
};

export default WelcomePage;
