import { User } from "@/types";
import { Avatar, Button, Listbox, ListboxItem } from "@heroui/react";

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className='w-full'>
      <Listbox aria-label='User List' variant='flat' className='w-full'>
        {users.map((user) => (
          <ListboxItem key={user.id} className='w-full'>
            <div className='flex items-center justify-between w-full gap-2'>
              <div className='flex items-center gap-3'>
                <Avatar
                  showFallback
                  name={user.name}
                  src={user.profile}
                  className='cursor-pointer hover:opacity-80 transition-opacity'
                />
                <span className='font-medium'>{user.name}</span>
              </div>
              <Button color='default' size='sm' radius='full' variant='solid'>Talk</Button>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default UserList;