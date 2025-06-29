'use client';

import { siteConfig } from '@/config/site';
import { useAuth } from '@/context/authContext';
import { logout } from '@/lib/auth';
import { User } from '@/types';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from '@heroui/react';

const DropdownAvatar = ({initUser}: {initUser: User | null}) => {
  const {user} = useAuth();

  /* 로그인 여부에 따라 메뉴 필터링 */
  const filteredItems = siteConfig.navMenuItems.filter((item) => {
    if (item.label === 'Sign in') return !user;
    if (item.label === 'Sign out') return !!user;
    return true;
  });

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          showFallback
          name={user?.name}
          src={user?.profile}
          alt={user?.name}
          className='avatar'
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='User menu' variant='faded'>
        {filteredItems.map((item, index) => {
          const isSignOut = item.label === 'Sign out';

          return (
            <DropdownItem key={item.label} showDivider={index === 2}>
              {item.label === 'Sign out' ? (
                <button
                  onClick={logout}
                  className='text-danger text-sm w-full text-left px-2 py-1 hover:bg-danger-100 transition rounded'
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  href={siteConfig.navItems.find((i) => i.label === item.label)?.href || item.href}
                  color={
                    index === 1
                      ? 'primary'
                      : index === filteredItems.length - 1
                        ? 'danger'
                        : 'foreground'
                  }
                  size='sm'
                  className='block w-full px-2 py-1 rounded hover:bg-default-100'
                >
                  {item.label}
                </Link>
              )}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAvatar;
