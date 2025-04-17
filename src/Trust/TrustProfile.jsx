import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env

const TrustProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/trust/gettrustprofile`, {
          withCredentials: true,
        });
        setProfile(response.data.user);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trust profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const tabs = [
    { id: 'profile', name: 'Profile' },
  ];

  const styles = {
    container: {

      display:"flex",
      alignItems:"center",
      justifyContent:"start",
      flexDirection:"column",
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
    },
    header: {

      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px',
    },
    profileCard: {
      width:'60%',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    tabContainer: {

      display: 'flex',
      borderBottom: '1px solid #e0e0e0',
    },
    tab: {

      padding: '12px 16px',
      fontSize: '1rem',
      fontWeight: '500',
      color: '#666',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
    },
    activeTab: {
      color: '#1a73e8',
      borderBottomColor: '#1a73e8',
    },
    content: {
      padding: '24px',
    },
    profileContent: {

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    profilePhoto: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginRight: '24px',
      border: '4px solid #1a73e8',
    },
    profileInfo: {
      flex: 1,
    },
    infoItem: {
      marginBottom: '16px',
    },
    infoLabel: {
      fontSize: '0.875rem',
      color: '#666',
      marginBottom: '4px',
    },
    infoValue: {
      fontSize: '1rem',
      color: '#333',
    },
    loadingSpinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
    },
    errorMessage: {
      backgroundColor: '#ffebee',
      color: '#c62828',
      padding: '12px',
      borderRadius: '4px',
      marginBottom: '16px',
    },
  };

  const LoadingSpinner = () => (
    <div style={styles.loadingSpinner}>
      <div
        style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #1a73e8',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
        }}
      />
    </div>
  );

  const ErrorMessage = ({ message }) => (
    <div style={styles.errorMessage}>{message}</div>
  );

  const ProfileContent = ({ profile }) => (
    <div style={styles.profileContent}>
      <img
        src={profile.image.url || 'https://via.placeholder.com/150'}
        alt="Profile"
        style={styles.profilePhoto}
      />
      <div style={styles.profileInfo}>
        <ProfileItem label="Owner Name" value={`${profile.firstName} ${profile.lastName}`} />
        <ProfileItem label="Email" value={profile.email} />
        <ProfileItem label="Address" value={profile.address} />
        <ProfileItem label="Trust Name" value={profile.trustName} />
        <ProfileItem label="Trust Phone" value={profile.trustPhoneNumber} />
        <ProfileItem label="Created At" value={new Date(profile.createdAt).toLocaleString()} />
      </div>
    </div>
  );

  const ProfileItem = ({ label, value }) => (
    <div style={styles.infoItem}>
      <div style={styles.infoLabel}>{label}</div>
      <div style={styles.infoValue}>{value}</div>
    </div>
  );

  const DocumentsContent = () => (
    <div>
      <p>Document management features coming soon...</p>
    </div>
  );

  const SettingsContent = () => (
    <div>
      <p>Profile settings and preferences coming soon...</p>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.header}>Trust Profile</h1>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : profile ? (
          <div style={styles.profileCard}>
            <div style={styles.tabContainer}>
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  style={{
                    ...styles.tab,
                    ...(activeTab === tab.id ? styles.activeTab : {}),
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </div>
              ))}
            </div>
            <div style={styles.content}>
              {activeTab === 'profile' && <ProfileContent profile={profile} />}
              
            </div>
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default TrustProfile;

