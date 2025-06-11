'use client';

import { useState, useEffect } from 'react';
import USERS from '@/data/user';
import { Message, User } from '@/types';
import { dummyMessages } from '@/data/chat';


export function useChatMessages() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadMap, setUnreadMap] = useState<Record<string, number>>({});

  useEffect(() => {
    if (selectedUser) {
      const dummy = dummyMessages[selectedUser.id];
      setMessages(dummy ?? []);
      setUnreadMap(prev => ({ ...prev, [selectedUser.id]: 0 }));
    }
  }, [selectedUser]);

  const sendMessage = () => {
    if (!currentMessage.trim() || !selectedUser) return;

    const roomId = selectedUser.id;

    const newMsg: Message = {
      id: `${Date.now()}`,
      roomId,
      sender: USERS['HARU'],
      message: currentMessage,
      timestamp: new Date().toISOString(),
      type: 'TALK',
    };

    setMessages((prev) => [...prev, newMsg]);
    setCurrentMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const reply: Message = {
        id: `${Date.now() + 1}`,
        roomId,
        sender: USERS[selectedUser.name.toUpperCase()] || USERS['HARU'],
        message: getRandomResponse(),
        timestamp: new Date().toISOString(),
        type: 'TALK',
      };

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1500);
  };

  return {
    selectedUser,
    selectUser: setSelectedUser,
    messages,
    currentMessage,
    setCurrentMessage,
    sendMessage,
    isTyping,
    unreadMap,
  };
}

function getRandomResponse(): string {
  const replies = [
    '그거 좋은 생각이야!',
    '조금만 기다려줘!',
    'ㅋㅋㅋ 진짜 웃기다!',
    '그건 몰랐네!',
    '대박이네.',
    '응, 나도 그렇게 생각했어.',
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
