import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User, UserListProps } from '@/\btypes';
import { errorHandling } from '@/utils/error';
import { ChatStep } from '@/config/type/Data';

/* 유저 목록 조회 및 선택 */
const UserList = ({ setStep, onSelect }: UserListProps) => {
  const [receivers, setReceivers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users/list');
        setReceivers(res.data);
      } catch (err) {
        errorHandling(err);
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
      errorHandling(err);
    }
  };

  return (
    <div className='user-list'>
      {receivers.map((receiver) => (
        <div key={receiver.id} className='bubble' onClick={() => handleSelect(receiver)}>
          {receiver.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
