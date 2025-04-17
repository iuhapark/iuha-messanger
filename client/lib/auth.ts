import { destroyCookie } from "nookies";
import api from './api';
import { User } from '@/\btypes';

export const login = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`
}

export const logout = () => {

  /* 쿠키 삭제 */
  destroyCookie(null, 'accessToken');
  destroyCookie(null, 'refreshToken');

  /* 서버 로그아웃 */
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/logout`

};

export const getSessionUser = async (): Promise<User> => {
  const res = await api.get('/auth/user');
  return res.data;
};