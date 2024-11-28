'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { signin, reset } from '../redux/slices/userSlice';
import { AppDispatch } from '../redux/store';
import { securityUtils } from '@/utils/security';

interface AuthContextType {
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>(); 
  const router = useRouter();

  const login = (username: string, password: string) => {
    if (username && password) {
      const payload: LoginFormObject = {
        account: username,
        password: securityUtils.hash(password), 
      }
      console.log()
      signin(payload)
      setIsAuthenticated(true);
      router.push("/dashboard");
    } else {
      console.error("Invalid username or password");
    }
  };

  const logout = () => {
    dispatch(reset());
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
