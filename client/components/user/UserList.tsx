import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User } from '@/\btypes';

const UserList = ({ onSelect }: { onSelect: (user: User) => void }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get('/users/all');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className='chat-list'>
      {users.map((user) => (
        <div
          key={user.id}
          className='room'
          onClick={() => onSelect(user)}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;