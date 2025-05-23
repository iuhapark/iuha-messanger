import { ChatRoomListProps, ChatRoom, User } from "@/types/index";
import api from "@/lib/api";
import { errorHandling } from "@/utils/error";
import { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { ChatStep } from "@/types/data";
import { useAuth } from "@/context/AuthContext";

const ChatRoomList = ({ setStep, onSelect, refresh }: ChatRoomListProps & { setStep: (step: ChatStep) => void; refresh: number }) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const { user } = useAuth();
  const myId = user?.id;

  useEffect(() => {
    if (!user || !user.id) return;

    const fetchRooms = async () => {
      try {
        const res = await api.get('/chat/my');
        setRooms(res.data);
      } catch (err) {
        alert(errorHandling(err));
      }
    };
    fetchRooms();
  }, [refresh]);

  return (
    <div className='chat-list'>
      <button className='new-room-btn' onClick={() => setStep(ChatStep.NEW)}>
        <IoCreateOutline />
      </button>
      {rooms.map((room) => (
        <div key={room.id} onClick={() => onSelect(room)}>
          {room.participants
            .filter((user: User) => user.id !== myId)
            .map((user: User) => (
              <div key={user.id} className='room'>
                <img src={user.profile || '/assets/img/default.png'} alt={user.name} className='room-img' />
                <div className='flex-col justify-start'>
                  <div className='room-name'>{user.name}</div>
                  <div className='room-msg'>{room.lastMessage?.slice(0, 17)}</div>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
