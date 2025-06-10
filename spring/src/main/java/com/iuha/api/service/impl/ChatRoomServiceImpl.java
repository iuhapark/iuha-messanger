package com.iuha.api.service.impl;

import com.iuha.api.entity.dto.ChatRoomDto;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.entity.model.User;
import com.iuha.api.entity.model.UserRoom;
import com.iuha.api.repository.ChatRoomRepository;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.iuha.api.util.exception.ExceptionUtil;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.util.Objects.isNull;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    @Override
    public List<ChatRoomDto> getMyRooms(SessionUser user) {
        if (isNull(user)) throw new ExceptionUtil.UnauthorizedException("Session has expired.");
        String myId = user.getId();

        List<ChatRoom> chatRooms = chatRoomRepository.findChatRoomsByUserId(myId);

        return chatRooms.stream()
                .map(ChatRoomDto::new)
                .toList();
    }

    @Override
    @Transactional
    public ChatRoom saveRoom(SessionUser sessionUser, ChatRoomDto dto) throws Exception {
        User sender = userRepository.findById(sessionUser.getId())
                .orElseThrow(() -> new ExceptionUtil.BadRequestException("Sender does not exist."));

        User receiver = userRepository.findById(dto.getParticipants().get(0).getId())
                .orElseThrow(() -> new ExceptionUtil.BadRequestException("Receiver does not exist."));

        // 기존 채팅방 존재 여부 확인
        Optional<ChatRoom> existingRoom = chatRoomRepository.findExistingChatRoom(sender.getId(), receiver.getId());

        if (existingRoom.isPresent()) {
            ChatRoom room = existingRoom.get();
            room.getParticipants().size(); // Lazy 강제 초기화
            return room;
        }

        // 새 채팅방 생성
        ChatRoom chatRoom = new ChatRoom();
        List<UserRoom> userRooms = List.of(
                UserRoom.builder().chatRoom(chatRoom).user(sender).build(),
                UserRoom.builder().chatRoom(chatRoom).user(receiver).build()
        );

        chatRoom.setParticipants(userRooms);
        return chatRoomRepository.save(chatRoom);
    }



}
