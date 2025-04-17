import React, { useState } from 'react';
import './Settingpage.css';
import { useNavigate } from 'react-router-dom';

const SetPage = () => {

  const navigate = useNavigate()


  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    fontSize: 'medium',
    language: 'english'
  });

  const handleToggle = (setting) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: !prevSettings[setting]
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    // Here you would typically save the settings to a backend or local storage
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const handleClose = ()=>{
    navigate('/Home')
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>  {"                   "}   <span style={{cursor: 'pointer'}} onClick={()=> handleClose()}>X</span>
      <form onSubmit={handleSave}>
        <div className="setting-item">
          <label htmlFor="notifications">
            Enable Notifications
            <input
              type="checkbox"
              id="notifications"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
          </label>
        </div>

        <div className="setting-item">
          <label htmlFor="darkMode">
            Dark Mode
            <input
              type="checkbox"
              id="darkMode"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
          </label>
        </div>

        <div className="setting-item">
          <label htmlFor="fontSize">Font Size</label>
          <select
            id="fontSize"
            name="fontSize"
            value={settings.fontSize}
            onChange={handleSelectChange}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="setting-item">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleSelectChange}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>

        <button type="submit" className="save-button">Save Settings</button>
      </form>
    </div>
  );
};

export default SetPage;