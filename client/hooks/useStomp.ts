import { useEffect, useRef, useState } from "react";
import * as Stomp from "@stomp/stompjs";
import { Message } from "@/types/index";

export const useStomp = (roomId: string) => {
  const clientRef = useRef<Stomp.Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([]);
    const client = new Stomp.Client({
      brokerURL: process.env.NEXT_PUBLIC_SOCKET_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/${roomId}`, (msg) => {
          const content: Message = JSON.parse(msg.body);
          setMessages((prev) => [...prev, content]);
        });
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  const sendMessage = (data: Message) => {
    if (!clientRef.current) return;
    clientRef.current.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(data),
    });
  };

  return { messages, sendMessage };
};
