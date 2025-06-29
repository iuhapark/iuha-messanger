import { useEffect, useRef, useState } from "react";
import * as Stomp from "@stomp/stompjs";
import { Message } from "@/types/index";

export const useStomp = (roomId: string) => {
  const clientRef = useRef<Stomp.Client | null>(null);
  const subscriptionRef = useRef<Stomp.Subscription | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([]); // ✅ 방 이동 시 초기화

    const client = new Stomp.Client({
      brokerURL: process.env.NEXT_PUBLIC_SOCKET_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe();
        }

        const subscription = client.subscribe(`/topic/${roomId}`, (msg) => {
          const content: Message = JSON.parse(msg.body);
          setMessages((prev) => [...prev, content]);
        });

        subscriptionRef.current = subscription;
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      client.deactivate();
    };
  }, [roomId]);

  const sendMessage = (data: Message) => {
    clientRef.current?.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(data),
    });
  };

  return { messages, sendMessage };
};
