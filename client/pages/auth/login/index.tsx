'use client';

import "@/styles/_index.scss";
import { notoSansKR } from "@/config/fonts";
import { useState } from "react";
import Image from "next/image";
import { login } from "@/lib/auth";
import { IoMdLogIn } from "react-icons/io";

interface onBack {onBack: () => void;}

const Login = ({ onBack }: onBack) => {
  const [username, setUsername] = useState('sam');
  const [password, setPassword] = useState('pw01');

  return (
  <div className={`${notoSansKR.className} font-[family-name:var(--font-noto-sans-kr)]`}>
    <form method='POST' action={`${process.env.NEXT_PUBLIC_API_URL}/login`} className='login-form'>
      <h1 className='text'>Sign in</h1>
      <input
        className='input'
        type='text'
        name='username'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <div className='relative'>
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
        <button type='submit' className='input-icon'>
          <IoMdLogIn/>
        </button>
        {/* <Image
          aria-hidden
          src='/google.svg'
          alt='Google icon'
          width={22}
          height={22}
          onClick={login}
        /> */}
      </div>
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
</div>
  );
}

export default Login;