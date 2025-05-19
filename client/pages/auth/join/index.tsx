'use client';

import { useForm } from 'react-hook-form';
import { User } from '@/\btypes';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { instance } from '@/lib/api';

const Join = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    try {
      const res = await instance.post('/save', data);
      if (res.data.message === 'SUCCESS') {
        setMessage('회원가입 완료!');
        reset();
        router.push('/');
      } else {
        setMessage('회원가입 실패!');
        console.error(res.data.message);
      }
    } catch (error) {
      setMessage('에러가 발생했어요.');
      console.error(error);
    }
  };

  return (
    <div className='join-wrapper'>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' placeholder='이름' {...register('name', { required: true })} />
        {errors.name && <span>이름은 필수입니다.</span>}
        <input type='text' placeholder='사용자명' {...register('username', { required: true })} />
        {errors.username && <span>사용자명은 필수입니다.</span>}
        <input type='email' placeholder='이메일' {...register('email', { required: true })} />
        {errors.email && <span>이메일은 필수입니다.</span>}
        <input type='password' placeholder='비밀번호' {...register('password', { required: true })} />
        {errors.password && <span>비밀번호는 필수입니다.</span>}
        <button type='submit'>가입하기</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Join;
