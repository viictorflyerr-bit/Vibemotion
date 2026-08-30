"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  username?: string;
};

type AuthCredentials = {
  email: string;
  password: string;
  name?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  hydrated: boolean;
  displayName: string;
  login: (credentials: AuthCredentials) => AuthUser;
  register: (credentials: AuthCredentials) => AuthUser;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const storageKey = "vibe-motion-auth-user";

function createUser(credentials: AuthCredentials): AuthUser {
  const email = credentials.email.trim().toLowerCase();
  const fallbackName = email.split("@")[0] || "Cliente";
  const name = credentials.name?.trim() || fallbackName;

  return {
    id: `user-${email}`,
    name,
    email,
    username: fallbackName,
  };
}

function resolveDisplayName(user: AuthUser | null) {
  if (!user) {
    return "";
  }

  const firstName = user.name.trim().split(/\s+/)[0];

  return firstName || user.username || user.email.split("@")[0] || "Cliente";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = window.localStorage.getItem(storageKey);

        if (stored) {
          setUser(JSON.parse(stored) as AuthUser);
        }
      } catch {
        setUser(null);
      } finally {
        setHydrated(true);
      }
    });
  }, []);

  const persistUser = useCallback((nextUser: AuthUser) => {
    setUser(nextUser);
    window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(storageKey);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      hydrated,
      displayName: resolveDisplayName(user),
      login: (credentials) => persistUser(createUser(credentials)),
      register: (credentials) => persistUser(createUser(credentials)),
      logout,
    }),
    [hydrated, logout, persistUser, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
