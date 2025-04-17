import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Grid,
} from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env
const ContactUs = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "", // Renamed to match the input field name
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    // Clear the error message if the user starts typing again
    if (errorMessage) setErrorMessage("");

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, formData); // Adjusted the endpoint
      alert(response.data.message);

      // Clear form data after submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        description: "", // Reset the description field
      });

      navigate("/thank-you"); // Redirect to a thank-you page after submission
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Contact Us
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>Contact Us</Button>
          <Button color="inherit" onClick={() => navigate('/userlogin')}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Contact Us Form */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: 2,
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "85%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us Form
          </Typography>

          {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}

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
                  required
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  label="Description"
                  type="text"
                  variant="outlined"
                  required
                  multiline
                  rows={4} // Makes the description field larger
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ padding: 1.5, backgroundColor: "#1976d2" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default ContactUs;
