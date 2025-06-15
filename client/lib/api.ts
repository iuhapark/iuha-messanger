import axios from "axios";
import { handleAPIError } from "./api-error";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // 쿠키 기반 세션 인증
});

export { instance };

/** Axios 인스턴스 생성 */
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // 쿠키 기반 세션 인증
});

export default api;

/* API error 인터셉터  */
api.interceptors.response.use(
  res => res,
  err => {
    handleAPIError(err); 
    return Promise.reject(err);
  }
);