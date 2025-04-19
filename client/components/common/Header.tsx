"use client";

import Image from "next/image";
import UserImage from "@/assets/img/user/sam.png";
import ThemeToggle from "./ThemeToggle";
import LogoutIcon from "@mui/icons-material/Logout";
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
          <LogoutIcon className='header-icon' />
        </button>
        <Image src={UserImage} alt='user' className='user-image' />
      </div>
    </header>
  );
};

export default Header;
