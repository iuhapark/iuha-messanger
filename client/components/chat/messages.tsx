import { dummyMessages } from "@/data/chat";
import USERS from "@/data/user";
import { useMessages } from '@/hooks/useMessages';
import { useStomp } from "@/hooks/useStomp";
import api from "@/lib/api";
import { fetchSessionUser } from "@/lib/auth";
import { Message } from "@/types";
import { parseAPIError } from "@/utils/error";
import { Avatar } from "@heroui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import ModalAvatar from "../avatar/modal";

const Messages = ({ roomId }: { roomId: string }) => {
  const { messages: newMessages } = useStomp(roomId);
  const [dbMessages, setDbMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages: dummy, selectUser } = useMessages();
  const [dummyLoaded, setDummyLoaded] = useState<Message[]>([]);

  /* 더미 메시지 로딩 */
  useEffect(() => {
  const dummy = dummyMessages[roomId];
  setDbMessages(dummy ?? []);
  }, [roomId]);

  /* 세션 유저 정보 로딩 */
  useEffect(() => {
    fetchSessionUser()
    .then(user => setUserId(user.id))
    .catch(err => alert(parseAPIError(err)));
  }, []);

  /* 최초 더미 메시지 로딩 */
  useEffect(() => {
    const matchedUser = Object.values(USERS).find(u => u.id === roomId);
    if (matchedUser) {
      selectUser(matchedUser);
      import('@/data/chat').then(({ dummyMessages }) => {
        const dummy = dummyMessages[roomId] || [];
        setDummyLoaded(dummy);
      });
    }
  }, [roomId]);

  /* 서버 메시지 로딩 */
  useEffect(() => {
    api.get(`/chat/${roomId}`)
    .then(res => setDbMessages(res.data))
    .catch(err => alert(parseAPIError(err)));
  }, [roomId]);

  /* scroll 맨 아래로 */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [dbMessages, newMessages]);

  /* 더미 메시지와 서버 메시지 병합 */
  const allMessages = useMemo(
    () => [...dummyLoaded, ...dbMessages, ...newMessages],
    [dummyLoaded, dbMessages, newMessages]);

  return (
    <div className='messages'>
      {allMessages.map((m, i) => (
        <div key={i} className={`message-wrapper ${m.sender?.id === userId ? 'me' : 'you'}`}>
          <div className={`user-wrapper ${m.sender?.id === userId ? 'me' : 'you'}`}>
            {m.sender && (
              <ModalAvatar
                user={m.sender}
              />
            )}
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
