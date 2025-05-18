import { useState } from "react";
import ChatRoomList from "@/components/chat/ChatRoomList";
import ChatRoom from "@/components/chat/ChatRoom";
import UserList from "@/components/user/UserList";
import { ChatRoom as ChatRoomType } from "@/\btypes";
import { ChatStep } from "@/config/type/Data";

const Chat = () => {
  const [step, setStep] = useState<ChatStep>();
  const [room, setRoom] = useState<ChatRoomType | null>(null);

  const selectRoom = (room: ChatRoomType) => {
    setRoom(room);
    setStep(ChatStep.READY);
  };

  return (
    <div className='chat-page'>
      <div className='chat-left'>
        <ChatRoomList onSelect={selectRoom} setStep={setStep} />
      </div>
      <div className='chat-right'>
        {step === ChatStep.NEW && (
          <UserList onSelect={selectRoom} setStep={setStep} />
        )}
        {step === ChatStep.READY && room && (
          <ChatRoom
            id={room.id}
            participants={room.participants}
            lastMessage={room.lastMessage}
          />
        )}
        {!step && (
          <div className='chat-placeholder'>
            Select a chat room to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
