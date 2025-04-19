import React from 'react';
import './Dash.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ChevronDown,
  Home,
  LayoutDashboard,
  HandHeart,
  LogOut,
  Settings
} from 'lucide-react';

// Fallback API base URL if .env variable is not set
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';


const AdminNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  // Handle logout with error handling and redirection
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/admin/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(data); // Optional: show a success message
      navigate('/'); // Redirect to login or home page
    } catch (err) {
      console.error('Logout error:', err.response?.data || err.message);
    }
  };

  // Navigation handlers
  const goToHome = () => navigate('/home');
  const goToAllUsers = () => navigate('/alluser');
  const goToAllTrusts = () => navigate('/alltrust');
  const goToSettings = () => navigate('/set');

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="Admin Navigation">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
        <button
          className="icon-button mobile-only"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <ChevronDown />
        </button>
      </div>
      <nav className="sidebar-nav">
        <button className="nav-button" onClick={goToHome} aria-label="Go to Home">
          <Home /> Home
        </button>
        <button className="nav-button" onClick={goToAllUsers} aria-label="View Users">
          <LayoutDashboard /> Users
        </button>
        <button className="nav-button" onClick={goToAllTrusts} aria-label="View Trusts">
          <HandHeart /> Trusts
        </button>
        <button className="nav-button" onClick={goToSettings} aria-label="Go to Settings">
          <Settings /> Settings
        </button>
        <button
          className="nav-button logout"
          onClick={handleLogout}
          aria-label="Log out"
        >
          <LogOut /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminNavbar;
