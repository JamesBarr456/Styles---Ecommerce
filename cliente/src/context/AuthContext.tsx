"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
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
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken) {
      setIsAuthenticated(true);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (newToken: string, userData: IUser) => {
    Cookies.set("token", newToken, { expires: 1 });
    Cookies.set("user", JSON.stringify(userData), { expires: 1 });

    setIsAuthenticated(true);
    setUser(userData);
    router.push("/");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
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
