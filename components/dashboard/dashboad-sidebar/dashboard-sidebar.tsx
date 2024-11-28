'use client';

import React, { useState } from "react";
import './style.css'

function DashboardSidebar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(prevState => !prevState);
  };

  return (
    <div className="sidebar-container">
      <aside className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
        <div className="sidebar-content">
          {!isMinimized && (
            <nav className="sidebar-nav">
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#profile">Profile</a></li>
                <li><a href="#settings">Settings</a></li>
                <li><a href="#notifications">Notifications</a></li>
                <li><a href="#logout">Logout</a></li>
              </ul>
            </nav>
          )}
        </div>
      </aside>
      
      <button className={`toggle-btn ${isMinimized ? 'minimized' : ''}`} onClick={toggleSidebar}>
        {isMinimized ? '>' : '<'}
      </button>
    </div>
  );
}

export default DashboardSidebar;
