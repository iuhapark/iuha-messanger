import { ChatRoom as ChatRoomType } from "@/\btypes";
import ChatMessages from "./Messages";
import TextArea from "./TextArea";

const ChatRoom = ({ id, participants, lastMessage }: ChatRoomType) => {
  return (
    <div className='chat-room'>
      <ChatMessages roomId={id} />
      <TextArea id={id} participants={participants} lastMessage={lastMessage} />
    </div>
  );
};

export default ChatRoom;