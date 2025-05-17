DELETE FROM message;
DELETE FROM user_room;
DELETE FROM chat_room;
DELETE FROM users;

-- 유저 데이터
INSERT INTO users (id, username, password, email, name, profile, role) VALUES
('1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'sam', '$2a$10$JpAmj9FrQq6/acbmAHwX0unbekeTSc8ktHXsRThsD6csP9m6cdP5q', 'sam@iuha.com', '샘', '/assets/img/user/sam.png', 'USER'),
('23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'juha', '$2a$10$.Q1tCs2kkHgV16Gp3kzequ6bIv79.Zx/5Y.FTL.pjGHokVVG3XojO', 'hanied04@gmail.com', '주하', '/assets/img/user/juha.png', 'ADMIN'),
('7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'john', '$2a$10$b627zZwD9s.Sx.l5aUFnaeBtCbCrLZNIyTioxZoflJ85o8k2AzJ3u', 'juhabahk@gmail.com', '존', '/assets/img/user/john.png', 'ADMIN'),
('c19f6b6a-8c74-4c83-bf0e-bc27697931f5', 'yuri', '$2a$10$AgxdOJ5xpzOa7YdCS3PCYOxvVLenODDw303hidZdJINsunH/Z9Fru', 'yuri@iuha.com', '유리', '/assets/img/user/yuri.png', 'USER'),
('8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'chris', '$2a$10$2lhlkMo5K.IN3Yn9.OvqOupRq07MIfEIFsXsaUKRv3gQhdtjuaKHC', 'chris@iuha.com', '크리스', '/assets/img/user/chris.png', 'USER'),
('57c8e14a-56b5-4a05-a170-1b507c7f2d08', 'jenny', '$2a$10$Lzn6OBWb1KXCHaKQjsZpOOgbKTHphbabSvs1w7YeJinP/HUD6CU0K', 'jenny@iuha.com', '제니', '/assets/img/user/jenny.png', 'USER');

-- 채팅방 데이터
INSERT INTO chat_room (id, last_message) VALUES
('3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '그럼, 당연하지. 지금 나한테 말을 걸어봐! 실시간으로 확인해서 답장하고 있어~'),
('b387d69c-73e1-4ef4-9d0f-8810191eec03', '나야 코딩하지! 오늘도 화이팅~'),
('cda7b114-719d-4b1b-a808-feb9b16eaf68', '리팩토링은 어려워~~.'),
('26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '응! 좋은 하루 보내.'),
('ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '잘 만들었다. 어설픈 토큰 아니네, 괜히 나 불렀는데?');


-- 유저-채팅방 매핑
INSERT INTO user_room (id, user_id, room_id) VALUES
('f6c6b591-90e8-4e8c-8b32-63a6d0eb4561', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be'),
('77f5956f-320b-4a61-9d70-1619a0d2cf0a', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be'),
('1edbbf4f-e1a0-4be4-bd58-e2df2bc5c63b', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'b387d69c-73e1-4ef4-9d0f-8810191eec03'),
('ad682d14-8430-4cc7-bdc2-8d00eac7ae60', '57c8e14a-56b5-4a05-a170-1b507c7f2d08', 'b387d69c-73e1-4ef4-9d0f-8810191eec03'),
('d0d40d15-161d-4cd7-befc-8c6b4d9c1a57', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'cda7b114-719d-4b1b-a808-feb9b16eaf68'),
('9e64cd52-1e42-4aa0-bbe2-f58bc1b136f1', 'c19f6b6a-8c74-4c83-bf0e-bc27697931f5', 'cda7b114-719d-4b1b-a808-feb9b16eaf68'),
('3c8e98de-4a7f-4e5f-980e-901840660222', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d'),
('c00dc97e-c8e1-4623-80aa-b2659c90d8ec', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d'),
('6813b171-6db3-47c6-9a61-7eeaaf8b7fd3', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69'),
('ee17d479-1f89-40e7-9285-b54227ef79c6', '8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69');

-- 메시지 데이터 (receiver 없이 sender만)
-- 메시지 데이터 (receiver 없이 sender만)
INSERT INTO message (id, room_id, sender_id, type, message, timestamp) VALUES
('b7e4cba3-8d1d-4f02-96cf-1c62446f4d2b', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '주하야, 지금 뭐 하고 있어?', '2025-04-25T14:00:10'),
('a1f1f5a2-645c-4c0a-92b1-0e3e4b548d9f', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'TALK', '나 WebSocket을 활용한 채팅 시스템 구현 중이야.', '2025-04-25T14:01:00'),
('de0a4ab0-f5c2-4f35-b9c4-9db6aab2a2ff', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '오, 재밌겠다! 구체적으로 어떤 걸 만들고 있는데?', '2025-04-25T14:01:20'),
('eaf3ed20-d22d-4ac2-95d5-70b1c0735d07', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'TALK', 'STOMP 기반으로 WebSocket 연결을 관리하고, 실시간 송수신 기능을 구현했어.', '2025-04-25T14:02:45'),
('5cbe6b84-2f83-4d8d-92f7-5dfd857312b1', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '흐름이 어떻게 돼? 전체 프로세스 좀 알려줄 수 있어?', '2025-04-25T14:03:20'),
('f9b2ebd5-97e1-4d1f-9a4c-1f74e9e3b0b7', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'TALK', '응. 사용자가 채팅창에 내용을 입력하면 엔드포인트로 메시지를 보내고, 서버는 스프링 messaging을 통해 브로드캐스팅해.', '2025-04-25T14:04:30'),
('ea0e1749-64fc-4903-9812-2a38d2b41ef1', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'TALK', '그리고 모든 메시지는 데이터베이스에도 저장돼서 새로고침해도 대화가 유지돼.', '2025-04-25T14:04:50'),
('5a91bc32-982e-4d6b-bb55-0ad0e0dc3cf7', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '우와 그렇구나! 혹시 테스트 해볼 수 있어?', '2025-04-25T14:07:10'),
('08f2fa50-8b17-4bb6-9882-c53c64b7bde8', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'TALK', '그럼, 당연하지. 지금 나한테 말을 걸어봐! 실시간으로 확인해서 답장하고 있어~', '2025-04-25T14:08:50'),

('a3f1c3a4-5d6e-4f8b-9c6d-7e5a2f3c8b0d', 'b387d69c-73e1-4ef4-9d0f-8810191eec03', '57c8e14a-56b5-4a05-a170-1b507c7f2d08', 'TALK', '샘 안녕! 잘 지냈어??', '2025-04-25T15:11:00'),
('b4f1c3a4-5d6e-4f8b-9c6d-7e5a2f3c8b0d', 'b387d69c-73e1-4ef4-9d0f-8810191eec03', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '응 잘 지내! 오늘 날씨 너무 좋지 않아?', '2025-04-25T15:11:02'),
('d45f41f5-29f6-4b64-8486-8c78e5d8230a', 'b387d69c-73e1-4ef4-9d0f-8810191eec03', '57c8e14a-56b5-4a05-a170-1b507c7f2d08', 'TALK', '그러게 산책가고 싶다! 뭐해?', '2025-04-25T15:11:05'),
('fb7e1a36-2e59-4b7e-93ab-f6c0937f1b1d', 'b387d69c-73e1-4ef4-9d0f-8810191eec03', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '나야 코딩하지! 오늘도 화이팅~', '2025-04-25T15:11:07'),

('e7487c26-c5f4-4078-9408-8c649d3344fb', 'cda7b114-719d-4b1b-a808-feb9b16eaf68', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '유리야, 지금 리액트 하고 있어?', '2025-04-25T16:00:00'),
('f5b255e1-87c3-486e-9d1e-feb98a7d53c0', 'cda7b114-719d-4b1b-a808-feb9b16eaf68', 'c19f6b6a-8c74-4c83-bf0e-bc27697931f5', 'TALK', '응! 기존 코드 리팩토링 중이야.', '2025-04-25T16:01:00'),
('39c67c47-e8e3-4a0e-a7e3-0edb9c0ed85f', 'cda7b114-719d-4b1b-a808-feb9b16eaf68', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '오, 그렇군! 나도 리팩토링 해야 하는데..', '2025-04-25T16:01:30'),
('5dc2b63d-9e12-47f0-bc07-c16fd00a3e8a', 'cda7b114-719d-4b1b-a808-feb9b16eaf68', 'c19f6b6a-8c74-4c83-bf0e-bc27697931f5', 'TALK', '리팩토링은 어려워~~', '2025-04-25T16:02:00'),

('25cb7d03-6a83-4ce2-93e6-8c4df94ed2a0', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '존, 프로젝트 어디까지 했어?', '2025-04-25T16:30:00'),
('fd31e6f9-b89c-4230-9911-fd9c16b3f103', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'TALK', '거의 다 했어. 테스트만 남았어!', '2025-04-25T16:31:00'),
('b0f1c3a4-5d6e-4f8b-9c6d-7e5a2f3c8b0d', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '오, 역시 에이스! 나도 도와주라', '2025-04-25T16:31:30'),
('78ec8a69-6f63-4a79-bf4b-b4b171e55317', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'TALK', '잘 안되는 부분이 있어?ㅎㅎ 나중에 같이 보자.', '2025-04-25T16:32:00'),
('fb2e98b1-74c0-4a06-9369-957c80f39833', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '고마워! 나중에 보자.', '2025-04-25T16:32:30'),
('8a2ffdb2-2713-4e59-bba4-8a1b3f929b5a', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'TALK', '응! 좋은 하루 보내.', '2025-04-25T16:33:00'),

('e3a4c7d2-b3f4-4b9d-9ec1-91f78c52c11a', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'TALK', '헤이 샘, 나 궁금한 거 있어~', '2025-04-25T17:00:00'),
('7f4b3d21-8c8e-4c29-91f3-dc0a9b5c81a0', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '잠시만 기다려, 나 커밋만 하고!!', '2025-04-25T17:00:20'),
('9b8d70e3-d55d-4fd4-9227-5f0f8b2e775b', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '이제 됐다. 무슨 일이야?', '2025-04-25T17:01:30'),
('ed6b2ef1-35a1-47b6-851d-62b7f7271c7b', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'TALK', '이거 refresh token 제대로 만들어지고 있는 거 맞아?', '2025-04-25T17:01:30'),
('f4079ac3-50cb-4fd5-b273-64b66a180c1e', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '코드 깔끔해. 딱 봐도 토큰 잘 나오게 생겼다.', '2025-04-25T17:02:00'),
('ab7e1a36-1234-5678-90ab-cdef12345678', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '잘 만들었다. 어설픈 토큰 아니네, 괜히 나 불렀는데?', '2025-04-25T17:02:10');