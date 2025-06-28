'use client';

import { useState } from "react";
import { User } from "@/types";
import { Avatar, Button, Listbox, ListboxItem } from "@heroui/react";
import Detail from "./detail";
import ModalAvatar from "../avatar/modal";

const UserList = ({ users }: { users: User[] }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onSelect = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className='w-full'>
      <Listbox aria-label='User List' variant='flat' className='w-full'>
        {users.map((user) => (
          <ListboxItem key={user.id} className='w-full'>
            <div className='flex items-center justify-between w-full gap-2'>
              <div className='flex items-center gap-3'>
                <ModalAvatar user={user} />
                <span className='font-medium'>{user.name}</span>
              </div>
              {/* <Button color='default' size='sm' radius='full' variant='solid'>
                Follow
              </Button> */}
            </div>
          </ListboxItem>
        ))}
      </Listbox>

      {selectedUser && (
        <Detail
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserList;
