import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // 로그인 상태 유지 (쿠키 기반 인증 시 필수)
});

export default api;
