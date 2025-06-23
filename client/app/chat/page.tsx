'use client';

import ProtectedRoute from "@/components/auth/protected-route";
import EmptyChatView from "@/components/chat/empty";
import Room from "@/components/chat/room";
import RoomList from "@/components/chat/room-list";
import { DrawerIcon } from "@/components/icons";
import UserSelect from "@/components/user/select";
import { ChatStep } from "@/types/data";
import { ChatRoom as ChatRoomType } from "@/types/index";
import { Tooltip } from "@heroui/react";
import { useState } from "react";

const ChatPage = () => {
  const [step, setStep] = useState<ChatStep>(ChatStep.READY);
  const [room, setRoom] = useState<ChatRoomType | null>();
  
  const [refresh, setRefresh] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  /* 채팅방 새로고침 함수 */
  const onRefresh = () => setRefresh(prev => prev + 1);


  const onSelect = (room: ChatRoomType) => {
    setRoom(room);
    setStep(ChatStep.READY);
    setIsOpen(false);
  };

  const content = () => {
    if (step === ChatStep.NEW) {
      return <UserSelect onSelect={(room) => { onSelect(room); onRefresh(); }} setStep={setStep} />;
    }
    if (step === ChatStep.READY && room) {
      return <Room {...room} onRefresh={onRefresh} isOpen={isOpen} onOpen={() => setIsOpen(true)} />;
    }
    return <EmptyChatView />;
  };

  return (
    <ProtectedRoute>
    <div className='chat-page md:h-[745px] h-[calc(100vh-64px-48px)]'>
      {isOpen ? (
        <div className='z-50 absolute md:static w-full md:max-w-[257px] h-full'>
          <RoomList
            onSelect={onSelect}
            setStep={setStep}
            onClose={() => setIsOpen(false)}
            refresh={refresh} 
            chatrooms={[]}
            selectedChatroom={null}
            onSelectChatroom={() => {}} />
        </div>
      ) : (
        <div className='z-50 absolute md:static bg-transparent md:bg-transparent md:block hidden'
             style={{ backgroundColor: 'var(--aside-background)' }}>
          <div className='chat-header'>
            <Tooltip content='Open' placement='right'>
              <button className='btn-aside' onClick={() => setIsOpen(!isOpen)}>
                <DrawerIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      )}
      {/* <DrawerProps /> */}
      <div className={`content-wrapper ${isOpen ? 'md:ml-auto' : ''}`}>
        {content()}
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default ChatPage;
