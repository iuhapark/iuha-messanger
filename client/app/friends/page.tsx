'use client';

import { title } from '@/components/primitives';
import UserList from '@/components/user/list';

export default function FriendsPage() {
  return (
    <div>
      <h1 className={title()}>Friends</h1>
      <UserList setStep={() => {}} onSelect={() => {}} />
    </div>
  );
}
