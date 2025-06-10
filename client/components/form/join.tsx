'use client';

import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import Loading from "@/components/loading/circular";
import { useLoading } from "@/context/loadingContext";
import api from "@/lib/api";
import { User } from "@/types/index";
import { parseAPIError } from "@/utils/error";
import { Button } from "@heroui/button";
import { addToast, Form, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { title } from "../primitives";
import { PAGE } from "@/lib/page";

const JoinForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { loading, setLoading } = useLoading();
  
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
          description: 'Welcome, '+ data.name + '!',
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

  return (
    loading ? <Loading /> : (
    <div>
      <h1 className={title()}>Sign in</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          isRequired
          label='Username'
          labelPlacement='outside'
          {...register('username', { required: true })}
          size='sm'
          radius='full'
        />
        <Input
          isRequired
          endContent={
            <button
              aria-label='toggle password visibility'
              className='focus:outline-none'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
          label='Password'
          labelPlacement='outside'
          {...register('password', { required: true })}
          type={isVisible ? 'text' : 'password'}
          size='sm'
          radius='full'
          />
        <Input
          isRequired
          label='Name'
          labelPlacement='outside'
          {...register('name', { required: true })}
          size='sm'
          radius='full'
        />
        <Input
        isRequired
        endContent={
          <div className='pointer-events-none flex items-center'>
            <span className='text-default-400 text-small'>@iuha.com</span>
          </div>
        }
        label='Email'
        labelPlacement='outside'
        {...register('email', { required: true })}
        size='sm'
        radius='full'
        />
        {/* <Input
          endContent={
            <button
              className='focus:outline-none'
              type='button'
            >
              <CameraIcon className='text-2xl text-default-400 pointer-events-none'/>
            </button>
          }
          label='Profile'
          labelPlacement='outside'
          {...register('profile', { required: false })}
          size='sm'
          radius='full'
        /> */}
        <div className='btn-group'>
          <Button
            className='btn-secondary'
            onPress={() => router.push(PAGE.SIGNIN)}
          >
            Back
          </Button>
          <Button className='btn-primary' type='submit'>submit</Button>
        </div>
      </Form>
    </div>)
  );
}

export default JoinForm;