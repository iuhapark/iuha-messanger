import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { instance } from "@/lib/api";
import { User } from "@/\btypes";

const AuthContext = createContext<{ user: User | null; loading: boolean }>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get('/user')
    .then(res => {
      const user = res.data as User;
      if (user && user.id) {
        setUser(user);
        console.log('User loaded:', user);
      } else {
        setUser(null);
      }
    })
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
