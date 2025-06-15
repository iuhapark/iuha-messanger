'use client';

import { handleAPIError } from "@/lib/api-error";
import { fetchSessionUser } from "@/lib/auth";
import { User } from "@/types/index";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{ user: User | null; setUser: (user: User | null) => void; loading: boolean }>({ user: null, setUser: () => {}, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, initUser }: { children: ReactNode, initUser: User | null; }) => {
  const [user, setUser] = useState<User | null>(initUser);
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  /* 세션 유저 정보 조회 */
  useEffect(() => {
      const loadUser = async () => {
        try {
          const session = await fetchSessionUser();
          setUser(session ?? null);
        } catch (err) {
          if (!isFirstLoad) handleAPIError(err);
          setUser(null);
        } finally {
          setIsFirstLoad(false);
          setLoading(false);
        }
      };

      loadUser();
    }, []);
  
  
  return (
    <AuthContext.Provider value={{user, setUser, loading}}>{children}</AuthContext.Provider>
  );
};
