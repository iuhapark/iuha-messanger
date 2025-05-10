import { ChatRoom as ChatRoomType } from "@/\btypes";
import ChatMessages from "./Messages";
import TextArea from "./TextArea";

const ChatRoom = ({ id, name, participants }: ChatRoomType) => {
  return (
    <div className='chat-room'>
      <ChatMessages roomId={id} />
      <TextArea id={id} name={name} participants={participants} />
    </div>
  );
};

export default ChatRoom;