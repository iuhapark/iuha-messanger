import { useState } from 'react';
import api, { API } from '@/lib/api';
import { parseCookies } from 'nookies';
import { jwtDecode } from 'jwt-decode';

interface MessageInputProps {
  roomId: string;
}

const MessageInput = ({ roomId }: MessageInputProps) => {
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const { accessToken } = parseCookies();
    const { id: senderId }: any = jwtDecode(accessToken);

    await api.post(`${API.CHAT}/${roomId}/send`, {
      sender: senderId,
      receiver: roomId,
      message: input,
    });
    setInput('');
  };

  return (
    <div className='message-input'>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder='Type a message...'
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;