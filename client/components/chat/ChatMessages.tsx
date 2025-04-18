import { useStomp } from '@/hooks/useStomp';
import { useEffect, useRef, useState } from 'react';
import api from '@/lib/api';
import { Message } from '@/\btypes'; // 타입에 맞게 경로 조정해줘!
import { errorHandling } from '@/utils/error';
import { getSessionUser } from '@/lib/auth';

const ChatMessages = ({ roomId }: { roomId: string }) => {
  const { messages: realTimeMessages } = useStomp(roomId);
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

  /* 특정 채팅방 메시지 조회 */
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
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dbMessages, realTimeMessages]);

  /* DB 메시지 + WebSocket 실시간 메시지 합치기 */
  const allMessages = [...dbMessages, ...realTimeMessages];

  return (
    <div className='chat-messages'>
      {allMessages.map((m, idx) => (
        <div key={idx} className={`chat-message-block ${m.sender === userId ? 'me' : 'you'}`}>
          <div className='chat-sender'>{m.sender}</div>
          <div className='chat-bubble-wrapper'>
            <div className='chat-time'>{m.timestamp?.slice(11, 16)}</div>
            <div className={`chat-bubble ${m.sender === userId ? 'me' : 'you'}`}>
              {m.message}
            </div>
          </div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
