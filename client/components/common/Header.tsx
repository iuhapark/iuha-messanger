'use client';

// import ThemeToggle from "./ThemeToggle";
import { logout } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import { IoMdPerson, IoMdLogOut } from "react-icons/io";
import { Fragment } from "react";

const Header = () => {
const { user, loading } = useAuth();

  if (!loading)

  return (
    <header className='header'>
      <a 
      className='header-logo'
      href = '/'>
        iuha
      </a>
      <div className='header-right'>
      {/* <ThemeToggle /> */}
      {user ? (
        <Fragment>
          <button className='header-icon' onClick={logout}>
            <IoMdLogOut />
          </button>
          <img
          className='user-image'
          src={user?.profile || '/assets/img/default.png'}
          alt='user' />
        </Fragment>
      ) : (
        <button className='header-icon'>
          <IoMdPerson />
        </button>
      )}
    </div>
    </header>
  );
};

export default Header;
