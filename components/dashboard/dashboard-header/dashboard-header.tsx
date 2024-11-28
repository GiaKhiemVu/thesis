import React from "react";
import './style.css'

function DashboardHeader() {
    return (
        <header>
            <div className="logo">
                <h1>Dashboard</h1>
            </div>
            <nav>
                <a href="#home">Home</a>
                <a href="#profile">Profile</a>
                <a href="#settings">Settings</a>
            </nav>
        </header>
    );
}

export default DashboardHeader;