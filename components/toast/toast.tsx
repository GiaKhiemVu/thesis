import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

type ToastProps = {
  message: string;
  onClose: () => void;
};

const Toast = ({ message, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Trigger the exit animation before removal
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    if (!isVisible) {
      onClose(); // Remove the toast from the stack
    }
  };

  return (
    <div
      style={{
        ...toastStyles,
        ...(isVisible ? slideInStyles : slideOutStyles),
      }}
      onAnimationEnd={handleAnimationEnd}
    >
      <span>{message}</span>
      <IconButton onClick={() => setIsVisible(false)} style={closeButtonStyles}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

// Toast base styles
const toastStyles: React.CSSProperties = {
  backgroundColor: 'rgba(50, 50, 50, 0.9)',
  color: '#f1f1f1',
  padding: '10px 15px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '14px',
  fontFamily: "'Inter', sans-serif",
  width: '300px',
  maxWidth: '90%',
  wordWrap: 'break-word',
  position: 'relative',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
};

// Styles for the slide-in animation
const slideInStyles: React.CSSProperties = {
  transform: 'translateX(0)', // Fully visible
  opacity: 1,
  animation: 'slide-in 0.3s ease forwards',
};

// Styles for the slide-out animation
const slideOutStyles: React.CSSProperties = {
  transform: 'translateX(-100%)', // Moves to the left
  opacity: 0,
  animation: 'slide-out 0.3s ease forwards',
};

// Close button styles
const closeButtonStyles: React.CSSProperties = {
  color: '#f1f1f1',
  cursor: 'pointer',
  fontSize: '18px',
  transition: 'color 0.2s',
};

export default Toast;
