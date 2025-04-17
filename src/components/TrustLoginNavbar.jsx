import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Grid,
  Alert,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const TrustLoginNavbar = () => {

  let navigate = useNavigate()
  return (
    <div>
         <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Trust Login
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>
            Contact Us
          </Button>
          <Button color="inherit" onClick={() => navigate('/trust')}>
            Registration
          </Button>
        </Toolbar>
      </AppBar>

    </div>
  )
}

export default TrustLoginNavbar