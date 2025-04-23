import axios from 'axios';
import { parseCookies } from 'nookies'

/** API 공통 경로 상수 */
export const API = {
  USER: '/api/users',
  CHAT: '/api/chat'
}

/** Axios 인스턴스 생성 */
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // 쿠키 포함 (세션 기반 or CORS 인증 유지)
});

/** 요청 시 토큰 자동 주입 */
api.interceptors.request.use((config) => {
  const { accessToken } = parseCookies()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}` // 헤더에 토큰 자동 포함
  }

  return config
})

export default api;
