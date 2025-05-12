import { User } from "@/\btypes";
import { destroyCookie } from "nookies";
import { instance } from "./api";

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
  window.location.href = `/`

};

/* 세션에서 유저 정보 추출 */
export const getSessionUser = async (): Promise<User> => {
  const res = await instance.get('/user');
  return res.data;
}