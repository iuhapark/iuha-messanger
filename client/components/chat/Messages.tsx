import { useStomp } from "@/hooks/useStomp";
import { useEffect, useRef, useState, useMemo } from "react";
import api from "@/lib/api";
import { Message } from "@/types";
import { parseAPIError } from "@/utils/error";
import { fetchSessionUser } from "@/lib/auth";
import { Avatar, User } from "@heroui/react";

const Messages = ({ roomId }: { roomId: string }) => {
  const { messages: newMessages } = useStomp(roomId);
  const [dbMessages, setDbMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSessionUser().then(user => setUserId(user.id)).catch(err => alert(parseAPIError(err)));
  }, []);

  useEffect(() => {
    api.get(`/chat/${roomId}`).then(res => setDbMessages(res.data)).catch(err => alert(parseAPIError(err)));
  }, [roomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dbMessages, newMessages]);

  const allMessages = useMemo(() => [...dbMessages, ...newMessages], [dbMessages, newMessages]);

  return (
    <div className='messages'>
      {allMessages.map((m, i) => (
        <div key={i} className={`message-wrapper ${m.sender?.id === userId ? 'me' : 'you'}`}>
          <div className={`user-wrapper ${m.sender?.id === userId ? 'me' : 'you'}`}>
            <Avatar
              isBordered
              src={m.sender?.profile}
              name={m.sender?.name}
              className='avatar'
            />
            <div>
              <div>{m.sender?.name}</div>
              <div className='text-xs' style={{ color: 'var(--text-color)' }}>{`@` + m.sender?.username}</div>
            </div>
          </div>
          <div className={`bubble-wrapper ${m.sender?.id === userId ? 'me' : 'you'}`}>
            <div className={`chat-bubble ${m.sender?.id === userId ? 'me' : 'you'}`}>{m.message}</div>
            <div className={`text-[0.75rem] ${m.sender?.id === userId ? 'me' : 'you'}`}>{m.timestamp?.slice(11, 16)}</div>
          </div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;