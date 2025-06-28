'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { IoMdLogIn } from 'react-icons/io';

import { GoogleIcon } from '@/components/icons/icons';
import Loading from '@/components/loading/circular';
import { useLoading } from '@/context/loadingContext';
import { login } from '@/lib/auth';
import { PAGE } from '@/lib/page';

import { subtitle } from '../primitives';
import {
  Input,
  Button,
  Card,
  Divider,
  Form,
  Spacer,
  addToast,
} from '@heroui/react';

const LoginForm = () => {
  const [username, setUsername] = useState('haru');
  const [password, setPassword] = useState('pw01');
  const { loading, setLoading } = useLoading();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: new URLSearchParams({ username, password }).toString(),
      });

      const contentType = response.headers.get('content-type');

      if (!response.ok || response.redirected || response.status === 401) {
        const error = contentType?.includes('application/json')
          ? await response.json()
          : { message: 'Please check your credentials.' };

        addToast({
          title: 'Failed to sign in.',
          description: error.message,
          color: 'danger',
          icon: 'alert',
          variant: 'flat',
        });
        return;
      }

      addToast({
        title: 'Successfully signed in.',
        description: `Welcome back, ${username}!`,
        color: 'success',
        icon: 'check',
        variant: 'flat',
      });

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch {
      addToast({
        title: 'A network error occurred.',
        description: 'Could not connect to the server.',
        color: 'danger',
        icon: 'alert',
        variant: 'flat',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className='flex flex-col items-center justify-center gap-4 h-full py-10 max-w-[305px]'>
      <div className={clsx('font-bold', subtitle())}>Sign in to iuha</div>
      <div className='mb-4'>Welcome, so happy to see you! 🔥</div>

      <Card className='w-full px-5 border'>
        <Spacer y={5} />
        <Form onSubmit={handleLogin}>
          <Input
            isRequired
            label='Username'
            type='username'
            labelPlacement='outside'
            size='sm'
            radius='full'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            isRequired
            label='Password'
            type='password'
            labelPlacement='outside'
            size='sm'
            radius='full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endContent={
              <button
                type='submit'
                className='inline-block hover:bg-[#eee] dark:hover:bg-[#333] rounded-full'
              >
                <IoMdLogIn className='text-2xl text-default-400 pointer-events-none' />
              </button>
            }
          />
          <Spacer y={3} />
          <Button
            type='submit'
            className='btn-primary w-full h-[2rem] self-center text-sm'
            aria-label='Sign in'
          >
            Sign in
          </Button>
        </Form>

        <Spacer y={5} />
        <Divider />
        <Spacer y={5} />

        <Button
          startContent={<GoogleIcon />}
          className='btn-secondary w-full h-[2rem] self-center text-sm'
          aria-label='Google login'
          onPress={login}
        >
          Continue with Google
        </Button>
        <Spacer y={5} />
      </Card>

      <Card className='w-full h-10 justify-center border bg-transparent'>
        <button
          type='button'
          onClick={() => router.push(PAGE.SIGNUP)}
          rel='noopener noreferrer'
          className='text-sm text-blue-500 hover:underline inline-block'
        >
          Not a member?
        </button>
      </Card>
    </div>
  );
};

export default LoginForm;
