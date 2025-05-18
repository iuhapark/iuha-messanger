import { useStomp } from "@/hooks/useStomp";
import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";
import { Message } from "@/\btypes";
import { errorHandling } from "@/utils/error";
import { getSessionUser } from "@/lib/auth";

const Messages = ({ roomId }: { roomId: string }) => {
  const { messages: newMessages } = useStomp(roomId);
  const [dbMessages, setDbMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getSessionUser();
        setUserId(user.id);
      } catch (err) {
        const message = errorHandling(err);
        alert(message);
      }
    };
    fetchUser();
  }, []);

  /* 최초 DB 메시지 로딩 */
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chat/${roomId}`);
        setDbMessages(res.data);
      } catch (err) {
        const message = errorHandling(err);
        alert(message);
      }
    };
    fetchMessages();
  }, [roomId]);

  /* 스크롤 항상 맨 아래로 */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dbMessages, newMessages]);

  /* DB 메시지 + WebSocket 실시간 메시지 합치기 */
  const messages = [...dbMessages, ...newMessages];

  return (
    <div className='chat-messages'>
      {messages.map((m, idx) => (
        <div key={idx} className={`chat-message-block ${m.sender?.id === userId ? 'me' : 'you'}`}>
          <img src={m.sender?.profile} alt='profile' className='profile-img' />
          <div className='chat-sender'>{m.sender?.name}</div>
          <div className='chat-bubble-wrapper'>
            <div className='chat-time'>{m.timestamp?.slice(11, 16)}</div>
            <div className={`chat-bubble ${m.sender?.id === userId ? 'me' : 'you'}`}>
              {m.message}
            </div>
          </div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
