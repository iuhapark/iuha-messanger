
'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChatRoom, Message, User } from '@/types/index';
import { randomUUID } from 'crypto';
import USERS from './user';

export function useChatMessages() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const selectUser = (user: User) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    if (selectedUser) {
      const roomMessages = dummyMessages[selectedUser.id] || [];
      setMessages(roomMessages);
    }
  }, [selectedUser]);

  const sendMessage = () => {
    if (!currentMessage.trim() || !selectedUser) return;

    const newMsg: Message = {
      id: randomUUID(),
      message: currentMessage,
      roomId: randomUUID(),
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setCurrentMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const reply: Message = {
        id: randomUUID(),
        message: 'ㅋㅋㅋ 진짜 웃기다!',
        roomId: newMsg.roomId,
        sender: USERS[`${selectedUser.name.toUpperCase}`] || USERS['HARU'],
        type: 'TALK',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1500);
  };

  return {
    selectedUser,
    selectUser,
    USERS,
    messages,
    setMessages,
    currentMessage,
    setCurrentMessage,
    sendMessage,
    isTyping,
  };
}

const dummyMessages: Record<string, Message[]> = {
  '10': [
    {
      id: '1',
      message: '제니퍼, 왜 갑자기 조용해졌어?',
      roomId: '10',
      sender: USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-04-25T16:40:00',
    },
    {
      id: '2',
      message: '생각을 정리하다가… 생각이 나를 떠났어.',
      roomId: '10',
      sender: USERS['JENNIFER'],
      type: 'TALK',
      timestamp: '2025-04-25T16:41:20',
    },
    {
      id: '3',
      message: 'ㅋㅋㅋ철학적이네.',
      roomId: '10',
      sender: USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-04-25T16:44:30',
    },
    {
      id: '4',
      message: '그냥 멍 때리다 뇌 꺼졌어.',
      roomId: '10',
      sender: USERS['JENNIFER'],
      type: 'TALK',
      timestamp: '2025-04-25T17:01:43',
    },
  ],
  '9': [
    {
      id: '5',
      message: '오늘 알람 3개나 맞췄는데 다 씹었어.',
      roomId: '9',
      sender:  USERS['HARRY'],
      type: 'TALK',
      timestamp: '2025-04-30T15:11:00',
    },
    {
      id: '6',
      message: '그건 알람이 아니라 배경음이잖아.',
      roomId: '9',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-04-30T15:11:02',
    },
    {
      id: '7',
      message: '진짜 귀에 박히게 울었는데…',
      roomId: '9',
      sender:  USERS['HARRY'],
      type: 'TALK',
      timestamp: '2025-04-30T15:11:05',
    },
    {
      id: '8',
      message: '너한테 필요한 건 알람이 아니라 기상 나팔이야.',
      roomId: '9',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-04-30T15:11:07',
    },
  ],
  '8': [
    {
      id: '9',
      message: '해리, 나 궁금한 거 있어~',
      roomId: '8',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-01T13:55:10',
    },
    {
      id: '10',
      message: '잠시만 기다려, 나 커밋만 하고!!',
      roomId: '8',
      sender:  USERS['HYEONSU'],
      type: 'TALK',
      timestamp: '2025-05-01T14:00:10',
    },
    {
      id: '11',
      message: '이제 됐다. 무슨 일이야?',
      roomId: '8',
      sender:  USERS['HYEONSU'],
      type: 'TALK',
      timestamp: '2025-05-01T14:01:00',
    },
    {
      id: '12',
      message: '이거 refresh token 제대로 만들어지고 있는 거 맞아?',
      roomId: '8',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-01T14:02:45',
    },
    {
      id: '13',
      message: '대충 <리프레시 토큰 />...',
      roomId: '8',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-01T14:02:50',
    },
    {
      id: '14',
      message: '코드 깔끔해. 딱 봐도 토큰 잘 나오게 생겼다.',
      roomId: '8',
      sender:  USERS['HYEONSU'],
      type: 'TALK',
      timestamp: '2025-05-01T14:04:30',
    },
    {
      id: '15',
      message: '잘 만들었다. 어설픈 토큰 아니네.',
      roomId: '8',
      sender:  USERS['HYEONSU'],
      type: 'TALK',
      timestamp: '2025-05-01T14:04:50',
    },
  ],
    '7': [
    {
      id: '16',
      message: '안녕 유리야, 잘 지냈어?',
      roomId: '7',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-03T16:00:00',
    },
    {
      id: '17',
      message: '응! 너 요즘 바빴지?',
      roomId: '7',
      sender:  USERS['YURI'],
      type: 'TALK',
      timestamp: '2025-05-03T16:01:00',
    },
    {
      id: '18',
      message: '맞아, 개발 중이었어.',
      roomId: '7',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-03T16:01:30',
    },
    {
      id: '19',
      message: '버그랑 씨름 중ㅠㅠ',
      roomId: '7',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-03T16:01:30',
    },
    {
      id: '20',
      message: '완성되면 분명 대박일 거야!',
      roomId: '7',
      sender:  USERS['YURI'],
      type: 'TALK',
      timestamp: '2025-05-03T16:01:40',
    },
    {
      id: '21',
      message: '오케이, 기다려!',
      roomId: '7',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-03T16:02:00',
    },
  ],
  '6': [
    {
      id: '22',
      message: '요즘 잠은 좀 자?',
      roomId: '6',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-07T16:45:50',
    },
    {
      id: '23',
      message: '자는 동안도 모델 학습해.',
      roomId: '6',
      sender:  USERS['SAM'],
      type: 'TALK',
      timestamp: '2025-05-07T16:46:10',
    },
    {
      id: '24',
      message: '효율이 중요하잖아.',
      roomId: '6',
      sender:  USERS['SAM'],
      type: 'TALK',
      timestamp: '2025-05-07T16:46:10',
    },
    {
      id: '25',
      message: '인간 맞지?',
      roomId: '6',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-07T16:50:10',
    },
    {
      id: '26',
      message: '아직은.',
      roomId: '6',
      sender:  USERS['SAM'],
      type: 'TALK',
      timestamp: '2025-05-07T16:50:20',
    },
  ],
  '5': [
    {
      id: '27',
      message: '요즘도 새 제품 준비 중이야?',
      roomId: '5',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-10T13:01:00',
    },
    {
      id: '28',
      message: '언제나. 조용히, 하지만 혁신적으로.',
      roomId: '5',
      sender:  USERS['TIM'],
      type: 'TALK',
      timestamp: '2025-05-10T13:10:40',
    },
    {
      id: '29',
      message: '또 뭔데 이번엔?',
      roomId: '5',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-10T13:14:30',
    },
    {
      id: '30',
      message: '말할 순 없지만… 너 지갑 조심해.',
      roomId: '5',
      sender:  USERS['TIM'],
      type: 'TALK',
      timestamp: '2025-05-10T13:20:52',
    },
  ],
  '4': [
    {
      id: '31',
      message: '형, 요즘 또 뭐 만들고 있어?',
      roomId: '4',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-31T10:00:10',
    },
    {
      id: '32',
      message: '지루해서 뇌칩에 게임 깔아봤어.',
      roomId: '4',
      sender:  USERS['MULON'],
      type: 'TALK',
      timestamp: '2025-05-31T10:20:40',
    },
    {
      id: '33',
      message: '…진심이야?',
      roomId: '4',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-31T10:23:50',
    },
    {
      id: '34',
      message: '아직 튜토리얼 중이야. 버그 많더라.',
      roomId: '4',
      sender:  USERS['MULON'],
      type: 'TALK',
      timestamp: '2025-05-31T10:30:18',
    },
    {
      id: '35',
      message: 'ㅋㅋㅋ무슨 버그인데?',
      roomId: '4',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-31T10:34:30',
    },
    {
      id: '36',
      message: '가끔 NPC가 내 생각 읽고 먼저 움직여.',
      roomId: '4',
      sender:  USERS['MULON'],
      type: 'TALK',
      timestamp: '2025-05-31T10:50:45',
    },
    {
      id: '37',
      message: '그거 그냥 형 아냐?',
      roomId: '4',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-05-31T10:52:03',
    },
    {
      id: '38',
      message: '아 맞네.',
      roomId: '4',
      sender:  USERS['MULON'],
      type: 'TALK',
      timestamp: '2025-05-31T10:57:43',
    },
  ],
  '2': [
    {
      id: '39',
      message: '주하야, 지금 뭐 하고 있어?',
      roomId: '2',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-06-01T17:00:00',
    },
    {
      id: '40',
      message: '나 WebSocket을 활용한 채팅 시스템 구현 중이야.',
      roomId: '2',
      sender:  USERS['JUHA'],
      type: 'TALK',
      timestamp: '2025-06-01T17:05:20',
    },
    {
      id: '41',
      message: '오, 재밌겠다! 구체적으로 어떤 걸 만들고 있는데?',
      roomId: '2',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-06-01T17:10:30',
    },
    {
      id: '42',
      message: 'STOMP 기반으로 WebSocket 연결을 관리하고, 실시간 송수신 기능을 구현했어.',
      roomId: '2',
      sender:  USERS['JUHA'],
      type: 'TALK',
      timestamp: '2025-06-01T17:12:40',
    },
    {
      id: '43',
      message: '흐름이 어떻게 돼? 전체 프로세스 좀 알려줄 수 있어?',
      roomId: '2',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-06-01T17:12:50',
    },
    {
      id: '44',
      message: '응. 사용자가 채팅창에 내용을 입력하면 엔드포인트로 메시지를 보내고, 서버는 스프링 messaging을 통해 브로드캐스팅해.',
      roomId: '2',
      sender:  USERS['JUHA'],
      type: 'TALK',
      timestamp: '2025-06-01T17:17:10',
    },
    {
      id: '45',
      message: '그리고 모든 메시지는 데이터베이스에도 저장돼서 새로고침해도 대화가 유지돼.',
      roomId: '2',
      sender:  USERS['JUHA'],
      type: 'TALK',
      timestamp: '2025-06-01T17:17:40',
    },
    {
      id: '46',
      message: '우와 그렇구나! 혹시 테스트 해볼 수 있어?',
      roomId: '2',
      sender:  USERS['HARU'],
      type: 'TALK',
      timestamp: '2025-06-01T17:17:43',
    },
    {
      id: '47',
      message: '그럼, 당연하지. 지금 나한테 말을 걸어봐! 실시간으로 확인해서 답장하고 있어~',
      roomId: '2',
      sender:  USERS['JUHA'],
      type: 'TALK',
      timestamp: '2025-06-01T17:17:45',
    },
  ],
  '11': [
    {
      id: '48',
      message: '테이저 페이스는 얼굴에서 테이저 쏘나?',
      roomId: '11',
      sender:  USERS['ROCKET'],
      type: 'TALK',
      timestamp: '2025-05-02T16:30:00',
    },
    {
      id: '49',
      message: '갑자기 뭔 소리야?',
      roomId: '11',
      sender:  USERS['JUHA'],
      type: 'TALK',
      timestamp: '2025-05-02T16:31:00',
    },
    {
      id: '50',
      message: '아니, 이름이 테이저 페이스라잖아.',
      roomId: '11',
      sender:  USERS['ROCKET'],
      type: 'TALK',
      timestamp: '2025-05-02T16:31:30',
    },
    {
      id: '51',
      message: '그럼 넌 진짜 로켓 쏘냐?',
      roomId: '11',
      sender:  USERS['JUHA'],
      type: 'TALK',
      timestamp: '2025-05-02T16:32:10',
    },
    {
      id: '52',
      message: '내 이름은 적어도 전기는 아니거든.',
      roomId: '11',
      sender:  USERS['ROCKET'],
      type: 'TALK',
      timestamp: '2025-05-02T16:33:10',
    },
    {
      id: '53',
      message: '근데 걔 다른 이름 후보 뭐였을까?',
      roomId: '11',
      sender:  USERS['ROCKET'],
      type: 'TALK',
      timestamp: '2025-05-02T16:33:20',
    },
    {
      id: '54',
      message: '...불타는 거시기?',
      roomId: '11',
      sender:  USERS['ROCKET'],
      type: 'TALK',
      timestamp: '2025-05-02T16:33:30',
    },
    {
      id: '55',
      message: '캬캬캬, 상상하니까 못 참겠네.',
      roomId: '11',
      sender:  USERS['ROCKET'],
      type: 'TALK',
      timestamp: '2025-05-02T16:33:40',
    },
  ],
};
