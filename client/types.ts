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
}

export interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp?: string;
}