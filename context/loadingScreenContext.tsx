"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import LoadingScreen from "../components/spinner/spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type LoadingContextType = {
  startLoading: () => void;
  stopLoading: () => void; 
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [manualLoading, setManualLoading] = useState(false);
  const isReduxLoading = useSelector((state: RootState) => state.user.status.isLoading);

  const startLoading = () => setManualLoading(true);
  const stopLoading = () => setManualLoading(false);

  const isLoading = isReduxLoading || manualLoading; 

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
