"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import LoadingScreen from "../components/spinner/spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust path to your store

type LoadingContextType = {
  startLoading: () => void; // Manually show loading screen
  stopLoading: () => void;  // Manually hide loading screen
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [manualLoading, setManualLoading] = useState(false); // Manual loading state
  const isReduxLoading = useSelector((state: RootState) => state.user.status.isLoading); // Redux-based loading

  const startLoading = () => setManualLoading(true);
  const stopLoading = () => setManualLoading(false);

  const isLoading = isReduxLoading || manualLoading; // Combine both loading states

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
