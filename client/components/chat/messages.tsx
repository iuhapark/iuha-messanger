import { useStomp } from "@/hooks/useStomp";
import { Message } from "@/types";
import api from "@/lib/api";
import { parseAPIError } from "@/utils/error";
import { useEffect, useMemo, useRef, useState } from "react";
import ModalAvatar from "../avatar/modal";
import { fetchSessionUser } from "@/lib/auth";
import { dummyMessages } from "@/data/chat";

const Messages = ({ roomId }: { roomId: string }) => {
  const { messages: stompMessages } = useStomp(roomId);
  const [dbMessages, setDbMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const user = await fetchSessionUser();
        setUserId(user.id);
      } catch (err) {
        alert(parseAPIError(err));
      }
    };
    load();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chat/${roomId}`);
        setDbMessages(res.data);
      } catch (err) {
        alert(parseAPIError(err));
      }
    };
    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "instant" });
  }, [dbMessages, stompMessages]);

  const allMessages = useMemo(() => {
    const dummy = dummyMessages[roomId] || [];
    return [...dummy, ...dbMessages, ...stompMessages];
  }, [roomId, dbMessages, stompMessages]);

  return (
    <div className='messages'>
      {allMessages.map((m, i) => (
        <div key={`${m.id}-${i}`} className={`message-wrapper ${m.sender?.id === userId ? "me" : "you"}`}>
          <div className={`user-wrapper ${m.sender?.id === userId ? "me" : "you"}`}>
            {m.sender && <ModalAvatar user={m.sender} />}
            <div>
              <div>{m.sender?.name}</div>
              <div className='text-xs' style={{ color: 'var(--text-color)' }}>
                @{m.sender?.username}
              </div>
            </div>
          </div>
          <div className={`bubble-wrapper ${m.sender?.id === userId ? "me" : "you"}`}>
            <div className={`chat-bubble ${m.sender?.id === userId ? "me" : "you"}`}>{m.message}</div>
            <div className={`text-[0.75rem] ${m.sender?.id === userId ? "me" : "you"}`}>
              {m.timestamp?.slice(11, 16)}
            </div>
          </div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
