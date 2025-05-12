'use client';

// import ThemeToggle from "./ThemeToggle";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
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
        <img src={user?.profile} alt='user' className='user-image' />
      </div>
    </header>
  );
};

export default Header;
