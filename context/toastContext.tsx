'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import Toast from "../components/toast/toast"; // Import your Toast component

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const showToast = (message: string) => {
    if (isClient) { 
      const id = Date.now(); 
      setToasts((prev) => [...prev, { id, message }]);

      // Remove the Toast after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3000);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isClient && (
        <div style={toastContainerStyles}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Styles for the Toast container
const toastContainerStyles: React.CSSProperties = {
  position: "fixed",
  top: "2%", // Align to the top of the screen
  right: "2%", // Align to the right of the screen
  display: "flex",
  flexDirection: "column", // Stack messages from top to bottom
  gap: "10px", // Space between messages
  zIndex: 1000,
};
