import ChatRoom from "@/components/chat/ChatRoom";
import ChatRoomList from "@/components/chat/ChatRoomList";
import { useState } from "react";

const Chat = () => {
  const [ activeRoom, setActiveRoom ] = useState();

  return (
    <div className='chat-page'>
      <div className='chat-left'>
        <ChatRoomList />
      </div>
      <div className='chat-right'>
        {activeRoom ? (
          <ChatRoom roomId={''} senderId={''} receiverId={''} />
        ) : (
          <div className='chat-placeholder'>
            Select a chat room to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
