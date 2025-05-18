import { useEffect, useRef, useState } from 'react';
import { useStomp } from '@/hooks/useStomp';
import { ChatRoom as ChatRoomType, Message, User } from '@/\btypes';
import { useAuth } from '@/context/AuthContext';

const TextArea = ({ id, participants, lastMessage, onRefresh }: ChatRoomType & { onRefresh: () => void }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useStomp(id);
  const { user } = useAuth();
	const ref = useRef<HTMLInputElement>(null);

  /** 초기 Input Focus */
  useEffect(() => {
    if(ref.current)
      ref.current.focus();
  }, []);

  /** 엔터키로 메시지 전송 */
  const send = async () => {
    const data: Message = {
      roomId: id,
      sender: { 
        id: user?.id,
        name: user?.name,
        profile: user?.profile,
       } as User,
      message: message.trim(),
    };
    onRefresh();
    await sendMessage(data);
    setMessage('');
    ref.current?.focus();
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
          ref={ref}
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
