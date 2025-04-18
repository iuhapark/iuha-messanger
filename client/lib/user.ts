import api from './api';
import { User } from '@/\btypes';

export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get('/users/all');
  return res.data;
};
