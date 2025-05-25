'use client';

import { useState, useMemo } from 'react';
import ChatRoom from '@/components/chat/ChatRoom';
import ChatRoomList from '@/components/chat/ChatRoomList';
import UserList from '@/components/user/UserList';
import { ChatStep } from '@/types/data';
import { ChatRoom as ChatRoomType } from '@/types/index';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const ChatPage = () => {
  const [step, setStep] = useState<ChatStep>();
  const [room, setRoom] = useState<ChatRoomType | null>(null);
  const [refresh, setRefresh] = useState(0);

  const onSelect = (room: ChatRoomType) => {
    setRoom(room);
    setStep(ChatStep.READY);
  };

  const handleRefresh = () => setRefresh(prev => prev + 1);

  const content = useMemo(() => {
    if (step === ChatStep.NEW) {
      return <UserList onSelect={(room) => { onSelect(room); handleRefresh(); }} setStep={setStep} />;
    }
    if (step === ChatStep.READY && room) {
      return <ChatRoom {...room} onRefresh={handleRefresh} />;
    }
    return <div className='chat-placeholder'>대화를 시작하려면 채팅방을 선택하세요.</div>;
  }, [step, room]);

  return (
    <ProtectedRoute>
      <div className='chat-page'>
        <div className='chat-left'>
          <ChatRoomList onSelect={onSelect} setStep={setStep} refresh={refresh} />
        </div>
        <div className='chat-right'>{content}</div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatPage;