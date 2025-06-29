import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { Message } from "@/types";

export const useStomp = (roomId: string) => {
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<ReturnType<Client['subscribe']> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([]); // 방 이동 시 메시지 초기화

    const client = new Client({
      brokerURL: process.env.NEXT_PUBLIC_SOCKET_URL!,
      reconnectDelay: 5000,
      onConnect: () => {
        // 기존 구독 해제
        subscriptionRef.current?.unsubscribe();

        // 새 구독 생성
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
      subscriptionRef.current?.unsubscribe();
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
