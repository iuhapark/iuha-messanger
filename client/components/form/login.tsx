'use client';

import { GoogleIcon } from '@/components/icons/icons';
import Loading from '@/components/loading/circular';
import { useLoading } from '@/context/loadingContext';
import { login } from '@/lib/auth';
import { Input } from '@heroui/input';
import { addToast, Button, Form, Spacer } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoMdLogIn } from 'react-icons/io';
import { subtitle } from '../primitives';
import { PAGE } from '@/lib/page';
import clsx from 'clsx';

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
      description: 'Welcome back, ' + username + '!',
      color: 'success',
      icon: 'check',
      variant: 'flat',
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (err) {
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

  return (
    loading ? <Loading /> : (
    <div className='flex flex-col items-center justify-center gap-4 h-full py-20'>
      <div className={clsx(' font-bold', subtitle())}>Hi there!</div>
      <div className='mb-4'>Welcome to iuha, so happy to see you! 🔥</div>
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
          endContent={
            <button
              type='submit'
              className='inline-block hover:bg-[#eee] dark:hover:bg-[#333] rounded-full'
            >
            <IoMdLogIn className='text-2xl text-default-400 pointer-events-none'/>
            </button>
          }
          label='Password'
          labelPlacement='outside'
          type='password'
          size='sm'
          radius='full'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacer y={3} />
         <Button
            className='btn-primary w-full h-[2rem] self-center text-sm'
            aria-label='Google login'
            type='submit'
          >Login
          </Button>
          <Spacer y={1} />
          <Button
            startContent={<GoogleIcon />}
            className='btn-secondary w-full h-[2rem] self-center text-sm'
            aria-label='Google login'
            onPress={login}
          >Continue with Google
          </Button>
      </Form>
      <button
        type='button'
        onClick={() => router.push(PAGE.SIGNUP)}
        rel='noopener noreferrer'
        className='text-sm text-blue-500 hover:underline inline-block'
      >
        Not a member?
      </button>
    </div>)
  );
};

export default LoginForm;