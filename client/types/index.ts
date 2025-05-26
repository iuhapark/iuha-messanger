import { SVGProps } from "react";
import { ChatStep } from "./data";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  profile: string;
  role: 'USER' | 'ADMIN';
}

export interface ChatRoom {
  id: string;
  participants: User[];
  lastMessage?: string;
}

export interface Message {
  id?: string;
  roomId?: string;
  sender?: User;
  message: string;
  timestamp?: string;
  type?: 'ENTER' | 'TALK' | 'LEAVE';
}

export interface ChatRoomListProps {
  onSelect: (room: ChatRoom) => void;
}

export interface UserListProps {
  setStep: (step: ChatStep) => void;
  onSelect: (room: ChatRoom) => void;
}
