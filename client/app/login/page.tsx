'use client';

import { title } from "@/components/primitives";
import { notoSansKR } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { PAGE } from "@/lib/page";
import { useState } from "react";
import { IoMdLogIn } from "react-icons/io";

export default function LoginPage() {
  const [username, setUsername] = useState('haru');
  const [password, setPassword] = useState('pw01');

  return (
    <div className={`${notoSansKR.className} font-[family-name:var(--font-noto-sans-kr)]`}>
      <h1 className={title()}>Sign In</h1>
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
      </div>
      </div>
        <a
          href={`${PAGE.JOIN}`}
          // href={`${siteConfig.navMenuItems.find(item => item.href === 'Join')?.href}`}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-blue-500 hover:underline'
        >
          Not a member?
        </a>
    </form>
    </div>
  );
}
