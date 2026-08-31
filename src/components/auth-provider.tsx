"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  signOut as signOutGoogle,
  useSession,
} from "next-auth/react";

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

type StoredAccount = {
  user: AuthUser;
  salt: string;
  passwordHash: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  hydrated: boolean;
  displayName: string;
  login: (credentials: AuthCredentials) => Promise<AuthUser>;
  register: (credentials: AuthCredentials) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const sessionStorageKey = "vibe-motion-auth-user";
const accountsStorageKey = "vibe-motion-auth-accounts";

function createUser(credentials: AuthCredentials): AuthUser {
  const email = credentials.email.trim().toLowerCase();
  const fallbackName = email.split("@")[0] || "Cliente";
  const name = credentials.name?.trim() || fallbackName;

  return {
    id: "user-" + email,
    name,
    email,
    username: fallbackName,
  };
}

function readAccounts() {
  try {
    const stored = window.localStorage.getItem(accountsStorageKey);
    const parsed = stored ? (JSON.parse(stored) as StoredAccount[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  window.localStorage.setItem(accountsStorageKey, JSON.stringify(accounts));
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = window.atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function createSalt() {
  return bytesToBase64(crypto.getRandomValues(new Uint8Array(16)));
}

async function hashPassword(password: string, salt: string) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: base64ToBytes(salt),
      iterations: 120_000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  return bytesToBase64(new Uint8Array(derivedBits));
}

function resolveDisplayName(user: AuthUser | null) {
  if (!user) {
    return "";
  }

  const firstName = user.name.trim().split(/\s+/)[0];

  return firstName || user.username || user.email.split("@")[0] || "Cliente";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: googleSession, status: googleStatus } = useSession();
  const [localUser, setLocalUser] = useState<AuthUser | null>(null);
  const [localHydrated, setLocalHydrated] = useState(false);

  const googleUser = useMemo<AuthUser | null>(() => {
    const email = googleSession?.user?.email?.trim().toLowerCase();

    if (!email) {
      return null;
    }

    const fallbackName = email.split("@")[0] || "Cliente";
    const name = googleSession?.user?.name?.trim() || fallbackName;

    return {
      id: "user-" + email,
      name,
      email,
      username: fallbackName,
    };
  }, [googleSession]);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const storedSession = window.localStorage.getItem(sessionStorageKey);

        if (storedSession) {
          const storedUser = JSON.parse(storedSession) as AuthUser;
          const accountExists = readAccounts().some(
            (account) => account.user.email === storedUser.email,
          );

          if (accountExists) {
            setLocalUser(storedUser);
          } else {
            window.localStorage.removeItem(sessionStorageKey);
          }
        }
      } catch {
        setLocalUser(null);
        window.localStorage.removeItem(sessionStorageKey);
      } finally {
        setLocalHydrated(true);
      }
    });
  }, []);

  const persistUser = useCallback((nextUser: AuthUser) => {
    setLocalUser(nextUser);
    window.localStorage.setItem(sessionStorageKey, JSON.stringify(nextUser));
    return nextUser;
  }, []);

  const login = useCallback(
    async (credentials: AuthCredentials) => {
      const email = credentials.email.trim().toLowerCase();
      const account = readAccounts().find(
        (storedAccount) => storedAccount.user.email === email,
      );

      if (!account) {
        throw new Error(
          "Cadastro não encontrado para este e-mail. Cadastre-se antes de entrar.",
        );
      }

      const passwordHash = await hashPassword(
        credentials.password,
        account.salt,
      );

      if (passwordHash !== account.passwordHash) {
        throw new Error("Senha incorreta. Confira sua senha e tente novamente.");
      }

      return persistUser(account.user);
    },
    [persistUser],
  );

  const register = useCallback(
    async (credentials: AuthCredentials) => {
      const email = credentials.email.trim().toLowerCase();

      if (!email || !credentials.password) {
        throw new Error("Informe e-mail e senha para criar sua conta.");
      }

      const accounts = readAccounts();

      if (accounts.some((account) => account.user.email === email)) {
        throw new Error(
          "Já existe uma conta cadastrada com este e-mail. Entre com sua senha.",
        );
      }

      const userAccount = createUser(credentials);
      const salt = createSalt();
      const passwordHash = await hashPassword(credentials.password, salt);

      writeAccounts([
        ...accounts,
        {
          user: userAccount,
          salt,
          passwordHash,
        },
      ]);

      return persistUser(userAccount);
    },
    [persistUser],
  );

  const logout = useCallback(async () => {
    setLocalUser(null);
    window.localStorage.removeItem(sessionStorageKey);

    if (googleUser) {
      await signOutGoogle({ redirect: false });
    }
  }, [googleUser]);

  const user = googleUser ?? localUser;
  const hydrated = localHydrated && googleStatus !== "loading";

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      hydrated,
      displayName: resolveDisplayName(user),
      login,
      register,
      logout,
    }),
    [hydrated, login, logout, register, user],
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