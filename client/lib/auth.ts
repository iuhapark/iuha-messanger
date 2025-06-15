import { User } from "@/types/index";
import { destroyCookie } from "nookies";
import api, { instance } from "./api";
import { handleAPIError } from "./api-error";

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
    console.warn('Logout failed', e);
  }
  window.location.href = `/`

};

export const fetchSessionUser = async (): Promise<User> => {
  try {
    const res = await api.get('/auth/user');
    if (!res.data?.id) throw new Error('User not found');
    return res.data;
  } catch (err) {
    throw err;
  }
}