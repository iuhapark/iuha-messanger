'use client';

import { EyeFilledIcon, EyeSlashFilledIcon, InformationIcon } from "@/components/icons/icons";
import Loading from "@/components/loading/circular";
import { useLoading } from "@/context/loadingContext";
import api from "@/lib/api";
import { User } from "@/types/index";
import { parseAPIError } from "@/utils/error";
import { Button } from "@heroui/button";
import { addToast, Form, Input, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { subtitle } from "../primitives";
import { PAGE } from "@/lib/page";
import clsx from "clsx";

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
    <div className='flex flex-col items-center justify-center h-full py-20'>
      <div className='flex flex-row gap-4'>
      <h1 className={clsx(' font-bold', subtitle())}>Sign up</h1>
      <Tooltip 
        placement='bottom'
        content={
          <div className='px-1 py-2'>
            <div className='text-tiny'>스프링 시큐리티가 야근 중이에요. 정보는 안전하지만, </div>
            <div className='text-tiny'>그래도 혹시 모르니까... 안 쓰던 비밀번호 쓰는 건 어때요?</div>
            <br/>
            <div className='text-tiny'>Your credentials are safe with Spring Security,</div>
            <div className='text-tiny'> HTTPS, and CSRF. But hey—maybe don&apos;t reuse</div>
            <div className='text-tiny'> an old password, just in case... 😅</div>
          </div>
        }
      >
        <button className='btn-aside'>
          <InformationIcon />
        </button>
      </Tooltip>
      </div>
      <div className='mb-4'></div>
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
        <div className='btn-group self-center'>
          <Button
            className='btn-secondary h-[2rem]'
            onPress={() => router.push(PAGE.SIGNIN)}
          >
            Back
          </Button>
          <Button className='btn-primary h-[2rem]' type='submit'>submit</Button>
        </div>
      </Form>
    </div>)
  );
}

export default JoinForm;