  import { useEffect, useState } from "react";
  import api from "@/lib/api";
  import { ChatRoom } from "@/\btypes";
  import CreateIcon from "@mui/icons-material/Create";
import { CHAT_API } from "@/lib/constants";

  interface Props {
    onSelectRoom: (roomId: string) => void;
  }

  const ChatRoomList = ({ onSelectRoom }: Props) => {
    const [rooms, setRooms] = useState<ChatRoom[]>([]);

    useEffect(() => {
      api.get(CHAT_API.ALL).then((res) => setRooms(res.data));
    }, []);

    const handleCreateRoom = async () => {
      const today = new Date(); // timestamp
      const date = today.toISOString().split('T')[0]; // YYYY-MM-DD
      const time = today.toTimeString().split(' ')[0]; // HH:MM:SS
      const name = `${date} ${time}`;
      const { data } = await api.post(CHAT_API.SAVE, name);
      setRooms((prev) => [...prev, data]);
      onSelectRoom(data.id);
    };

    return (
      <div className='chat-list'>
        <button className='new-room-btn' onClick={handleCreateRoom}><CreateIcon /></button>
        {rooms.map((room) => (
          <div key={room.id} className='room' onClick={() => onSelectRoom(room.id)}>
            {room.name}
          </div>
        ))}
      </div>
    );
  };

  export default ChatRoomList;
