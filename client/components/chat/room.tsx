import { ChatRoom as ChatRoomType } from "@/types";
import Messages from "./messages";
import TextArea from "./text-area";

const Room = ({ id, participants, lastMessage, onRefresh }: ChatRoomType & { onRefresh: () => void }) => (
  <div className='chat-room'>
    <Messages roomId={id} />
    <TextArea id={id} participants={participants} lastMessage={lastMessage} onRefresh={onRefresh} />
  </div>
);

export default Room;