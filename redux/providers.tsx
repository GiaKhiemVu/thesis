'use client';

import { Provider } from "react-redux"; 
import { store } from "./store"; 
import { AuthProvider } from "../auth/authContext";
import { ToastProvider } from "../context/toastContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </Provider>
  );
}
