"use client";

import React, { useState } from "react";
import './style.css';
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/authContext";
import { DashboardHeaderNavItems } from "@/types/itemsList.types";
import { AccountCircle, NotificationImportant, Settings } from "@mui/icons-material";
import { Menu, MenuItem, Button } from "@mui/material";  // Import Material UI components

function DashboardHeader() {
    const router = useRouter();
    const auth = useAuth();

    // Separate state for anchor elements of each dropdown
    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);

    const dashboardHeaderNavItems: DashboardHeaderNavItems[] = [
        {
            title: 'Notification',
            icon: NotificationImportant,
            child: null,
        },
        {
            title: 'Profile',
            icon: AccountCircle,
            child: [
                {
                    title: 'Profile',
                    actionOnClick: () => router.push('dashboard/profile'),
                },
                {
                    title: 'Logout',
                    actionOnClick: () => auth.logout(),
                },
            ],
        },
        {
            title: 'Settings',
            icon: Settings,
            child: [
                {
                    title: 'Change Theme',
                    actionOnClick: () => console.log("Change Theme"),
                },
                {
                    title: 'Change Background Color',
                    actionOnClick: () => console.log("Change Background Color"),
                },
            ],
        },
    ];

    // Handle clicks to open respective menus
    const handleClick = (event: React.MouseEvent<HTMLElement>, item: any) => {
        if (item.title === 'Profile') {
            setProfileAnchorEl(event.currentTarget);
        } else if (item.title === 'Settings') {
            setSettingsAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setProfileAnchorEl(null); // Close Profile menu
        setSettingsAnchorEl(null); // Close Settings menu
    };

    return (
        <header className="dashboard-header">
            <div className="logo">
                <h1>Dashboard</h1>
            </div>
            <nav className="header-nav">
                {dashboardHeaderNavItems.map((item, index) => (
                    <div key={index} className="nav-item">
                        {/* Render main button with MUI icon */}
                        <Button
                            className="nav-button"
                            onClick={(event) => handleClick(event, item)}
                            startIcon={item.icon && <item.icon />}
                        >
                            {item.title}
                        </Button>

                        {/* Render dropdown if child items exist */}
                        {item.child && (
                            <Menu
                                anchorEl={item.title === 'Profile' ? profileAnchorEl : settingsAnchorEl}
                                open={Boolean(item.title === 'Profile' ? profileAnchorEl : settingsAnchorEl)}
                                onClose={handleClose}
                            >
                                {item.child.map((childItem, childIndex) => (
                                    <MenuItem
                                        key={`${item.title}-${childIndex}`}
                                        onClick={() => {
                                            childItem.actionOnClick?.();
                                            handleClose();
                                        }}
                                    >
                                        {childItem.title}
                                    </MenuItem>
                                ))}
                            </Menu>
                        )}
                    </div>
                ))}
            </nav>
        </header>
    );
}

export default DashboardHeader;
