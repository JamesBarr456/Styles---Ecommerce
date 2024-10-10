"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";

import { IUser } from "@/interfaces/users";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: IUser | null;
  login: (newToken: string, userData: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");
    if (storedToken) {
      setIsAuthenticated(true);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parsea el usuario desde JSON
    }
  }, []);

  const login = (newToken: string, userData: IUser) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
    setUser(userData);
    router.push("/");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};
