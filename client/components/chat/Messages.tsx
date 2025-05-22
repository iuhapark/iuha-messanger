import { useStomp } from '@/hooks/useStomp';
import { useEffect, useRef, useState, useMemo } from 'react';
import api from '@/lib/api';
import { Message } from '@/types';
import { errorHandling } from '@/utils/error';
import { fetchSessionUser } from '@/lib/auth';

const Messages = ({ roomId }: { roomId: string }) => {
  const { messages: newMessages } = useStomp(roomId);
  const [dbMessages, setDbMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSessionUser().then(user => setUserId(user.id)).catch(err => alert(errorHandling(err)));
  }, []);

  useEffect(() => {
    api.get(`/chat/${roomId}`).then(res => setDbMessages(res.data)).catch(err => alert(errorHandling(err)));
  }, [roomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dbMessages, newMessages]);

  const allMessages = useMemo(() => [...dbMessages, ...newMessages], [dbMessages, newMessages]);

  return (
    <div className='chat-messages'>
      {allMessages.map((m, i) => (
        <div key={i} className={`chat-message-block ${m.sender?.id === userId ? 'me' : 'you'}`}>
          <div className='chat-user'>
            <img src={m.sender?.profile || '/assets/img/default.png'} alt='profile' className='profile' />
            <div className='username'>{m.sender?.name}</div>
          </div>
          <div className='chat-bubble-wrapper'>
            <div className={`chat-bubble ${m.sender?.id === userId ? 'me' : 'you'}`}>{m.message}</div>
            <div className='chat-time'>{m.timestamp?.slice(11, 16)}</div>
          </div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;