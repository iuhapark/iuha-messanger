import { useState } from 'react';
import { useStomp } from '@/hooks/useStomp';

interface Props {
  roomId: string;
  senderId: string;
  receiverId: string;
}

const TextArea = ({ roomId, senderId, receiverId }: Props) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useStomp(roomId);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    sendMessage({
      sender: senderId,
      receiver: receiverId,
      message: trimmed,
      timestamp: new Date().toISOString(),
    });

    setMessage('');
  };

  return (
    <div className='chat-bottom'>
      <form
        className='chat-input-area'
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message'
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
