import { destroyCookie } from "nookies";
import api, { instance } from './api';
import { User } from '@/\btypes';

export const login = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`
}

export const logout = async () => {

  /* 쿠키 삭제 */
  destroyCookie(null, 'accessToken');
  destroyCookie(null, 'refreshToken');

  /* 서버 로그아웃 */
  try {
    await instance.post('/logout');
  } catch (e) {
    console.warn('서버 로그아웃 실패', e);
  }
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/logout`

};

/* 세션에서 유저 정보 추출 */
// export const getSessionUser = async (): Promise<User | null> => {
//   try {
//     const res = await instance.get('/user');
//     return res.data;
//   } catch (err: any) {
//     if (err.response?.status === 401) {
//       return null;
//     }
//     throw err;
//   }
// };
export const getSessionUser = async (): Promise<User> => {
  const res = await instance.get('/user');
  return res.data;
}