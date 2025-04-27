import { useRouter } from "next/router";
import ChatRoom from "@/components/chat/ChatRoom";

const ChatRoomPage = () => {
  const router = useRouter();
  const { roomId, receiverId, senderId } = router.query;

  if (
    !roomId || typeof roomId !== 'string' ||
    !receiverId || typeof receiverId !== 'string' ||
    !senderId || typeof senderId !== 'string'
  ) {
    return <div className='chat-placeholder'>채팅방을 찾을 수 없습니다.</div>;
  }

  return (<>
     <ChatRoom id={roomId} name={''} senderId={senderId} receiverId={receiverId} />
    </>
  );
};

export default ChatRoomPage;
