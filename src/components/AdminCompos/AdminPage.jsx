import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env
function AdminPage() {
  let navigate = useNavigate()
    const [formAdmin,setFormAdmin] = useState({
      email: "",
      password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")

    let handleChange = ({target: {name, value}})=>{
      setFormAdmin({...formAdmin, [name]: value})
    }

    let handleSubmit = async (e)=>{
      try{
        e.preventDefault()

        if(!(formAdmin.email)){
          setErrorMessage("please enter the email") 
          return;
        }
  
        if(formAdmin.password.length<8){
          setErrorMessage("password must be atleast 8 characters") 
          return;
        }
  
        let response = await axios.post(`${API_BASE_URL}/admin/adminlogin`, // Use the environment variable
          formAdmin, 
          {withCredentials: true}
         )
          
         if(response.data.success){
          document.cookie = `admintoken=${response.data.token}; path=/;`;
          navigate('/Home')
         }
         else{
          setErrorMessage(response.data.message)
         }
      }
      catch(err){
        if (err.response) {
          console.error("Backend error:", err.response.data);
          setErrorMessage(err.response.data.message);
        } else 
        {
          console.error("Network error:", err.message);
          setErrorMessage("A network error occurred. Please try again.");
        }
      }
   
    }

  return (
    <Box className="trust-login-container">
      
      <Paper elevation={3} className="trust-login-paper">
        <Typography variant="h4" className="trust-login-title" >
          Admin Login
        </Typography>
        {errorMessage ? 
          <Typography variant='h5'
            style={{textAlign: "center", fontSize: "20px", color: "red", padding: "7px"}}>{errorMessage}</Typography>
          : null
        }
        <form  onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            name='email'
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
            name='password'
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
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default AdminPage;
