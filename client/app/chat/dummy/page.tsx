'use client';

import { useChatMessages } from "@/hooks/useChatMessages";
import ChatRoom from "@/bak/components/room";
import RoomList from "@/bak/components/room-list";

export default function ChatPage() {
  const {
    selectedUser,
    selectUser,
    messages,
    currentMessage,
    setCurrentMessage,
    sendMessage,
    isTyping,
    unreadMap,
  } = useChatMessages();

  return (
    <div className="chat-page flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <RoomList
        selectedUser={selectedUser}
        selectUser={selectUser}
        unreadMap={unreadMap}
      />

      {/* Chat Area */}
      <div className="chat-room flex-1 flex flex-col">
        <ChatRoom
          user={selectedUser}
          messages={messages}
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
          onSend={sendMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
}
