import { createContext, useState, type ReactNode } from "react";
import type { AuthUser, UserRole } from "../types/api";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isCompany: boolean;
  isUser: boolean;
  isAdmin: boolean;
  updateProfile: (updates: Partial<Pick<AuthUser, "name" | "companyName">>) => void;
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
    let companyName: string | undefined;

    if (role === "company" && options?.companyName) {
      companyId = `company-${Date.now()}`;
      companyName = options.companyName;
    }

    setUser({ name, email, role, companyId, companyName });
  };

  const updateProfile: AuthContextValue["updateProfile"] = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
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
        isCompany: user?.role === "company",
        isUser: user?.role === "user",
        isAdmin: user?.role === "admin",
        updateProfile,
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
