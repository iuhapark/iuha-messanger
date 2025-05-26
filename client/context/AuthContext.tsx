'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "@/types/index";
import { fetchSessionUser } from '@/lib/auth'

const AuthContext = createContext<{ user: User | null; loading: boolean }>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false)

  /* 세션 유저 정보 조회 */
  useEffect(() => {
    setMounted(true)
    fetchSessionUser()
      .then((user) => setUser(user?.id ? user : null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])
  
  if (!mounted) return null

  return (
    <AuthContext.Provider value={{user, loading}}>{children}</AuthContext.Provider>
  );
};
