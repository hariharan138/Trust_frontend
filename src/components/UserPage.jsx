import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import UploadFileIcon from '@mui/icons-material/UploadFile';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env

function UserPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    address: '',
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    console.log(formData);

    const { name, value, type, files } = e.target;

  if (name === 'image') {
    const file = files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  } else {
    // console.log(value)
    setFormData({ ...formData, [name]: value });
  }
}

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('profile', formData.image); // Attach the image file
    formDataToSend.append('Name', `${formData.firstName} ${formData.lastName}`)
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phoneNumber);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmPassword', formData.confirmPassword)
    formDataToSend.append('address', formData.address);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/registeruser`,
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setSuccessMessage(response.data.message || 'Registration successful!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        address: '',
        image: null,
      });
      setImagePreview(null);

      setTimeout(() => navigate('/userlogin'), 2000);
    } catch (error) {
      console.log(error)
      console.log(error.message)
      console.log(error.response.data.message)
      setErrorMessage(error.response?.data?.error || 'Something went wrong!');
    }
  };


  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>
            Contact Us
          </Button>
          <Button color="inherit" onClick={() => navigate('/userlogin')}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          padding: 2,
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '85%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Registration Form
          </Typography>

          {/* {errorMessage && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {errorMessage || "An unknown error occurred!"}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              {successMessage || "Registration successful!"}
            </Alert>
          )} */}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  // required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="password"
                  value={formData.password}
                  onChange={(e)=> handleChange(e)}
                  fullWidth
                  label="Password"
                  type="text"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  label="Confirm Password"
                  type="text"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  label="Address"
                  type="text"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  Upload Trust Document (Image)
                </Typography>
                <Box
                  sx={{
                    border: '2px dashed #1976d2',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
                  }}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  {imagePreview ? (
                    <Box>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '150px',
                          marginBottom: '8px',
                        }}
                      />
                      <Typography variant="body2" color="textSecondary">
                        Click to change the image
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <IconButton color="primary">
                        <UploadFileIcon fontSize="large" />
                      </IconButton>
                      <Typography variant="body2" color="textSecondary">
                        Click to upload an image
                      </Typography>
                    </Box>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    name="image"
                    // accept="image/*"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    padding: 1.5,
                    backgroundColor: '#1976d2',
                    width: '25%',
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );

}

export default UserPage;