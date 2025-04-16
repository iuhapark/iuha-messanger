'use client';

import { useEffect, useRef, useState } from "react";
import * as Stomp from "@stomp/stompjs";
import api from "@/lib/api";
import { ChatRoomProps, Message } from "@/\btypes";
import { CHAT_API, SOCKET } from "@/lib/constants";

const ChatRoom = ({ roomId }: ChatRoomProps) => {
  const username = 'You';
  const stompClient = useRef<Stomp.Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || !stompClient.current) return;

    const newMsg: Message = {
      roomId,
      sender: username,
      receiver: 'juha',
      message: trimmed,
      timestamp: new Date().toISOString(),
    };

    stompClient.current.publish({
      destination: SOCKET.SEND(roomId),
      body: JSON.stringify(newMsg),
    });

    setMessage('');
  };

  useEffect(() => {
    const client = new Stomp.Client({
      brokerURL: SOCKET.URL,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(SOCKET.TOPIC(roomId), (msg) => {
          const content: Message = JSON.parse(msg.body);
          setMessages((prev) => [...prev, content]);
        });
        setConnected(true);
      },
    });

    stompClient.current = client;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  useEffect(() => {
    if (connected) {
      api.get(CHAT_API.BY_ROOM(roomId)).then((res) => setMessages(res.data));
    }
  }, [connected, roomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages]);

  if (!connected) {
    return <div className='chat-loading'>Connecting to server…</div>;
  }

  return (
    <div className='chat-room'>
      <div className='chat-messages'>
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`chat-message-block ${
              m.sender === username ? 'me' : 'you'
            }`}
          >
            <div className='chat-sender'>{m.sender}</div>
            <div className='chat-bubble-wrapper'>
              {m.sender !== username && (
                <div className='chat-time'>{formatTime(m.timestamp)}</div>
              )}
              <div
                className={`chat-bubble ${
                  m.sender === username ? 'me' : 'you'
                }`}
              >
                {m.message}
              </div>
              {m.sender === username && (
                <div className='chat-time'>{formatTime(m.timestamp)}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className='chat-bottom'>
        <form
          className='chat-input-area'
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type a message'
            className='chat-input'
          />
          <button type='submit' className='chat-send-btn'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
