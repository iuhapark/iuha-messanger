'use client'

import { useEffect, useState } from 'react';
import api, { API } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface ChatMessage {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string;
}

const ChatRoomList = () => {
  const [rooms, setRooms] = useState<ChatMessage[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await api.get(`${API.CHAT}/my`);
      setRooms(
        res.data.sort((a: ChatMessage, b: ChatMessage) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      );
    };
    fetchMessages();
  }, []);

  const handleRoomClick = (receiverId: string) => {
    router.push(`/chat?roomId=${receiverId}`);
  };

  const uniqueReceivers = Array.from(
    new Map(rooms.map((msg) => [msg.receiver, msg])).values()
  );

  return (
    <aside className='chat-side'>
      <h2>Chat Rooms</h2>
      <ul>
        {uniqueReceivers.map((msg) => (
          <li key={msg.receiver} onClick={() => handleRoomClick(msg.receiver)}>
            {msg.receiver} - {msg.message}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatRoomList;