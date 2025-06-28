import { useAuth } from "@/context/authContext";
import { ChatRoom as ChatRoomType } from "@/types";
import MessageHeader from "./header";
import Messages from "./messages";
import TextArea from "./text-area";

const Room = ({ id, participants, lastMessage, onRefresh, isOpen, onOpen }: ChatRoomType & { onRefresh: () => void; isOpen: boolean; onOpen: () => void; }) => {
  const { user } = useAuth();
  const receiver = participants?.find((p) => p.id !== user?.id);
  
  return (
  <div className='chat-room'>
      {receiver && <MessageHeader receiver={receiver} onOpen={onOpen} isOpen={isOpen} />}
      <Messages roomId={id} />
      <TextArea id={id} participants={participants} lastMessage={lastMessage} onRefresh={onRefresh} />
    </div>
  );
};

export default Room;