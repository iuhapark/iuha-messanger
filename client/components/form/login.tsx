'use client';

import { GoogleIcon } from '@/components/icons/icons';
import Loading from '@/components/loading/circular';
import { useLoading } from '@/context/loadingContext';
import { login } from '@/lib/auth';
import { Input } from '@heroui/input';
import { addToast, Button, Form } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoMdLogIn } from 'react-icons/io';
import { title } from '../primitives';
import { PAGE } from '@/lib/page';

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
    <div className='flex flex-col items-center justify-center h-full gap-12'>
      <h1 className={title()}>Sign in</h1>
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
          <Button
            startContent={<GoogleIcon />}
            className='btn-primary h-[2rem] mt-4 self-center'
            aria-label='Google login'
            onPress={login}
          >
          </Button>
      </Form>
      <button
        type='button'
        onClick={() => router.push(PAGE.SIGNUP)}
        rel='noopener noreferrer'
        className='text-sm text-blue-500 hover:underline mt-4 inline-block'
      >
        Not a member?
      </button>
    </div>)
  );
};

export default LoginForm;