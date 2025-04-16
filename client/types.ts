export interface ChatRoomProps {
  roomId: string;
}

export interface Message {
  id?: number;
  roomId: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
}