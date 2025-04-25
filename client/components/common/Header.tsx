"use client";

import Image from "next/image";
import UserImage from "@/assets/img/user/sam.png";
import ThemeToggle from "./ThemeToggle";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "@/lib/auth";

const Header = () => {
  return (
    <header className='header'>
      <div className='logo'
      onClick={() => window.location.href = '/'}
      >
        iuha</div>
      <div className='header-right'>
        {/* <ThemeToggle /> */}
        <button className='header-icon' onClick={logout}>
          <IoLogOutOutline />
        </button>
        <Image src={UserImage} alt='user' className='user-image' />
      </div>
    </header>
  );
};

export default Header;
