import { useEffect, useRef, useState } from "react";
import { useStomp } from "@/hooks/useStomp";
import { ChatRoom as ChatRoomType, Message, User } from "@/types";
import { useAuth } from "@/context/authContext";

const TextArea = ({ id, participants, lastMessage, onRefresh }: ChatRoomType & { onRefresh: () => void }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useStomp(id);
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    const data: Message = {
      roomId: id,
      sender: { id: user?.id, name: user?.name, profile: user?.profile } as User,
      message: trimmed,
    };

    await sendMessage(data);
    setMessage('');
    inputRef.current?.focus();
    onRefresh();
  };

  return (
    <div className='text-area'>
      <form className='input-wrapper' onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message...'
          className='input'
        />
        <button type='submit' className='btn-primary h-[1.5rem] py-0.4 px-3.5'>Send</button>
      </form>
    </div>
  );
};

export default TextArea;
