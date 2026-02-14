import { createContext, useState, type ReactNode } from "react";
import type { AuthUser, UserRole } from "../types/api";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    options?: { companyName?: string }
  ) => Promise<void>;
  signOut: () => void;
  savedJobIds: string[];
  toggleSavedJob: (jobId: string) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  const signIn = async (email: string, _password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setUser({ name: "John Doe", email, role: "user" });
  };

  const signUp = async (
    name: string,
    email: string,
    _password: string,
    role: UserRole,
    options?: { companyName?: string }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let companyId: string | undefined;

    if (role === "company" && options?.companyName) {
      companyId = `company-${Date.now()}`;
    }

    setUser({ name, email, role, companyId });
  };

  const signOut = () => {
    setUser(null);
    setSavedJobIds([]);
  };

  const toggleSavedJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        signIn,
        signUp,
        signOut,
        savedJobIds,
        toggleSavedJob,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
