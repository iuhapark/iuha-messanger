INSERT INTO user (id, username, password, email, name, profile, role) VALUES
('23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'juha', 'pw01', 'hanied04@gmail.com', '주하', '/assets/img/user/iuha.png', 'ADMIN'),
('7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'john', 'pw01', 'juhabahk@gmail.com', '존', '/assets/img/user/john.png', 'ADMIN'),
('1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'sam', 'pw02', 'sam@iuha.com', '샘', '/assets/img/user/sam.png', 'USER'),
('c19f6b6a-8c74-4c83-bf0e-bc27697931f5', 'yuri', 'pw03', 'yuri@iuha.com', '유리', '/assets/img/user/yuri.png', 'USER'),
('8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'kim', 'pw04', 'kim@iuha.com', '킴', '/assets/img/user/kim.png', 'USER'),
('57c8e14a-56b5-4a05-a170-1b507c7f2d08', 'jenny', 'pw05', 'jenny@iuha.com', '제니', '/assets/img/user/jenny.png', 'USER');

INSERT INTO chat_room (id, name, sender_id, receiver_id) VALUES
('3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '샘', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303');

INSERT INTO chat_message (id, room_id, sender, receiver, message, timestamp) VALUES
('b7e4cba3-8d1d-4f02-96cf-1c62446f4d2b', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '주하야, 지금 뭐 하고 있어?', '2025-04-25T14:00:10'),
('a1f1f5a2-645c-4c0a-92b1-0e3e4b548d9f', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '나 WebSocket을 활용한 채팅 시스템 구현 중이야.', '2025-04-25T14:01:00'),
('de0a4ab0-f5c2-4f35-b9c4-9db6aab2a2ff', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '오, 재밌겠다! 구체적으로 어떤 걸 만들고 있는데?', '2025-04-25T14:01:20'),
('eaf3ed20-d22d-4ac2-95d5-70b1c0735d07', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'STOMP 기반으로 WebSocket 연결을 관리하고, 실시간 송수신 기능을 구현했어.', '2025-04-25T14:02:45'),
('5cbe6b84-2f83-4d8d-92f7-5dfd857312b1', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '흐름이 어떻게 돼? 전체 프로세스 좀 알려줄 수 있어?', '2025-04-25T14:03:20'),
('f9b2ebd5-97e1-4d1f-9a4c-1f74e9e3b0b7', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '응. 사용자가 채팅창에 내용을 입력하면 엔드포인트로 메시지를 보내고, 서버는 스프링 messaging을 통해 브로드캐스팅해.', '2025-04-25T14:04:30'),
('ea0e1749-64fc-4903-9812-2a38d2b41ef1', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '그리고 모든 메시지는 데이터베이스에도 저장돼서 새로고침해도 대화가 유지돼.', '2025-04-25T14:04:50'),
('5a91bc32-982e-4d6b-bb55-0ad0e0dc3cf7', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '우와 그렇구나! 혹시 테스트 해볼 수 있어?', '2025-04-25T14:07:10'),
('08f2fa50-8b17-4bb6-9882-c53c64b7bde8', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '그럼, 당연하지. 지금 나한테 말을 걸어봐! 실시간으로 확인해서 답장하고 있어~', '2025-04-25T14:08:50');
