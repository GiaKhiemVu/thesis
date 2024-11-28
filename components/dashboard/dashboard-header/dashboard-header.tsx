"use client";

import React, { useState } from "react";
import './style.css';
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/authContext";
import { DashboardHeaderNavItems } from "@/types/itemsList.types";
import { AccountCircle, NotificationImportant, Settings } from "@mui/icons-material";
import { Menu, MenuItem, Button, Typography, Tooltip } from "@mui/material";

interface DashboardHeaderProps {
    userDetail: UserDetail | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userDetail }) => {
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
        },{
            title: 'Settings',
            icon: Settings,
            child: [
                {
                    title: 'Change Theme',
                    actionOnClick: () => console.log("Change Theme"),
                },
                {
                    title: 'Change Color',
                    actionOnClick: () => console.log("Change Background Color"),
                },
            ],
        },{
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
                         <Tooltip title={item.title} arrow>
                            <Button
                                className="nav-button"
                                onClick={(event) => handleClick(event, item)}
                                startIcon={item.icon && <item.icon className="nav-icon"/>}
                            />
                        </Tooltip>

                        {item.child && (
                            <Menu
                                anchorEl={item.title === 'Profile' ? profileAnchorEl : settingsAnchorEl}
                                open={Boolean(item.title === 'Profile' ? profileAnchorEl : settingsAnchorEl)}
                                onClose={handleClose}
                            >
                                {/* Render Profile greeting before the dropdown menu items */}
                                {item.title === 'Profile' && (
                                    <Typography variant="body1" sx={{ padding: '10px' }}>
                                        Hello, {userDetail?.username}
                                    </Typography>
                                )}

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
