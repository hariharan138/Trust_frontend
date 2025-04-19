import React, { useEffect, useState, useCallback } from 'react';
import { Bell, Menu } from 'lucide-react';
import './Dash.css';
import DisplaygetData from './DisplaygetData';
import InputSearch from './InputSearch';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env

const AllUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [PageNo, setPageNo] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchFinal, setSearchFinal] = useState('');
  const [searchedResult, setSearchedResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [apidata, setApidata] = useState([]);

  const dataLimitPerPage = 10;

  // Debounced pagination handler
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handlePageNo = useCallback(
    debounce((action) => {
      if (action === 'prev' && PageNo > 1) {
        setPageNo((p) => p - 1);
      }
      if (action === 'next') {
        setPageNo((p) => p + 1);
      }
    }, 300),
    [PageNo]
  );

  const handleSearch = () => {
    setPageNo(1); // Reset to first page on new search
    setSearchFinal(searchValue.trim());
  };

  // Fetch users without search
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/admin/getusers/${PageNo}/${dataLimitPerPage}`,
        { withCredentials: true }
      );
      setApidata(data?.data || []);
      setHasNext(data?.data?.length === dataLimitPerPage);
      setErrorMessage(data?.data?.length > 0 ? '' : 'No users found');
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || 'Failed to fetch users');
      setApidata([]);
      setHasNext(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users with search
  const getSearchValue = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/admin/searchuser`, {
        params: {
          search: searchFinal,
          page: PageNo,
          limit: dataLimitPerPage,
        },
        withCredentials: true,
      });
      setSearchedResult(data?.data || []);
      setHasNext(data?.data?.length === dataLimitPerPage);
      setErrorMessage(data?.data?.length > 0 ? '' : 'No users found');
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || 'Failed to fetch users');
      setSearchedResult([]);
      setHasNext(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when PageNo or searchFinal changes
  useEffect(() => {
    if (searchFinal) {
      getSearchValue();
    } else {
      fetchUsers();
    }
  }, [PageNo, searchFinal]);

  // Update searchedResult when apidata or searchFinal changes
  useEffect(() => {
    if (!searchFinal) {
      setSearchedResult((prev) => {
        const newData = apidata || [];
        return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
      });
      setErrorMessage(apidata?.length > 0 ? '' : 'No users found');
    }
  }, [apidata, searchFinal]);

  const paginationTrust = {
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  const pageBtn = {
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
          <h1 className="typeusers-admin-title">All Users</h1>
          <div className="header-actions">
            <InputSearch searchValue={searchValue} setSearchValue={setSearchValue} />
            <IconButton onClick={handleSearch}>
              <SearchOutlinedIcon className="search-btn1" sx={{ width: '35px', height: '35px' }} />
            </IconButton>
            <button className="icon-button">
              <Bell />
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="card-grid">
            {loading && <div>Loading... Please wait</div>}
            {!loading && errorMessage && <div>{errorMessage}</div>}
            {!loading && !errorMessage && searchedResult.length > 0 && (
              searchedResult.map(({ Name, _id, email, address, phone, image, role }) => {
                if (!_id) {
                  console.warn('Missing _id for user:', { Name, email });
                  return null;
                }
                return (
                  <DisplaygetData
                    key={_id} // Unique key prop
                    _id={_id}
                    Name={Name}
                    email={email}
                    address={address}
                    role={role}
                    image={image}
                    phone={phone}
                    searchedResult={searchedResult}
                    setSearchedResult={setSearchedResult}
                  />
                );
              })
            )}
            {!loading && !errorMessage && searchedResult.length === 0 && (
              <div>No users available.</div>
            )}
          </div>

          <div style={paginationTrust}>
            <button
              style={pageBtn}
              onClick={() => handlePageNo('prev')}
              disabled={PageNo < 2}
            >
              <ArrowBackIosIcon fontSize="small" /> Prev
            </button>
            <span>Page {PageNo}</span>
            <button
              style={pageBtn}
              onClick={() => handlePageNo('next')}
              disabled={!hasNext}
            >
              Next <ArrowForwardIosIcon fontSize="small" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllUser;
