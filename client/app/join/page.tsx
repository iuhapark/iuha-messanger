'use client';

import { title } from "@/components/primitives";
import { useForm } from 'react-hook-form';
import { User } from '@/types/index';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { instance } from '@/lib/api';
import { notoSansKR } from "@/config/fonts";

const JoinPage = () => {
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
    <div>
      <div className={`${notoSansKR.className} font-[family-name:var(--font-noto-sans-kr)]`}>
        <h1 className={title()}>Join</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='join-form'>
          <input className='input' type='text' placeholder='이름' {...register('name', { required: true })} />
          {errors.name && <span>이름은 필수입니다.</span>}
          <input className='input' type='text' placeholder='아이디' {...register('username', { required: true })} />
          {errors.username && <span>아이디는 필수입니다.</span>}
          <input className='input' type='email' placeholder='이메일' {...register('email', { required: true })} />
          {errors.email && <span>이메일은 필수입니다.</span>}
          <input className='input' type='password' placeholder='비밀번호' {...register('password', { required: true })} />
          {errors.password && <span>비밀번호는 필수입니다.</span>}
          <button className='btn-primary' type='submit'>다음</button>
        </form>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default JoinPage;