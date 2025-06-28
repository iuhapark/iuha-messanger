'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { useForm } from 'react-hook-form';

import { EyeFilledIcon, EyeSlashFilledIcon, InformationIcon } from '@/components/icons/icons';
import Loading from '@/components/loading/circular';
import { useLoading } from '@/context/loadingContext';
import api from '@/lib/api';
import { PAGE } from '@/lib/page';
import { User } from '@/types/index';
import { parseAPIError } from '@/utils/error';
import { subtitle } from '../primitives';

import { Button } from '@heroui/button';
import {
  addToast,
  Card,
  Form,
  Input,
  Spacer,
  Tooltip,
} from '@heroui/react';

const JoinForm = () => {
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      const email = data.email.includes('@') ? data.email : `${data.email}@iuha.com`;
      const res = await api.post('/auth/save', { ...data, email });

      if (res.data.message === 'SUCCESS') {
        addToast({
          title: 'Successfully signed up.',
          description: `Welcome, ${data.name}!`,
          color: 'success',
          icon: 'check',
          variant: 'flat',
        });
        reset();
        router.push('/');
      } else {
        addToast({
          title: 'Failed to sign up.',
          description: 'Please check your credentials.',
          color: 'danger',
          icon: 'alert',
          variant: 'flat',
        });
      }
    } catch (error) {
      addToast({
        title: 'Failed to sign up.',
        description: parseAPIError(error).message,
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
      <div className='flex flex-row gap-2'>
        <h1 className={clsx('font-bold', subtitle())}>Sign up to iuha</h1>
        <div className='hidden sm:block'>
          <Tooltip
            placement='bottom'
            content={
              <div className='px-1 py-2 text-tiny space-y-1'>
                <p>Your credentials are safe with Spring Security,</p>
                <p>HTTPS, and CSRF. But hey—maybe use a new</p>
                <p>password, just in case... 😅</p>
              </div>
            }
          >
            <button className='btn-aside'>
              <InformationIcon />
            </button>
          </Tooltip>
        </div>
      </div>

      <Card className='w-full px-5 border'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            isRequired
            label='Username'
            labelPlacement='outside'
            size='sm'
            radius='full'
            {...register('username', { required: true })}
          />

          <Input
            isRequired
            type={isVisible ? 'text' : 'password'}
            label='Password'
            labelPlacement='outside'
            size='sm'
            radius='full'
            {...register('password', { required: true })}
            endContent={
              <button
                type='button'
                onClick={toggleVisibility}
                aria-label='toggle password visibility'
                className='focus:outline-none'
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
          />

          <Input
            isRequired
            label='Name'
            labelPlacement='outside'
            size='sm'
            radius='full'
            {...register('name', { required: true })}
          />

          <Input
            isRequired
            label='Email'
            labelPlacement='outside'
            size='sm'
            radius='full'
            {...register('email', { required: true })}
            endContent={
              <div className='pointer-events-none flex items-center'>
                <span className='text-default-400 text-small'>@iuha.com</span>
              </div>
            }
          />

          {/* <Input
            label='Profile'
            labelPlacement='outside'
            size='sm'
            radius='full'
            {...register('profile')}
            endContent={
              <button type='button' className='focus:outline-none'>
                <CameraIcon className='text-2xl text-default-400 pointer-events-none' />
              </button>
            }
          /> */}  

          <Spacer y={3} />
          <div className='btn-group self-center'>
            <Button
              className='btn-secondary h-[2rem]'
              onPress={() => router.push(PAGE.SIGNIN)}
            >
              Back
            </Button>
            <Button className='btn-primary h-[2rem]' type='submit'>
              Submit
            </Button>
          </div>
        </Form>
        <Spacer y={5} />
      </Card>
    </div>
  );
};

export default JoinForm;
