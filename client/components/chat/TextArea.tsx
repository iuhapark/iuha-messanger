import { useState } from 'react';
import { useStomp } from '@/hooks/useStomp';
import { ChatRoom as ChatRoomType, Message } from '@/\btypes';


const TextArea = ({ id, name, sender, receiver }: ChatRoomType) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useStomp(id);

  const send = () => {
    const data: Message = {
      roomId: id,
      sender: sender,
      receiver: receiver,
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
