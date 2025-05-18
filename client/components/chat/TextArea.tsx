import { useState } from 'react';
import { useStomp } from '@/hooks/useStomp';
import { ChatRoom as ChatRoomType, Message, User } from '@/\btypes';
import { useAuth } from '@/context/AuthContext';

const TextArea = ({ id, participants, lastMessage }: ChatRoomType) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useStomp(id);
  const { user } = useAuth();

  const send = () => {
    const data: Message = {
      roomId: id,
      sender: { 
        id: user?.id,
        name: user?.name,
        profile: user?.profile,
       } as User,
      message: message.trim(),
    };
    sendMessage(data);
    setMessage('');
  };

  return (
    <div className='chat-bottom'>
      <form
        className='chat-input-area'
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message...'
          className='chat-input'
        />
        <button type='submit' className='chat-send-btn'>
          Send
        </button>
      </form>
    </div>
  );
};

export default TextArea;
