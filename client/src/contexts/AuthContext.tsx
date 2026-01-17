import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signOut: () => void;
  updateCredits: (credits: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("ugc_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    const users = JSON.parse(localStorage.getItem("ugc_users") || "[]");
    const existingUser = users.find((u: any) => u.email === email);
    
    if (!existingUser) {
      return { error: "No account found with this email" };
    }
    
    if (existingUser.password !== password) {
      return { error: "Invalid password" };
    }

    const userData: User = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      credits: existingUser.credits || 100,
    };
    
    setUser(userData);
    localStorage.setItem("ugc_user", JSON.stringify(userData));
    return {};
  };

  const signUp = async (email: string, password: string, name: string): Promise<{ error?: string }> => {
    const users = JSON.parse(localStorage.getItem("ugc_users") || "[]");
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      return { error: "An account with this email already exists" };
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
      credits: 100,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("ugc_users", JSON.stringify(users));

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      credits: newUser.credits,
    };
    
    setUser(userData);
    localStorage.setItem("ugc_user", JSON.stringify(userData));
    return {};
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("ugc_user");
  };

  const updateCredits = (credits: number) => {
    if (user) {
      const updatedUser = { ...user, credits };
      setUser(updatedUser);
      localStorage.setItem("ugc_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateCredits }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
