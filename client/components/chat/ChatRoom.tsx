import ChatMessages from './ChatMessages';
import TextArea from './TextArea';

interface Props {
  roomId: string;
  senderId: string;
  receiverId: string;
}

const ChatRoom = ({ roomId, senderId, receiverId }: Props) => {
  return (
    <div className='chat-room'>
      <ChatMessages roomId={roomId} />
      <TextArea roomId={roomId} senderId={senderId} receiverId={receiverId} />
    </div>
  );
};

export default ChatRoom;
