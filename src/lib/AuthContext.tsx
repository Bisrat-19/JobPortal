import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { AuthUser, UserRole } from "../types/api";
import { supabase } from "../helper/supabaseClient";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isCompany: boolean;
  isUser: boolean;
  isAdmin: boolean;
  updateProfile: (updates: Partial<Pick<AuthUser, "name" | "companyName">>) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, role: UserRole, options?: { companyName?: string }
  ) => Promise<void>;
  signOut: () => Promise<void>;
  savedJobIds: string[];
  toggleSavedJob: (jobId: string) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const mapSupabaseUserToAuthUser = (user: SupabaseUser): AuthUser => {
  const metadata = (user.user_metadata || {}) as {
    name?: string;
    role?: UserRole;
    companyId?: string;
    companyName?: string;
  };

  return {
    name: metadata.name || user.email || "User",
    email: user.email || "",
    role: metadata.role || "user",
    companyId: metadata.companyId,
    companyName: metadata.companyName,
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  useEffect(() => {
    const initAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) return;
      if (data.user) {
        setUser(mapSupabaseUserToAuthUser(data.user));
      }
    };

    void initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUserToAuthUser(session.user));
      } else {
        setUser(null);
        setSavedJobIds([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (data.user) {
      setUser(mapSupabaseUserToAuthUser(data.user));
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    options?: { companyName?: string }
  ) => {
    const companyId =
      role === "company" && options?.companyName
        ? `company-${Date.now()}`
        : undefined;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
          companyId,
          companyName: options?.companyName,
        },
      },
    });

    if (error) throw error;

    if (data.user) {
      const supaUser = data.user as SupabaseUser;
      const identities = Array.isArray(supaUser.identities)
        ? supaUser.identities
        : [];

      const alreadyRegistered = identities.length === 0;

      if (alreadyRegistered) {
        await supabase.auth.signOut();
        throw new Error("This email is already registered. Please sign in instead.");
      }

      setUser(mapSupabaseUserToAuthUser(supaUser));
    }
  };

  const updateProfile: AuthContextValue["updateProfile"] = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
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
