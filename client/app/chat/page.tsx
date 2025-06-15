'use client';

import EmptyChatView from "@/components/chat/empty";
import ChatRoom from "@/components/chat/room";
import RoomList from "@/components/chat/room-list";
import DrawerProps from "@/components/drawer";
import { DrawerIcon } from "@/components/icons";
import UserList from "@/components/user/list";
import { ChatStep } from "@/types/data";
import { ChatRoom as ChatRoomType } from "@/types/index";
import { Tooltip } from "@heroui/react";
import { useState } from "react";

const ChatPage = () => {
  const [step, setStep] = useState<ChatStep>();
  const [room, setRoom] = useState<ChatRoomType | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const onSelect = (room: ChatRoomType) => {
    setRoom(room);
    setStep(ChatStep.READY);
    setIsOpen(false);
  };

  /* 채팅방 새로고침 함수 */
  const onRefresh = () => setRefresh(prev => prev + 1);

  const content = () => {
    if (step === ChatStep.NEW) {
      return <UserList onSelect={(room) => { onSelect(room); onRefresh(); }} setStep={setStep} />;
    }
    if (step === ChatStep.READY && room) {
      return <ChatRoom {...room} onRefresh={onRefresh} />;
    }
    return <EmptyChatView />;
  };

  return (
    <div className='chat-page'>
      {isOpen ? (
        <div className='z-50 absolute md:static border-divider md:border-r w-full md:min-w-[257px] bg-background h-full'>
          <RoomList
            onSelect={onSelect}
            setStep={(step) => {
              setStep(step);
              if (step === ChatStep.READY) setIsOpen(false);
            } }
            onClose={() => setIsOpen(false)}
            refresh={refresh} 
            chatrooms={[]}
            selectedChatroom={null}
            onSelectChatroom={() => {}} />
        </div>
      ) : (
        <div className='md:static absolute z-50 md:border-r border-divider'>
          <div className='chat-header'>
            <Tooltip content='Open' placement='right'>
              <button className='btn-aside' onClick={() => setIsOpen(!isOpen)}>
                <DrawerIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      )}
      {/* <DrawerProps onSelect={onSelect} refresh={refresh}
        setStep={(step) => {
          setStep(step);
          if (step === ChatStep.READY) setIsOpen(false);
        }} onClose={() => setIsOpen(false)}
      /> */}
      <div className={`content-wrapper ${isOpen ? 'md:ml-auto' : ''}`}>
        {content()}
      </div>
    </div>
  );
};

export default ChatPage;
