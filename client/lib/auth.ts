import { destroyCookie } from "nookies";


export const login = () => {
  window.location.href = `http://localhost:8080/oauth2/authorization/google`
}

export const logout = () => {

  /* 쿠키 삭제 */
  destroyCookie(null, 'accessToken');
  destroyCookie(null, 'refreshToken');

  /* 서버 로그아웃 */
  window.location.href = `http://localhost:8080/logout`

  /* 클라이언트 리디렉션 */
  // window.location.href = '/';

};