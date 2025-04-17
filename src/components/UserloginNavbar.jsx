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
    IconButton,
    Alert,
  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const UserloginNavbar = () => {

    let navigate = useNavigate()

  return (
    <div>
             <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Login
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>
            Contact Us
          </Button>
          <Button color="inherit" onClick={() => navigate('/user')}>
            Registration
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default UserloginNavbar