'use client';

import { useAuth } from "@/context/authContext";
import { useLoading } from "@/context/loadingContext";
import api from "@/lib/api";
import { User } from "@/types";
import { parseAPIError } from "@/utils/error";
import { addToast, Card, Spacer } from "@heroui/react";
import { useEffect, useState } from "react";
import EmailInput from "../../../components/input/email-intpu";
import PasswordInput from "../../../components/input/password-input";
import ProtectedRoute from "@/components/auth/protected-route";

const Security = () => {
  const { user } = useAuth();
  const { loading, setLoading } = useLoading();
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async (user: User) => {
      try {
        const res = await api.get(`/users/${user?.id}`);
        setMe(res.data);
      } catch (err) {
        parseAPIError(err);
      }
    };
    if (user) fetchUser(user);
  }, [user]);

  const handleUpdate = async (data: Partial<User>) => {
    try {
      setLoading(true);
      const res = await api.patch(`/users/${user?.id}`, { 
        id: me?.id,
        email: me?.email,
        password: me?.password,
        ...data
      });

      if (res.data?.id) setMe(res.data);

      addToast({
        title: res.data.title || 'Success!',
        description: res.data.message,
        color: 'success',
      });
    } catch (err) {
      const parsed = parseAPIError(err);
      addToast({
        title: parsed.code || 'Update failed',
        description: parsed.message || 'Please try again later.',
        color: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!me) return null;

  return (
    <ProtectedRoute>
      <Card className='card'>
        <div className='text-lg font-bold'>Sign in and Security</div>
        <Spacer y={12} />
        <div className='flex flex-col gap-2'>
          <EmailInput email={me.email} onUpdate={handleUpdate} />
          <PasswordInput onUpdate={handleUpdate} />
        </div>
      </Card>
    </ProtectedRoute>
  );
};

export default Security;
