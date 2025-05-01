import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User } from '@/\btypes';
import { errorHandling } from '@/utils/error';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/auth/user`);
        setUser(res.data);
      } catch (err) {
        errorHandling(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};
