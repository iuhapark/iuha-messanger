DELETE FROM message;
DELETE FROM user_room;
DELETE FROM chat_room;
DELETE FROM users;

-- 유저 데이터
INSERT INTO users (id, username, password, email, name, profile, role) VALUES
('1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'haru', '$2a$10$JpAmj9FrQq6/acbmAHwX0unbekeTSc8ktHXsRThsD6csP9m6cdP5q', 'haru@iuha.com', '하루', '/assets/img/user/haru.png', 'USER'),
('23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'juha', '$2a$10$.Q1tCs2kkHgV16Gp3kzequ6bIv79.Zx/5Y.FTL.pjGHokVVG3XojO', 'hanied04@gmail.com', '주하', '/assets/img/user/juha.png', 'ADMIN'),
('7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'rocket', '$2a$10$b627zZwD9s.Sx.l5aUFnaeBtCbCrLZNIyTioxZoflJ85o8k2AzJ3u', 'juhabahk@gmail.com', '로켓', '/assets/img/user/rocket.png', 'ADMIN'),
('c19f6b6a-8c74-4c83-bf0e-bc27697931f5', 'yuri', '$2a$10$AgxdOJ5xpzOa7YdCS3PCYOxvVLenODDw303hidZdJINsunH/Z9Fru', 'yuri@iuha.com', '유리', '/assets/img/user/yuri.png', 'USER'),
('8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'chris', '$2a$10$2lhlkMo5K.IN3Yn9.OvqOupRq07MIfEIFsXsaUKRv3gQhdtjuaKHC', 'chris@iuha.com', '크리스', '/assets/img/user/chris.png', 'USER'),
('57c8e14a-56b5-4a05-a170-1b507c7f2d08', 'hyeonsu', '$2a$10$Lzn6OBWb1KXCHaKQjsZpOOgbKTHphbabSvs1w7YeJinP/HUD6CU0K', 'hyeonsu@iuha.com', '현수', '/assets/img/user/hyeonsu.png', 'USER'),
('8e1a3d8d-6b9b-4e37-b2de-bb69700ea41e', 'jennifer', '$2a$10$oQVgmYHHHkcRjwI6VREn3OWyo41axMB3JX/1Kkxm9Yrb5py2GMctu', 'jennifer@iuha.com', '제니퍼', '/assets/img/user/jennifer.png', 'USER'),
('688af791-d6ab-4053-8bb4-5e338398193d', 'mulon', '$2a$10$r.sOFmSIt7o5WuBazbaU2up1l1wBQVI02q4LBQiuEuxsZXKrK/GOm', 'mulon@iuha.com', '물론 머스크', '/assets/img/user/mulon.png', 'USER'),
('3d28b593-b101-4803-8e84-f51d98321e0a', 'tim', '$2a$10$TTt3cafZJBJ2H2HyODVzSuzQMe6Ery4EEhHQGVsicopYqG0NxfX76', 'tim@iuha.com', '팀 큭', '/assets/img/user/tim.png', 'USER'),
('77ac5206-745d-4df0-ba12-79c001779ab6', 'sam', '$2a$10$BTjzjDvxLopUNoiEhlPDyOvwR3kXR8NQkIyWovl/GzyXxsFBo993e', 'sam@iuha.com', '샘 울트라맨', '/assets/img/user/sam.png', 'USER');

-- 채팅방 데이터
INSERT INTO chat_room (id, last_message, updated_at) VALUES
('c5e7e4b6-8c31-4d1c-9b79-8d67f7f7649e', '오케이, 기다려!', '2025-04-25 17:01:43'),
('b387d69c-73e1-4ef4-9d0f-8810191eec03', '너한테 필요한 건 알람이 아니라 기상 나팔이야.', '2025-04-30 15:11:07'),
('cda7b114-719d-4b1b-a808-feb9b16eaf68', '그냥 멍 때리다 뇌 꺼졌어.', '2025-04-30 16:02:00'),
('ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '잘 만들었다. 어설픈 토큰 아니네.', '2025-05-01 14:04:50'),
('26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '캬캬캬, 상상하니까 못 참겠네.', '2025-05-02 16:33:00'),
('c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3', '아 맞네.', '2025-05-31 10:57:43'),
('3f2a2d04-8f4e-4d3f-9b52-7d98238be3f6', '말할 순 없지만… 너 지갑 조심해.', '2025-05-10 13:20:52'),
('71f8c42c-9fd1-4f10-9c84-2e22149f83b4', '아직은.', '2025-05-07 16:50:10'),
('3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '그럼, 당연하지. 지금 나한테 말을 걸어봐! 실시간으로 확인해서 답장하고 있어~', '2025-06-01 17:17:43');

-- 유저-채팅방 매핑
INSERT INTO user_room (id, user_id, room_id) VALUES
('f6c6b591-90e8-4e8c-8b32-63a6d0eb4561', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be'),
('77f5956f-320b-4a61-9d70-1619a0d2cf0a', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be'),
('55f7b8c6-0a91-4f7a-9426-3db90c184b39', '688af791-d6ab-4053-8bb4-5e338398193d', 'c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3'),
('a1c0e6eb-b35a-4c02-ae44-fb2e4c44d808', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3'),
('4cc1b39e-7d8c-4d01-a0cc-9a0e8b9ff7ab', '3d28b593-b101-4803-8e84-f51d98321e0a', '3f2a2d04-8f4e-4d3f-9b52-7d98238be3f6'),
('ca0a3f42-ef08-4a3a-8128-f00313d8a4f2', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '3f2a2d04-8f4e-4d3f-9b52-7d98238be3f6'),
('2a231e59-4133-4422-8b3f-98246baf8bb0', '77ac5206-745d-4df0-ba12-79c001779ab6', '71f8c42c-9fd1-4f10-9c84-2e22149f83b4'),
('5bfb19b2-d50b-4410-813f-25a1eb0e716b', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '71f8c42c-9fd1-4f10-9c84-2e22149f83b4'),
('2fc9c2ad-b09b-48fa-88a2-29968f73b49f', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'c5e7e4b6-8c31-4d1c-9b79-8d67f7f7649e'),
('9d37e7d3-fc8f-405f-8dc9-6a0f8f5dd0ec', '8e1a3d8d-6b9b-4e37-b2de-bb69700ea41e', 'c5e7e4b6-8c31-4d1c-9b79-8d67f7f7649e'),
('1edbbf4f-e1a0-4be4-bd58-e2df2bc5c63b', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'b387d69c-73e1-4ef4-9d0f-8810191eec03'),
('ad682d14-8430-4cc7-bdc2-8d00eac7ae60', '57c8e14a-56b5-4a05-a170-1b507c7f2d08', 'b387d69c-73e1-4ef4-9d0f-8810191eec03'),
('d0d40d15-161d-4cd7-befc-8c6b4d9c1a57', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'cda7b114-719d-4b1b-a808-feb9b16eaf68'),
('9e64cd52-1e42-4aa0-bbe2-f58bc1b136f1', 'c19f6b6a-8c74-4c83-bf0e-bc27697931f5', 'cda7b114-719d-4b1b-a808-feb9b16eaf68'),
('3c8e98de-4a7f-4e5f-980e-901840660222', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d'),
('c00dc97e-c8e1-4623-80aa-b2659c90d8ec', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d'),
('6813b171-6db3-47c6-9a61-7eeaaf8b7fd3', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69'),
('ee17d479-1f89-40e7-9285-b54227ef79c6', '8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69');

-- 메시지 데이터 (receiver 없이 sender만)
INSERT INTO message (id, room_id, sender_id, type, message, timestamp) VALUES
('b9b2a030-df8c-4321-b16b-1fdbfa452430', 'c5e7e4b6-8c31-4d1c-9b79-8d67f7f7649e', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '안녕 제니퍼, 잘 지냈어?', '2025-04-25T16:40:00'),
('4fe7b12d-3d9a-4bd4-9ac5-028fa6cb3744', 'c5e7e4b6-8c31-4d1c-9b79-8d67f7f7649e', '8e1a3d8d-6b9b-4e37-b2de-bb69700ea41e', 'TALK', '응 고마워! 너 요즘 바빴지?', '2025-04-25T16:41:20'),
('6bc26480-1bd6-4ae1-aef3-e96a75379ec2', 'c5e7e4b6-8c31-4d1c-9b79-8d67f7f7649e', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '맞아, 개발 중이었어.', '2025-04-25T16:44:30'),
('f7b76391-0ef5-4d41-9808-8f9486a4a1f3', 'c5e7e4b6-8c31-4d1c-9b79-8d67f7f7649e', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '버그랑 씨름 중ㅠㅠ', '2025-04-25T16:44:50'),
('bf27e706-03c5-4ee1-9fd2-4f20cfbda2fc', 'c5e7e4b6-8c31-4d1c-9b79-8d67f7f7649e', '8e1a3d8d-6b9b-4e37-b2de-bb69700ea41e', 'TALK', '완성되면 분명 대박일 거야!', '2025-04-25T16:47:10'),
('e9d91c35-1d5e-4a1e-9322-b88ae367cf7a', 'c5e7e4b6-8c31-4d1c-9b79-8d67f7f7649e', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '오케이, 기다려!', '2025-04-25T17:01:43'),

('a3f1c3a4-5d6e-4f8b-9c6d-7e5a2f3c8b0d', 'b387d69c-73e1-4ef4-9d0f-8810191eec03', '57c8e14a-56b5-4a05-a170-1b507c7f2d08', 'TALK', '오늘 알람 3개나 맞췄는데 다 씹었어.', '2025-04-30T15:11:00'),
('b4f1c3a4-5d6e-4f8b-9c6d-7e5a2f3c8b0d', 'b387d69c-73e1-4ef4-9d0f-8810191eec03', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '그건 알람이 아니라 배경음이잖아.', '2025-04-30T15:11:02'),
('d45f41f5-29f6-4b64-8486-8c78e5d8230a', 'b387d69c-73e1-4ef4-9d0f-8810191eec03', '57c8e14a-56b5-4a05-a170-1b507c7f2d08', 'TALK', '진짜 귀에 박히게 울었는데…', '2025-04-30T15:11:05'),
('fb7e1a36-2e59-4b7e-93ab-f6c0937f1b1d', 'b387d69c-73e1-4ef4-9d0f-8810191eec03', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '너한테 필요한 건 알람이 아니라 기상 나팔이야.', '2025-04-30T15:11:07'),

('e7487c26-c5f4-4078-9408-8c649d3344fb', 'cda7b114-719d-4b1b-a808-feb9b16eaf68', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '유리야, 왜 갑자기 조용해졌어?', '2025-04-30T16:00:00'),
('f5b255e1-87c3-486e-9d1e-feb98a7d53c0', 'cda7b114-719d-4b1b-a808-feb9b16eaf68', 'c19f6b6a-8c74-4c83-bf0e-bc27697931f5', 'TALK', '생각을 정리하다가… 생각이 나를 떠났어.', '2025-04-30T16:01:00'),
('39c67c47-e8e3-4a0e-a7e3-0edb9c0ed85f', 'cda7b114-719d-4b1b-a808-feb9b16eaf68', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', 'ㅋㅋㅋ철학적이네.', '2025-04-30T16:01:30'),
('5dc2b63d-9e12-47f0-bc07-c16fd00a3e8a', 'cda7b114-719d-4b1b-a808-feb9b16eaf68', 'c19f6b6a-8c74-4c83-bf0e-bc27697931f5', 'TALK', '그냥 멍 때리다 뇌 꺼졌어.', '2025-04-30T16:02:00'),

('b19a7b8d-3c3c-4c8e-9c9a-0c20f4c6a3df', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '헤이 크리스, 나 궁금한 거 있어~', '2025-05-01T13:55:10'),
('e3a4c7d2-b3f4-4b9d-9ec1-91f78c52c11a', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'TALK', '잠시만 기다려, 나 커밋만 하고!!', '2025-05-01T14:00:10'),
('9b8d70e3-d55d-4fd4-9227-5f0f8b2e775b', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'TALK', '이제 됐다. 무슨 일이야?', '2025-05-01T14:01:00'),
('4f7d9362-b91a-4f8c-9efb-13ae75e27842', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '이거 refresh token 제대로 만들어지고 있는 거 맞아?', '2025-05-01T14:02:45'),
('ed6b2ef1-35a1-47b6-851d-62b7f7271c7b', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '대충 <리프레시 토큰 />...', '2025-05-01T14:02:50'),
('f4079ac3-50cb-4fd5-b273-64b66a180c1e', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'TALK', '코드 깔끔해. 딱 봐도 토큰 잘 나오게 생겼다.', '2025-05-01T14:04:30'),
('ab7e1a36-1234-5678-90ab-cdef12345678', 'ff6f0b9c-d622-4ff2-a131-02459cf6ee69', '8e1c71eb-7d43-4de7-82d4-3137d897cb94', 'TALK', '잘 만들었다. 어설픈 토큰 아니네.', '2025-05-01T14:04:50'),

('25cb7d03-6a83-4ce2-93e6-8c4df94ed2a0', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'TALK', '테이저 페이스는 얼굴에서 테이저 쏘나?', '2025-05-02T16:30:00'),
('fd31e6f9-b89c-4230-9911-fd9c16b3f103', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '갑자기 뭔 소리야?', '2025-05-02T16:31:00'),
('b0f1c3a4-5d6e-4f8b-9c6d-7e5a2f3c8b0d', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'TALK', '아니, 이름이 테이저 페이스잖아.', '2025-05-02T16:31:30'),
('70fc6576-9825-4e24-8f53-50213c348c42', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '그럼 넌 진짜 로켓 쏘냐?', '2025-05-02T16:32:10'),
('78ec8a69-6f63-4a79-bf4b-b4b171e55317', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'TALK', '내 이름은 적어도 전기는 아니거든.', '2025-05-02T16:33:10'),
('d52e4f2c-e3de-4081-9c93-5acbe4ec437e', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'TALK', '근데 걔 후보 이름 뭐였을까?', '2025-05-02T16:33:20'),
('4f531e3b-d33d-4c6e-a700-84dc7ec4bc68', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'TALK', '...음낭 모자?', '2025-05-02T16:33:30'),
('a0f3f3e2-1690-4b34-8e3f-07b2ad44c03f', '26c00ff9-c98b-4ec9-a93e-1f3731cc083d', '7f9fdf8b-6d3a-4f02-8a25-5401c6c4c6c1', 'TALK', '캬캬캬, 상상하니까 못 참겠네.', '2025-05-02T16:33:40'),

('df6f03fa-0c92-4037-b57a-f3e19c09d57a', '71f8c42c-9fd1-4f10-9c84-2e22149f83b4', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '요즘 잠은 좀 자?', '2025-05-07T16:45:50'),
('61db2c2c-08d9-4cf4-b59f-8c8186bb2b5a', '71f8c42c-9fd1-4f10-9c84-2e22149f83b4', '77ac5206-745d-4df0-ba12-79c001779ab6', 'TALK', '자는 동안도 모델 학습해.', '2025-05-07T16:46:10'),
('a97e91e9-2c71-4ae4-8b0d-1b67d2fc1a6e', '71f8c42c-9fd1-4f10-9c84-2e22149f83b4', '77ac5206-745d-4df0-ba12-79c001779ab6', 'TALK', '효율이 중요하잖아.', '2025-05-07T16:46:10'),
('b478ce66-9a27-42e7-a44a-0bbf1c9e7a71', '71f8c42c-9fd1-4f10-9c84-2e22149f83b4', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '인간 맞지?', '2025-05-07T16:50:10'),
('cae3797b-1a20-4f80-906b-844e4c519df3', '71f8c42c-9fd1-4f10-9c84-2e22149f83b4', '77ac5206-745d-4df0-ba12-79c001779ab6', 'TALK', '아직은.', '2025-05-07T16:50:20'),

('9c75c0cb-1f14-4fa9-a721-1a007b50a9fc', '3f2a2d04-8f4e-4d3f-9b52-7d98238be3f6', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '요즘도 새 제품 준비 중이야?', '2025-05-10T13:01:00'),
('d5e95b42-d0a5-4be3-9f3f-2bba08cf7cf0', '3f2a2d04-8f4e-4d3f-9b52-7d98238be3f6', '3d28b593-b101-4803-8e84-f51d98321e0a', 'TALK', '언제나. 조용히, 하지만 혁신적으로.', '2025-05-10T13:10:40'),
('67f7b012-753d-4d61-a957-8d72c6b76df0', '3f2a2d04-8f4e-4d3f-9b52-7d98238be3f6', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '또 뭔데 이번엔?', '2025-05-10T13:14:30'),
('2fd0e8c0-2127-4a64-b6c2-dba504453d18', '3f2a2d04-8f4e-4d3f-9b52-7d98238be3f6', '3d28b593-b101-4803-8e84-f51d98321e0a', 'TALK', '말할 순 없지만… 너 지갑 조심해.', '2025-05-10T13:20:52'),

('7f3a1c26-5296-4f4e-bf59-9fd8829c3703', 'c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '형, 요즘 또 뭐 만들고 있어?', '2025-05-31T10:00:10'),
('1d5e9b07-3c10-4d62-b582-d04c93a3dcb9', 'c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3', '688af791-d6ab-4053-8bb4-5e338398193d', 'TALK', '지루해서 뇌칩에 게임 깔아봤어.', '2025-05-31T10:20:40'),
('80a6e344-352b-4bff-9d8e-2d91f0a3f643', 'c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '…진심이야?', '2025-05-31T10:23:50'),
('2b778b7d-0cb0-4dcf-94cb-2b64517cf63b', 'c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3', '688af791-d6ab-4053-8bb4-5e338398193d', 'TALK', '아직 튜토리얼 중이야. 버그 많더라.', '2025-05-31T10:30:18'),
('313c18a1-2799-4a3b-822a-1a46a9f14ac6', 'c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', 'ㅋㅋㅋ무슨 버그인데?', '2025-05-31T10:34:30'),
('5c2a6e0f-f9db-4022-b6e6-17e26cc82803', 'c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3', '688af791-d6ab-4053-8bb4-5e338398193d', 'TALK', '가끔 NPC가 내 생각 읽고 먼저 움직여.', '2025-05-31T10:50:45'),
('96b19d7d-490e-49ee-bd27-139a0a5fe1a2', 'c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '그거 그냥 형 아냐?', '2025-05-31T10:52:03'),
('6b8c179e-b5d9-4b67-9234-6f7c5b09d3a2', 'c4e1b1c5-d913-4bb2-80b5-77c1dfd7d1e3', '688af791-d6ab-4053-8bb4-5e338398193d', 'TALK', '아 맞네.', '2025-05-31T10:57:43'),

('b7e4cba3-8d1d-4f02-96cf-1c62446f4d2b', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '주하야, 지금 뭐 하고 있어?', '2025-06-01T17:00:00'),
('a1f1f5a2-645c-4c0a-92b1-0e3e4b548d9f', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'TALK', '나 WebSocket을 활용한 채팅 시스템 구현 중이야.', '2025-06-01T17:05:20'),
('de0a4ab0-f5c2-4f35-b9c4-9db6aab2a2ff', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '오, 재밌겠다! 구체적으로 어떤 걸 만들고 있는데?', '2025-06-01T17:10:30'),
('eaf3ed20-d22d-4ac2-95d5-70b1c0735d07', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'TALK', 'STOMP 기반으로 WebSocket 연결을 관리하고, 실시간 송수신 기능을 구현했어.', '2025-06-01T17:12:40'),
('5cbe6b84-2f83-4d8d-92f7-5dfd857312b1', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '흐름이 어떻게 돼? 전체 프로세스 좀 알려줄 수 있어?', '2025-06-01T17:12:50'),
('f9b2ebd5-97e1-4d1f-9a4c-1f74e9e3b0b7', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'TALK', '응. 사용자가 채팅창에 내용을 입력하면 엔드포인트로 메시지를 보내고, 서버는 스프링 messaging을 통해 브로드캐스팅해.', '2025-06-01T17:17:10'),
('ea0e1749-64fc-4903-9812-2a38d2b41ef1', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'TALK', '그리고 모든 메시지는 데이터베이스에도 저장돼서 새로고침해도 대화가 유지돼.', '2025-06-01T17:17:40'),
('5a91bc32-982e-4d6b-bb55-0ad0e0dc3cf7', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '1d3b5c8a-47a2-4e4c-8dcb-1a22c8ff7303', 'TALK', '우와 그렇구나! 혹시 테스트 해볼 수 있어?', '2025-06-01T17:17:43'),
('08f2fa50-8b17-4bb6-9882-c53c64b7bde8', '3f23e546-7c6b-4b3b-8ec3-6e5f91e1a3be', '23db2d25-c259-4b8e-a1a5-0a4317a33a13', 'TALK', '그럼, 당연하지. 지금 나한테 말을 걸어봐! 실시간으로 확인해서 답장하고 있어~', '2025-06-01T17:17:45');