export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  profile: string;
  role: 'USER' | 'ADMIN';
}

export interface ChatRoom {
  id: string;
  name: string;
  sender?: User;
  receiver?: User;
}

export interface Message {
  id?: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp?: string;
}

export interface ChatRoomProps {
  roomId: string;
}

export interface ChatMessageProps {
  roomId: string;
}