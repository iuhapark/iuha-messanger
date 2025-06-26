import { useEffect, useState } from "react";
import api from "@/lib/api";
import { User, UserListProps } from "@/types/index";
import { ChatStep } from "@/types/data";
import { parseAPIError } from "@/utils/error";
import { useAuth } from "@/context/authContext";
import {Avatar, AvatarGroup, Chip, Listbox, ListboxItem, Tooltip} from "@heroui/react";

export const ListboxWrapper = ({children}: { children: React.ReactNode }) => (
  <div>
    {children}
  </div>
);
/* 유저 목록 조회 및 선택 */
const UserList = ({ setStep, onSelect }: UserListProps) => {
  const [receivers, setReceivers] = useState<User[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.id) return;
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users/user-list');
        setReceivers(res.data);
      } catch (err) {
        parseAPIError(err);
      }
    };
    fetchUsers();
  }, []);

  const handleSelect = async (receiver: User) => {
    try {
      const res = await api.get(`/users/${receiver.id}`);
      onSelect(res.data);
    } catch (err) {
      parseAPIError(err);
    }
  };

  return (
      <ListboxWrapper>
      <Listbox aria-label='Listbox' variant='flat'>
        {receivers.map((receiver) => (
            <ListboxItem
              key={receiver.id}
              className='cursor-pointer'
              startContent={
              <Avatar showFallback
                name={receiver.name}
                src={receiver.profile}
                onClick={() => handleSelect(receiver)}
                className='hover:opacity-80 transition-opacity'
                />
              }
            >
              {receiver?.name}
            </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
    // <div className='flex grid-flow-col md:grid-flow-row gap-2 p-3'>
    // {receivers.map((receiver) => (
    //   <AvatarGroup key={receiver.id} className='cursor-pointer'>
    //     <Tooltip content={receiver.name} placement='bottom'>
    //       <Avatar
    //         showFallback
    //         name={receiver.name}
    //         src={receiver.profile}
    //         onClick={() => handleSelect(receiver)}
    //         className='hover:opacity-80 transition-opacity'
    //       />
    //     </Tooltip>
    //   </AvatarGroup>
  //   ))}
  // </div>
  );
};

export default UserList;
