'use client';

import {useAuth} from "@/context/authContext";
import {useLoading} from "@/context/loadingContext";
import api from "@/lib/api";
import {User} from "@/types";
import {parseAPIError} from "@/utils/error";
import {Avatar, Card, Link, Spacer} from "@heroui/react";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Loading from "../loading/circular";
import {siteConfig} from "@/config/site";

export default function Account() {
  const {user} = useAuth();
  const {loading, setLoading} = useLoading();
  const [me, setMe] = useState<User | null>(null);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<User>();

  useEffect(() => {
    const fetchUser = async (user: User) => {
      try {
        const res = await api.get(`/users/${user?.id}`);
        setMe(res.data);
        reset({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          name: res.data.name,
          password: '',
        });
      } catch (err) {
        parseAPIError(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUser(user);
    }
  }, [user, reset]);
  if (loading) return <Loading />;

  return (
    <div className='flex flex-col h-full'>
      <Card className='panel md:min-flex-[5]'>
        <Avatar name={me?.username} src={me?.profile} alt={me?.name} className='size-16 mb-4' />
        <p className='text-md font-bold'>{me?.name}</p>
        <p className='text-sm text-default-600'>{me?.email}</p>
      </Card>

      <Spacer y={4} />

      <Card className='panel md:min-flex-[4]'>
        <div className='flex flex-col gap-5 items-start'>
          <Link
            title='personal information'
            href={siteConfig.navAccountItems.find((i) => i.label === 'Information')?.href}
            className={`text-sm ${isActive('/account/information') ? 'text-[var(--active-bg)] font-bold' : 'text-foreground'}`}
          >
            Personal information
          </Link>
          <Link
            title='security'
            href={siteConfig.navAccountItems.find((i) => i.label === 'Security')?.href}
            className={`text-sm ${isActive('/account/security') ? 'text-[var(--active-bg)] font-bold' : 'text-foreground'}`}
          >
            Sign in and Security
          </Link>
          <Link
            title='following'
            href={siteConfig.navAccountItems.find((i) => i.label === 'Folloing')?.href}
            className={`text-sm ${isActive('/account/following') ? 'text-[var(--active-bg)] font-bold' : 'text-foreground'}`}
          >
            Followers and Following
          </Link>
        </div>
      </Card>
    </div>
  );
}
