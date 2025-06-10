import { useEffect, useState } from "react";
import api from "@/lib/api";
import { User, UserListProps } from "@/types/index";
import { ChatStep } from "@/types/data";
import { parseAPIError } from "@/utils/error";
import { useAuth } from "@/context/authContext";
import {Avatar, AvatarGroup, Chip} from "@heroui/react";

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
      const { data } = await api.post(`/chat/save`, {
        name: receiver.name,
        participants: [{ id: receiver.id }],
      });
      onSelect(data);
      setStep(ChatStep.READY);
    } catch (err) {
      parseAPIError(err);
    }
  };

  return (
    <div className='flex grid-flow-row gap-2'>
      {receivers.map((receiver) => (
        <AvatarGroup key={receiver.id}>
          <Avatar showFallback name={receiver.name} src={receiver.profile} onClick={() => handleSelect(receiver)}/>
          {receiver.name}
        </AvatarGroup>
      ))}
    </div>
  );
};

export default UserList;
