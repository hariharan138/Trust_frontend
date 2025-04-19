import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api';

function AdminPage() {
  const navigate = useNavigate();
  const [formAdmin, setFormAdmin] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormAdmin({ ...formAdmin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (!formAdmin.email) {
        setErrorMessage("please enter the email");
        setIsSubmitting(false);
        return;
      }

      if (formAdmin.password.length < 8) {
        setErrorMessage("password must be at least 8 characters");
        setIsSubmitting(false);
        return;
      }

      // Clear existing tokens
      const existingTokens = document.cookie
        .split("; ")
        .filter((row) => row.startsWith("admintoken="));
      existingTokens.forEach((token) => {
        document.cookie = `${token.split("=")[0]}=; Max-Age=0; path=/`;
        console.log("Cleared existing token:", token);
      });

      const response = await axios.post(
        `${API_BASE_URL}/admin/adminlogin`,
        formAdmin,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      console.log("Response data:", response.data);
      console.log("Response headers:", response.headers);

      if (response.data.success) {
        // Let the server handle cookie setting via Set-Cookie
        const serverSetCookie = response.headers["set-cookie"];
        if (serverSetCookie) {
          console.log("Server set cookie:", serverSetCookie);
          navigate("/Home");
        } else {
          // Fallback: Set cookie only if server didn't
          document.cookie = `admintoken=${response.data.token}; Max-Age=3600; path=/`;
          console.log("Client set cookie (fallback):", `admintoken=${response.data.token}`);
          navigate("/Home");
        }
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (err) {
      if (err.response) {
        console.error("Backend error:", err.response.data);
        setErrorMessage(err.response.data.message);
      } else {
        console.error("Network error:", err.message);
        setErrorMessage("A network error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="trust-login-container">
      <Paper elevation={3} className="trust-login-paper">
        <Typography variant="h4" className="trust-login-title">
          Admin Login
        </Typography>
        {errorMessage ? (
          <Typography
            variant="h5"
            style={{ textAlign: "center", fontSize: "20px", color: "red", padding: "7px" }}
          >
            {errorMessage}
          </Typography>
        ) : null}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            name="email"
            required
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            value={formAdmin.email}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            name="password"
            required
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            value={formAdmin.password}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="trust-login-button"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default AdminPage;
