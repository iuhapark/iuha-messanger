// /data/rooms.ts
import { ChatRoom } from '@/types';
import USERS from './user';

export const dummyRooms: ChatRoom[] = [
  {
    id: '2',
    participants: [USERS['HARU'], USERS['JUHA']],
    lastMessage: '그럼, 당연하지. 지금 나한테 말을 걸어봐! 실시간으로 확인해서 답장하고 있어~',
    updatedAt: '2025-06-01 17:17:43',
  },
  {
    id: '4',
    participants: [USERS['HARU'], USERS['MULON']],
    lastMessage: '아 맞네.',
    updatedAt: '2025-05-31 10:57:43'
  },
  {
    id: '5',
    participants: [USERS['HARU'], USERS['TIM']],
    lastMessage: '말할 순 없지만… 너 지갑 조심해',
    updatedAt: '2025-05-10 13:20:52'
  },
  {
    id: '6',
    participants: [USERS['HARU'], USERS['SAM']],
    lastMessage: '아직은.',
    updatedAt: '2025-05-07 16:50:10'
  },
  {
    id: '7',
    participants: [USERS['HARU'], USERS['YURI']],
    lastMessage: 'ㅋㅋㅋ기대해도 좋아!',
    updatedAt: '2025-05-03 16:02:00'
  },
    {
    id: '8',
    participants: [USERS['HARU'], USERS['HYEONSU']],
    lastMessage: '잘 만들었다. 어설픈 토큰 아니네.',
    updatedAt: '2025-05-01 14:04:50'
  },
  {
    id: '9',
    participants: [USERS['HARU'], USERS['HARRY']],
    lastMessage: '너한테 필요한 건 알람이 아니라 기상 나팔이야.',
    updatedAt: '2025-04-30 15:11:07'
  },
    {
    id: '10',
    participants: [USERS['HARU'], USERS['JENNIFER']],
    lastMessage: '그냥 멍 때리다 뇌 꺼졌어.',
    updatedAt: '2025-04-25 17:01:43'
  },
  {
    id: '11',
    participants: [USERS['HARU'], USERS['ROCKET']],
    lastMessage: '캬캬캬, 상상하니까 못 참겠네.',
    updatedAt: '2025-05-02 16:33:00'
  },
];
