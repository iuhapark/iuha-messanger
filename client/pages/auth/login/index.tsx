'use client';

import "@/styles/_index.scss";
import { notoSansKR } from "@/styles/fonts";
import { useState } from "react";
import Image from "next/image";
import { login } from "@/lib/auth";

interface onBack {onBack: () => void;}

const Login = ({ onBack }: onBack) => {
  const [username, setUsername] = useState('sam');
  const [password, setPassword] = useState('pw01');

  return (
  <div className={`${notoSansKR.className} font-[family-name:var(--font-noto-sans-kr)]`}>
    <form method='POST' action={`${process.env.NEXT_PUBLIC_API_URL}/login`} className='login-form'>
        <input
          className='input'
          type='text'
          name='username'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className='input'
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className='btn-group'>
          <button className='btn' type='submit'>로그인</button>
          <Image
            aria-hidden
            src='/google.svg'
            alt='Google icon'
            width={22}
            height={22}
            onClick={login}
          />
        </div>
        <a
          href='/auth/join'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-blue-500 hover:underline'
        >
          계정 생성
        </a>
      </form>
    {/* <form
      className='login-form'
    >
      <input
        type='text'
        name='username'
        placeholder='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type='password'
        name='password'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className='btn-group'>
        <button type='submit' className='btn'>
          로그인
        </button>
       
        <Image
          aria-hidden
          src='/google.svg'
          alt='Google icon'
          width={22}
          height={22}
          onClick={login}
        />
      </div>
      <a
        href='/auth/join'
        target='_blank'
        rel='noopener noreferrer'
      >
        계정 생성
        </a>
    </form> */}
  
</div>
  );
}

export default Login;