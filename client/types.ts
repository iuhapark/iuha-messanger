import { ChatStep } from "./config/type/Data";

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
  sender?: string;
  receiver?: string;
}

export interface Message {
  id?: string;
  roomId?: string;
  sender?: string;
  receiver?: string;
  message?: string;
  timestamp?: string;
}

export interface ChatRoomListProps {
  onSelect: (room: ChatRoom) => void;
}

export interface UserListProps {
  setStep: (step: ChatStep) => void;
  onSelect: (room: ChatRoom) => void;
}
