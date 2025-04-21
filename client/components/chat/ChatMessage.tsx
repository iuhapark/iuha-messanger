'use client'

import { useEffect, useState } from 'react';
import api, { API } from '@/lib/api';

interface ChatMessageProps {
  roomId: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string;
}

const ChatMessage = ({ roomId }: ChatMessageProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await api.get(`${API.CHAT}/${roomId}`);
      setMessages(res.data);
    };

    if (roomId) fetchMessages();
  }, [roomId]);

  return (
    <div className='chat-messages'>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.sender}</strong>: {msg.message}
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
