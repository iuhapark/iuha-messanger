import { useState } from "react";
import ChatRoomList from "@/components/chat/ChatRoomList";
import ChatRoom from "@/components/chat/ChatRoom";
import UserList from "@/components/user/UserList";
import { ChatRoom as ChatRoomType } from "@/\btypes";
import { ChatStep } from "@/config/type/Data";

const Chat = () => {
  const [step, setStep] = useState<ChatStep>();
  const [room, setRoom] = useState<ChatRoomType | null>(null);
  const [refresh, setRefresh] = useState(0);

  const selectRoom = (room: ChatRoomType) => {
    setRoom(room);
    setStep(ChatStep.READY);
  };

  const onRefresh = () => setRefresh(prev => prev + 1);

  return (
  <div className='chat-page'>
    <div className='chat-left'>
      <ChatRoomList onSelect={selectRoom} setStep={setStep} refresh={refresh}/>
    </div>
    <div className='chat-right'>
      {step === ChatStep.NEW && (
        <UserList onSelect={(room) => {
            selectRoom(room);
            onRefresh();
          }} setStep={setStep} />
      )}
      {step === ChatStep.READY && room && (
        <ChatRoom
          id={room.id}
          participants={room.participants}
          lastMessage={room.lastMessage}
          onRefresh={onRefresh}
        />
      )}
      {!step && (
        <div className='chat-placeholder'>
          대화를 시작하려면 채팅방을 선택하세요.
        </div>
      )}
    </div>
  </div>
  );
};

export default Chat;
