import { ChatRoom, ChatRoomListProps, User } from "@/\btypes";
import api from "@/lib/api";
import { errorHandling } from "@/utils/error";
import { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { ChatStep } from "@/config/type/Data";

const ChatRoomList = ({ setStep, onSelect }: ChatRoomListProps & { setStep: (step: ChatStep) => void }) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  /* 내 채팅방 목록 조회 */
  useEffect(() => {
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
  }, []);

  return (
    <div className='chat-list'>
      {/* 상태 NEW로 변경*/}
      <button className='new-room-btn' onClick={() => setStep(ChatStep.NEW)}>
        <IoCreateOutline />
      </button>
      {rooms.map((room) => (
        /* 선택 시 해당 room으로 이동 && 상태 READY로 변경 */
        <div key={room.id} onClick={() => { onSelect(room); setStep(ChatStep.READY)}} className='room'>
          {room.name}
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
