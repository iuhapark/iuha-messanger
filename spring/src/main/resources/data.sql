INSERT INTO user (id, username, password, email, name, profile, role) VALUES
('23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'juha', 'pw01', 'hanied04@gmail.com', '주하', '/assets/img/user/iuha.png', 'ADMIN'),
('7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'john', 'pw01', 'juhabahk@gmail.com', '존', '/assets/img/user/john.png', 'ADMIN'),
('1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'sam', 'pw02', 'sam@iuha.com', '샘', '/assets/img/user/sam.png', 'USER'),
('c19f6b6a-8c74-4c83-bf0e-bc27697931f5', 'yuri', 'pw03', 'yuri@iuha.com', '유리', '/assets/img/user/yuri.png', 'USER'),
('8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'kim', 'pw04', 'kim@iuha.com', '킴', '/assets/img/user/kim.png', 'USER'),
('57c8e14a-56b5-4a05-a170-1b507c7f2d08', 'jenny', 'pw05', 'jenny@iuha.com', '제니', '/assets/img/user/jenny.png', 'USER');

INSERT INTO chat_room (id, name, sender_id, receiver_id) VALUES
('3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '주하', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303');

INSERT INTO chat_message (id, room_id, sender, receiver, message, timestamp) VALUES
('b7e4cba3-8d1d-4f02-96cf-1c62446f4d2b', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '주하, 지금 시간 괜찮아?', '2025-04-25T09:00:10'),
('a1f1f5a2-645c-4c0a-92b1-0e3e4b548d9f', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '응 지금 괜찮아. 무슨 일 있어?', '2025-04-25T09:01:00'),
('new-id-1', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '브랜치 머지하려는데 자꾸 충돌 나네... 왜 이러지?', '2025-04-25T09:01:10'),
('c8f14a67-1226-4c35-8f1f-9e6e0d962e72', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '혹시 다른 사람이 push 한 거 아니야? 나 어제 커밋 하나 정리했거든.', '2025-04-25T09:02:45'),
('de59e5aa-7f5e-4c6f-a0df-3f78c4b81d9c', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '그거 때문일 수도 있겠다. 나 리베이스 다시 해볼게.', '2025-04-25T09:03:20'),
('fdd2790c-d7d6-4a76-898d-2bb6dcd5a10e', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '응, 안 되면 화면 공유해. 같이 보면 금방 끝날 듯!', '2025-04-25T09:04:30');