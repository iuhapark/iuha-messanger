import { ChatRoom as ChatRoomType } from "@/\btypes";
import ChatMessages from "./ChatMessages";
import TextArea from "./TextArea";
import { useEffect } from "react";

const ChatRoom = ({ id, name, receiver, sender }: ChatRoomType) => {
  useEffect (() => {
    console.log('TextArea props:', { id, sender, receiver });
  }
  ,[])
  return (
    <div className='chat-room'>
      <ChatMessages roomId={id} />
      <TextArea id={id} name={name} receiver={receiver} sender={sender}/>
    </div>
  );
};

export default ChatRoom;