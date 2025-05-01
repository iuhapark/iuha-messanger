import api from './api';
import { ChatRoom, Message } from '@/\btypes';

// export const getMyChatRooms = async (): Promise<ChatRoom[]> => {
//   const res = await api.get('/chat/my');
//   return res.data;
// };

// export const getChatMessages = async (roomId: string): Promise<Message[]> => {
//   const res = await api.get(`/chat/${roomId}`);
//   return res.data;
// };

// export const sendChatMessage = async (roomId: string, message: string) => {
//   return await api.post(`/chat/${roomId}/send`, { message });
// };

// export const createChatRoom = async (receiverId: string): Promise<ChatRoom> => {
//   const res = await api.post('/chat/save', { receiverId });
//   return res.data;
// };