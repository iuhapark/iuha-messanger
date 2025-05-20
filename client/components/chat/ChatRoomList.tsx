import { ChatRoom, ChatRoomListProps, User } from "@/\btypes";
import api from "@/lib/api";
import { errorHandling } from "@/utils/error";
import { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { ChatStep } from "@/config/type/Data";
import { useAuth } from "@/context/AuthContext";

const ChatRoomList = ({ setStep, onSelect, refresh }: ChatRoomListProps & { setStep: (step: ChatStep) => void; refresh: number }) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const { user } = useAuth();
  const myId = user?.id;

  /* 내 채팅방 목록 조회 */
  useEffect(() => {
    if (!user) return;

    const fetchRooms = async () => {
      try {
        const res = await api.get('/chat/my');
        setRooms(res.data);
      } catch (err: any) {
        const message = errorHandling(err);
        alert(message);
      }
    };
    fetchRooms();
  }, [user?.id, refresh]);

  return (
    <div className='chat-list'>
      {/* 상태 NEW로 변경*/}
      <button className='new-room-btn' onClick={() => setStep(ChatStep.NEW)}>
        <IoCreateOutline />
      </button>
      {rooms.map((room) => (
        /* 선택 시 해당 room으로 이동 && 상태 READY로 변경 */
        <div key={room.id} onClick={() => { onSelect(room); setStep(ChatStep.READY)}}>
          {room.participants
          .filter((user: User) => user.id !== myId)
          .map((user: User) => (
            <div key={user.id} className='room'>
                <img src={user.profile  || '/assets/img/default.png'} alt={user.name} className='room-img' />
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
