'use client';

import EmptyChatView from "@/components/chat/empty";
import ChatRoom from "@/components/chat/room";
import RoomList from "@/components/chat/room-list";
import DrawerProps from "@/components/drawer";
import UserList from "@/components/user/list";
import { ChatStep } from "@/types/data";
import { ChatRoom as ChatRoomType } from "@/types/index";
import { Spacer } from "@heroui/react";
import { useState } from "react";

const ChatPage = () => {
  const [step, setStep] = useState<ChatStep>();
  const [room, setRoom] = useState<ChatRoomType | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const onSelect = (room: ChatRoomType) => {
    setRoom(room);
    setStep(ChatStep.READY);
  };

  const handleRefresh = () => setRefresh(prev => prev + 1);

  const content = () => {
    if (step === ChatStep.NEW) {
      return <UserList onSelect={(room) => { onSelect(room); handleRefresh(); }} setStep={setStep} />;
    }
    if (step === ChatStep.READY && room) {
      return <ChatRoom {...room} onRefresh={handleRefresh} />;
    }
    return <EmptyChatView />;
  };

  return (
    <div className='chat-page'>
      <Spacer x={5} />
      <RoomList 
        onSelect={onSelect} refresh={refresh}
        setStep={(step) => {
          setStep(step);
          if (step === ChatStep.READY) setIsOpen(false);
        }} onClose={() => setIsOpen(false)}
      />
      {/* <UserList 
        onSelect={onSelect}
        setStep={(step) => {
          setStep(step);
          if (step === ChatStep.READY) setIsOpen(false);
        }}
      /> */}
      {/* <DrawerProps onSelect={onSelect} refresh={refresh}
        setStep={(step) => {
          setStep(step);
          if (step === ChatStep.READY) setIsOpen(false);
        }} onClose={() => setIsOpen(false)}
      /> */}
      <div className={`chat-block ${isOpen ? 'shifted' : ''}`}>
        {content()}
      </div>
    </div>
  );
};

export default ChatPage;
