import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Plus, Minus, HandHeart, SendHorizontal, LogOut, Search, Bell } from 'lucide-react';
import { Button, IconButton, TextField, Avatar, Typography, Paper, Grid, Switch, Checkbox } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Remove this duplicate import:
// import { Checkbox } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserProvider';
import "./User.css"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env
const Users = () => {
  const navigate = useNavigate();
  const { getProfileData } = useContext(UserContext);

  const [profileData, setProfileData] = useState(null);
  const [trusts, setTrusts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isVeg, setIsVeg] = useState(true);
  const [totalTrust, setTotalTrust] = useState(null);
  const [totalTrustLoading, setTotalTrustLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTrust, setSelectedTrust] = useState([]);
  const [createFoodDetail, setCreateFoodDetail] = useState({
    fromUserId: "",
    noOfPeople: 1,
    veg: true,
    preferred: [],
  });
  const [successfullyCreated, setSuccessfullyCreated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    getProfileData().then(res => {
      setProfileData(res);
    });
  }, [getProfileData]);

  useEffect(() => {
    setCreateFoodDetail(prev => ({
      ...prev,
      fromUserId: profileData?._id,
      noOfPeople: quantity,
      veg: isVeg,
      preferred: selectedTrust
    }));
  }, [profileData, selectedTrust, quantity, isVeg]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) ? 0 : value);
  };

  const toggleVeg = () => {
    setIsVeg(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/user/logoutuser`, {}, {
        withCredentials: true
      });
      if (data.msg) {
        navigate('/');
      }
    } catch (err) {
      console.error(err?.response?.data?.message || err?.data?.msg);
    }
  };

  const handlePageChange = (action) => {
    if (action === "prev" && pageNo > 1) {
      setPageNo(prev => prev - 1);
    }
    if (action === "next") {
      setPageNo(prev => prev + 1);
    }
  };

  const getTotalTrust = async () => {
    setTotalTrustLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/user/getnooftrust`, {
        withCredentials: true
      });
      if (data?.data) {
        setTotalTrust(data?.data);
      }
    } catch (err) {
      console.error(err.response?.data?.msg);
    } finally {
      setTotalTrustLoading(false);
    }
  };

  useEffect(() => {
    getTotalTrust();
  }, []);

  const handleSelectTrust = (id, { target: { checked } }) => {
    if (!selectedTrust.includes(id) && checked && selectedTrust.length < 5) {
      setSelectedTrust(prev => [...prev, id]);
    } else if (selectedTrust.includes(id) && !checked) {
      setSelectedTrust(prev => prev.filter(ele => ele !== id));
    }
  };

const createFoodOrder = async () => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/user/foodRegister`, 
      createFoodDetail,
      {
        headers: {
          Authorization: `Bearer ${getCookie('userlogintoken')}`  // Add token for authorization
        },
        withCredentials: true
      }
    );

    if (data?.data) {
      setSuccessfullyCreated(data?.msg === "food created");
      toast.success('The food order has been placed.', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        setSuccessfullyCreated(false);
      }, 2000);
    }
  } catch (err) {
    console.error(err.response?.data?.msg || err);
    toast.error('Failed to place food order. Please try again.', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } finally {
    setCreateFoodDetail({ ...createFoodDetail, preferred: [], noOfPeople: 0 });
  }
};

  const getTrust = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/user/searchtrust?search=`, {
        withCredentials: true
      });
      if (data?.data) {
        setTrusts(data?.data);
      }
    } catch (err) {
      console.error(err.response?.data?.message || 'Error fetching trusts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrust();
  }, []);

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/user/searchtrust?search=${searchQuery}&page=${pageNo}`, {
        withCredentials: true,
      });
      if (data?.data) {
        setSearchError("");
        setHasNext(data?.data.length < 10);
        setTrusts(data?.data);
      }
    } catch (err) {
      console.error(err);
      setSearchError(err.response?.data?.message || 'Failed to fetch trusts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, pageNo]);

  useEffect(() => {
    handleSearch();
  }, [pageNo, handleSearch]);
// If handleSearch is not memoized, consider using useCallback for handleSearch

  const handleNotificationRedirect = () => {
    navigate('/notification');
  };

  return (
    <div className="user-dashboard">
      <Paper elevation={3} className="dashboard-header">
        <Typography variant="h4" component="h1">User Dashboard</Typography>
        <div className="header-actions">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Trust..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch} size="small">
                  <Search />
                </IconButton>
              ),
            }}
          />
          <IconButton onClick={handleNotificationRedirect}>
            <Bell />
          </IconButton>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LogOut />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Paper>

      <div className="dashboard-content">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="card">
              <div className="card-header">
                <Typography variant="h6">Total Trust</Typography>
                <HandHeart className="card-icon" />
              </div>
              <Typography variant="h3" className="card-value">
                {totalTrustLoading ? "Loading..." : totalTrust}
              </Typography>
              {successfullyCreated && (
                <Typography variant="body2" color="success.main">
                  Food order created successfully
                </Typography>
              )}
              <div className="quantity-control">
                <Typography variant="subtitle1">Quantity:</Typography>
                <div className="quantity-input-wrapper">
                  <IconButton onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                    <Minus />
                  </IconButton>
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    size="small"
                  />
                  <IconButton onClick={() => setQuantity(prev => prev + 1)}>
                    <Plus />
                  </IconButton>
                </div>
              </div>
              <div className="toggle-control">
                <Typography variant="subtitle1">
                  {isVeg ? 'Vegetarian' : 'Non-vegetarian'}
                </Typography>
                <Switch
                  checked={isVeg}
                  onChange={toggleVeg}
                  color="primary"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<SendHorizontal />}
                onClick={createFoodOrder}
              >
                Send Food Availability
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} className="card">
              <div className="card-header">
                <Typography variant="h6">All Trusts</Typography>
                <HandHeart className="card-icon" />
              </div>
              {loading && <Typography align="center">Loading...</Typography>}
              {!loading && searchError && (
                <Typography color="error" align="center">{searchError}</Typography>
              )}
              {!loading && !searchError && (
                <div className="trusts-list">
                  {trusts.map((trust, index) => (
                    <div key={index} className="trust-item">
                      <Avatar src={trust?.image?.url !== "N/A" ? trust.image.url : "/placeholder.svg"} alt={trust.name} />
                      <div className="trust-details">
                        <Typography variant="subtitle1">{trust.trustName}</Typography>
                        <Typography variant="body2">Phone: {trust.trustPhoneNumber}</Typography>
                      </div>
                      {/* <Checkbox
                        checked={selectedTrust.includes(trust._id)}
                        onChange={(e) => handleSelectTrust(trust._id, e)}
                        disabled={selectedTrust.length >= 5 && !selectedTrust.includes(trust._id)}
                      /> */}

                  <input 
                   type="checkbox" 
                   id={`trust-checkbox-${index}`} 
                   className="trust-checkbox1" 
                   disabled={selectedTrust.length>3 && !selectedTrust.includes(trust._id)}
                   onChange={(e)=> handleSelectTrust(trust._id, e)}
                 />
                    </div>
                  ))}
                </div>
              )}
              <div className="pagination">
                <Button
                  onClick={() => handlePageChange('prev')}
                  disabled={pageNo < 2}
                  variant="outlined"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => handlePageChange('next')}
                  disabled={hasNext}
                  variant="outlined"
                >
                  Next
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Users;

