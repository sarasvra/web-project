"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  type ReactNode,
} from "react";



type User = { id:number; name: string; phone: string; };

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getProfile = () =>
  fetch(`${API_URL}/api/profile/`, {
    credentials: "include",
    cache: "no-store",
  });

async function fetchAuthenticatedUser(): Promise<User | null> {
  try {
    let res = await getProfile();

    if (res.status === 401) {
      const refresh = await fetch(`${API_URL}/api/refresh/`, {
        method: "POST",
        credentials: "include",
      });
      if (!refresh.ok) return null;
      res = await getProfile();
    }

    if (!res.ok) return null;
    const data = await res.json();
    return { id:data.id , name: data.name, phone: data.phone };
  } catch (error) {
    console.error("خطا در بررسی احراز هویت:", error);
    return null;
  }
}

let inflight: Promise<User | null> | null = null;
function getUserOnce() {
  if (!inflight) {
    inflight = fetchAuthenticatedUser().finally(() => {
      inflight = null;
    });
  }
  return inflight;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

 
  const versionRef = useRef(0);

  const refreshUser = useCallback(async () => {
    const version = versionRef.current;
    const u = await getUserOnce();

    if (version !== versionRef.current) return; 

    setUser(u);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    versionRef.current += 1;
    inflight = null; 

    try {
      const res = await fetch(`${API_URL}/api/logout/`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("خروج در سرور انجام نشد:", res.status);
      }
    } catch (error) {
      console.error("خطا در خروج:", error);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, isLoggedIn: !!user, refreshUser, logout }),
    [user, isLoading, refreshUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth باید داخل AuthProvider استفاده شود.");
  return ctx;
}