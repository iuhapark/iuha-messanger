'use client';

import ProtectedRoute from "@/components/auth/protected-route";
import EmptyChatView from "@/components/chat/empty";
import Room from "@/components/chat/room";
import RoomList from "@/components/chat/room-list";
import Search from "@/components/chat/search";
import { DrawerIcon } from "@/components/icons/icons";
import UserModal from "@/components/user/list/modal";
import { ChatStep } from "@/types/data";
import { ChatRoom as ChatRoomType } from "@/types/index";
import { Tooltip } from "@heroui/react";
import { useState } from "react";
import { useAuth } from "@/context/authContext";

const ChatPage = () => {
  const [step, setStep] = useState<ChatStep>(ChatStep.READY);
  const [room, setRoom] = useState<ChatRoomType | null>(null);
  const [rooms, setRooms] = useState<ChatRoomType[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const { user } = useAuth();

  const onRefresh = () => setRefresh((prev) => prev + 1);

  const onSelect = (room: ChatRoomType) => {
    setRoom(room);
    setStep(ChatStep.READY);
    setIsOpen(false);
  };

  const content = () => {
    if (step === ChatStep.NEW) {
      return <UserModal onSelect={(room) => { onSelect(room); onRefresh(); }} setStep={setStep} isOpen={true}
        onClose={() => setStep(ChatStep.READY)} />;
    }
    if (step === ChatStep.SEARCH) {
      return <Search onSelect={(room) => { onSelect(room); onRefresh(); } } setStep={setStep} isOpen={true}
          onClose={() => setStep(ChatStep.READY)} rooms={rooms} myId={user?.id || ''} />;
    }
    if (step === ChatStep.READY && room) {
      return <Room {...room} onRefresh={onRefresh} isOpen={isOpen} onOpen={() => setIsOpen(true)} />;
    }
    return <EmptyChatView isOpen={isOpen} onOpen={() => setIsOpen(true)} />;
  };

  const drawerToggle = (
    <div className='z-10 absolute md:static bg-transparent md:bg-transparent md:block hidden'
         style={{ backgroundColor: 'var(--aside-background)' }}>
      <div className='chat-header'>
        <Tooltip content='Open' placement='right'>
          <button className='btn-aside' onClick={() => setIsOpen(true)}>
            <DrawerIcon />
          </button>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className='chat-page'>
        {isOpen ? (
          <div className='z-10 absolute md:static w-full max-w-[240px] h-full'>
            <RoomList
              onSelect={onSelect}
              setStep={setStep}
              onClose={() => setIsOpen(false)}
              refresh={refresh}
              setRooms={setRooms}
              selectedChatroom={null}
              onSelectChatroom={() => {}}
            />
          </div>
        ) : drawerToggle}
        <div className={`content-wrapper ${isOpen ? 'md:ml-auto' : ''}`}>
          {content()}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatPage;
