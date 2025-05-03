import { ChatRoom as ChatRoomType } from "@/\btypes";
import ChatMessages from "./ChatMessages";
import TextArea from "./TextArea";

const ChatRoom = ({ id, name, sender, receiver }: ChatRoomType) => {
  return (
    <div className='chat-room'>
      <ChatMessages roomId={id} />
      <TextArea id={id} receiver={receiver} sender={sender} name={""}/>
    </div>
  );
};

export default ChatRoom;