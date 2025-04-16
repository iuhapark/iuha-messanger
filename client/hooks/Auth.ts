import { useEffect, useState } from "react";
import nookies from "nookies";
import api from "@/lib/api";
import { USER_API } from "@/lib/constants";

export interface User {
    id: number;
    username: string;
    email: string;
    name: string;
    profile: string;
    role: 'USER' | 'ADMIN';
  }
  
  export const Auth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const { accessToken } = nookies.get();
  
      if (!accessToken) {
        setLoading(false);
        return;
      }
  
      // Axios 헤더에 토큰 자동 주입
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
      const fetchUser = async () => {
        try {
          const res = await api.get(USER_API.ME, {
            withCredentials: true,
          });
          setUser(res.data);
        } catch (err) {
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []);
  
    return { user, loading };
  };
  