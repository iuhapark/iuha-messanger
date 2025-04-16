'use client';

import ChatRoomList from "@/components/chat/ChatRoomList";
import ChatRoom from "@/components/chat/ChatRoom";
import { useState } from "react";

const Chat = () => {
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  return (
    <div className='chat-page'>
      <div className='chat-left'>
        <ChatRoomList onSelectRoom={(roomId) => setActiveRoomId(roomId)} />
      </div>
      <div className='chat-right'>
        {activeRoomId ? (
          <ChatRoom roomId={activeRoomId} />
        ) : (
          <div className='chat-placeholder'>Select a chat room to start chatting.</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
