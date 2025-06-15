import { ChatRoom as ChatRoomType } from "@/types";
import Messages from "./messages";
import TextArea from "./text-area";
import AvatarProps from "../user/avatar";
import { Avatar } from "@heroui/react";

const Room = ({ id, participants, lastMessage, onRefresh }: ChatRoomType & { onRefresh: () => void }) => (
  <div className='chat-room'>
    <div className='flex p-[0.5rem] gap-[0.5rem] items-center font-semibold shrink-0'>
    <Avatar
      showFallback
      name={participants[0]?.name}
      src={participants[0]?.profile}
      alt={participants[0]?.name}
      className='avatar'
    />
    <h1 className='flex-col'>{participants[0]?.name}</h1>
    </div>
    <Messages roomId={id} />
    <TextArea id={id} participants={participants} lastMessage={lastMessage} onRefresh={onRefresh} />
  </div>
);

export default Room;