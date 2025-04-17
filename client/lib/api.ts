import axios from 'axios';

/** Axios 인스턴스 생성 */
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // 쿠키 기반 세션 인증
});

export default api;
