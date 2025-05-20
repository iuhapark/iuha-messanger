import { ChatRoom as ChatRoomType } from "@/\btypes";
import ChatMessages from "./Messages";
import TextArea from "./TextArea";

const ChatRoom = ({ id, participants, lastMessage, onRefresh }: ChatRoomType & {  onRefresh: () => void }) => {
  return (
    <div className='chat-room'>
      <ChatMessages roomId={id} />
      <TextArea id={id} participants={participants} lastMessage={lastMessage} onRefresh={onRefresh} />
    </div>
  );
};

export default ChatRoom;