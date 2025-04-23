'use client'

import { useSearchParams } from 'next/navigation';
import MessageInput from './MessageInput';
// import ChatMessage from './ChatMessage';

const ChatRoom = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId') || '';

  return (
    <div className='chat-main'>
      {/* <ChatMessage roomId={roomId} /> */}
      <MessageInput roomId={roomId} />
    </div>
  );
};

export default ChatRoom;
