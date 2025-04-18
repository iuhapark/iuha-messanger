import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/router";
import { ChatRoom } from "@/\btypes";
import { useAuth } from "@/hooks/useAuth";
import { errorHandling } from "@/utils/error";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id;

  /* 내 채팅방 목록 조회 */
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/chat/my');
        setChatRooms(res.data);
      } catch (err: any) {
        const message = errorHandling(err);
        alert(message);
      }
    };
    fetchRooms();
  }, []);

  /* 채팅방 클릭 시 이동 */
  const handleClick = (room: ChatRoom) => {
    router.push({
      pathname: `/chat/${room.id}`,
      query: {
        senderId: user?.id,
        receiverId: user?.id,
      },
    });
  };

  /* 채팅방 생성 DB 저장 */
  const createRoom = async () => {
    try {
      const { data } = await api.post(`/chat/save`, {
        name: `${user?.name}`,
        sender: { id: userId },
        receiver: { id: userId },
      });
      setChatRooms((prev) => [...prev, data]);
      handleClick(data);
    } catch (err) {
      const message = errorHandling(err);
      alert(message);
    }
  };

  return (
    <div className='chat-list'>
      {chatRooms.map((room) => (
        <div key={room.id} className='room' onClick={() => handleClick(room)}>
          {room.name}
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
