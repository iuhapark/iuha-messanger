/** 도메인 (환경별 baseURL 관리) */
export const DOMAIN = {
  FRONT: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
  BACK: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080'
};

/** API 최상위 Prefix */
export const API_BASE = {
  USER: '/users',
  CHAT: '/chat'
};

/** User API 경로 */
export const USER_API = {
  LOGIN: `${API_BASE.USER}/login`,           // POST - 로그인
  LOGOUT: `${API_BASE.USER}/logout`,         // POST - 로그아웃
  ME: `${API_BASE.USER}/auth`,               // GET  - 내 정보 조회
  REGISTER: `${API_BASE.USER}/register`      // POST - 회원가입
};

/** Chat API 경로 */
export const CHAT_API = {
  SAVE: `${API_BASE.CHAT}/save`,                  // POST - 메시지 저장
  NEW: `${API_BASE.CHAT}/new`,                    // POST - 채팅방 생성
  ALL: `${API_BASE.CHAT}/all`,                    // GET  - 모든 메시지 가져오기
  STORAGE_ROOMS: `${API_BASE.CHAT}/rooms`,        // GET  - 저장된 채팅방 목록
  BY_ROOM: (roomId: string) => `${API_BASE.CHAT}/${roomId}` // GET - 특정 채팅방 메시지
};

/** WebSocket 설정 */
export const SOCKET = {
  URL: 'ws://localhost:8080/websocket',
  TOPIC: (roomId: string) => `/topic/${roomId}`,
  SEND: (roomId: string) => `/app/chat/${roomId}`
};
