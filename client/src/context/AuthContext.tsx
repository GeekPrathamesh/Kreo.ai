import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  credits: number;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.get("/api/auth/me");
      if (data?.success) {
        setUser(data.user);
      }
    } catch (err: any) {
      // Quietly fail if not logged in
      console.log("No active session found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/auth/login", { email, password });
      if (data?.success) {
        setUser(data.user);
        toast.success("Welcome back!");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/auth/register", { email, password, name });
      if (data?.success) {
        setUser(data.user);
        toast.success("Account created successfully!");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err: any) {
      toast.error("Logout failed");
    }
  };

  const refreshUser = async () => {
    try {
      const { data } = await api.get("/api/auth/me");
      if (data?.success) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Failed to refresh user credentials", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
