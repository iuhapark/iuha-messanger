## Real-Time Chat Messenger with WebSocket & STOMP
<p align="center">
  <img src="https://github.com/user-attachments/assets/7d4ed7ae-601c-4f2d-9f37-f3707af1c168" alt="WebSocket" width="700"/>
</p>
<br />
WebSocket 기반의 1:1 채팅 메신저입니다.
STOMP 프로토콜을 통해 클라이언트와 서버 간의 통신을 구현했습니다.

### 주요 기술 스택
  > Frontend

      - Next.js 15 (App Router)
      - React 19, TypeScript
      - TailwindCSS + HeroUI
      - Context API (인증/로딩 전역 상태 관리)

  > Backend

      - Java 17, Spring Boot 3.4.4
      - STOMP over WebSocket
      - Spring Security, JWT + Redis 인증
      - MySQL + JPA + QueryDSL

  > Infra

      - Redis (RefreshToken 및 세션 관리)
      - RESTful API + WebSocket 이중 구조

### 🧩 핵심 기능
<p align="center">
  <img src="https://github.com/user-attachments/assets/48b1765e-7813-492d-b451-7a44a8c3d381" alt="WebSocket" width="400"/>
</p>
<br />

    - Google OAuth2.0 로그인 + JWT 인증/인가
    - WebSocket 기반 1:1 실시간 채팅
    - 채팅방 생성, 메시지 저장 및 조회
    - 실시간 메시지 수신
    - 반응형 UI + Drawer 기반 RoomList 구조

### 아키텍쳐
<p align="center">
  <img src="https://github.com/user-attachments/assets/8aee8f2a-7e9c-43f9-ad8b-fdd30a61e649" alt="Architecture"  width="400" />
</p>
