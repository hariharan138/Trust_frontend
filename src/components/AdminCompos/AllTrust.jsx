import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Menu } from 'lucide-react';
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './Dash.css';
import DisplaygetData from './DisplaygetData';
import InputSearch from './InputSearch';
import AdminNavbar from './AdminNavbar';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api';

const AllTrust = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchFinal, setSearchFinal] = useState('');
  const [searchedResult, setSearchedResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [PageNo, setPageNo] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const dataLimitPerPage = 10;

  const token = Cookies.get('admintoken');

  const getApiData = async () => {
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/gettrusts/${PageNo}/${dataLimitPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const data = response.data;

      if (data?.data?.length > 0) {
        setSearchedResult(data.data);
        setHasNext(data.data.length === dataLimitPerPage);
        setErrorMessage('');
      } else {
        setSearchedResult([]);
        setHasNext(false);
        setErrorMessage('No trusts found');
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
      setErrorMessage('Failed to fetch trusts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getApiData();
    } else {
      setErrorMessage('No token found. Please log in.');
    }
  }, [token, PageNo]);

  const handlePageNo = (direction) => {
    if (direction === 'prev' && PageNo > 1) setPageNo((prev) => prev - 1);
    if (direction === 'next') setPageNo((prev) => prev + 1);
  };

  const handleSearch = () => {
    setPageNo(1);
    setSearchFinal(searchValue.trim());
  };

  useEffect(() => {
    if (searchFinal) {
      getSearchResults();
    }
  }, [searchFinal, PageNo]);

  const getSearchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/searchtrust`, {
        params: {
          search: searchFinal || '',
          page: PageNo,
          limit: dataLimitPerPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const data = response.data;

      if (data?.data?.length > 0) {
        setSearchedResult(data.data);
        setHasNext(data.data.length === dataLimitPerPage);
        setErrorMessage('');
      } else {
        setSearchedResult([]);
        setHasNext(false);
        setErrorMessage('No trusts found');
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
      setErrorMessage('Failed to fetch trusts');
    } finally {
      setLoading(false);
    }
  };

  const paginationStyle = {
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  const buttonStyle = {
    borderRadius: '5px',
    backgroundColor: '#3182ce',
    padding: '6px 12px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: '#fff',
    cursor: 'pointer',
    border: 'none',
  };

  return (
    <div className="dashboard">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-content">
        <header className="header">
          <button className="icon-button mobile-only" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h1 className="typeusers-admin-title">All Trust</h1>

          <div className="header-actions">
            <InputSearch searchValue={searchValue} setSearchValue={setSearchValue} />
            <IconButton onClick={handleSearch}>
              <SearchOutlinedIcon className="search-btn1" sx={{ width: '35px', height: '35px' }} />
            </IconButton>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="card-grid">
            {loading && <div>Loading... Please wait.</div>}
            {!loading && errorMessage && <div>{errorMessage}</div>}

            {!loading && searchedResult.length > 0 &&
              searchedResult.map((trust) => (
                <DisplaygetData
                  key={trust._id}
                  _id={trust._id}
                  Name={trust.trustName}
                  email={trust.trustEmail}
                  address={trust.address}
                  role={trust.role}
                  image={trust.image}
                  phone={trust.trustPhoneNumber}
                  searchedResult={searchedResult}
                  setSearchedResult={setSearchedResult}
                />
              ))}
          </div>

          <div style={paginationStyle}>
            <button style={buttonStyle} onClick={() => handlePageNo('prev')} disabled={PageNo < 2}>
              <ArrowBackIosIcon fontSize="small" /> Prev
            </button>
            <span>Page {PageNo}</span>
            <button style={buttonStyle} onClick={() => handlePageNo('next')} disabled={!hasNext}>
              Next <ArrowForwardIosIcon fontSize="small" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllTrust;
