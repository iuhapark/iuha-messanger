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
import { useEffect } from 'react';

const AvatarProps = ({ initUser }: { initUser: User | null }) => {
  const { user, setUser } = useAuth();

  /* 초기 사용자 정보를 context에 설정 */
  useEffect(() => {
    setUser(initUser ?? null);
  }, [initUser, setUser]);

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
            <DropdownItem
              key={item.label}
              showDivider={index === 2}
              >
              <Link
              color={
                  index === 3
                    ? 'primary'
                    : index === filteredItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                href={isSignOut ? undefined : item.href}
                onPress={isSignOut ? logout : undefined}
                size='sm'
                className={isSignOut ? 'text-danger' : undefined}
              >
              {item.label}
            </Link>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default AvatarProps;
