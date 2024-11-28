'use client';

import { Provider } from "react-redux"; 
import { store } from "./store"; 
import { AuthProvider } from "../auth/authContext";
import { ToastProvider } from "../context/toastContext";
import { LoadingProvider } from "@/context/loadingScreenContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LoadingProvider>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </LoadingProvider>
    </Provider>
  );
}
