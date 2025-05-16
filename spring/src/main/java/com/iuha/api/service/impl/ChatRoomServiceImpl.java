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
        if (isNull(user)) throw new ExceptionUtil.UnauthorizedException("로그인이 필요합니다.");
        String myId = user.getId();

        List<ChatRoom> chatRooms = chatRoomRepository.findChatRoomsByUserId(myId);

        return chatRooms.stream()
                .map(ChatRoomDto::new)
                .toList();
    }

    @Override
    public ChatRoom saveRoom(SessionUser user, ChatRoomDto dto) throws Exception {
        User sender = userRepository.findById(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 존재하지 않습니다."));

        User receiver = userRepository.findById(dto.getParticipants().get(0).getId())
                .orElseThrow(() -> new IllegalArgumentException("상대방 정보가 존재하지 않습니다."));

        ChatRoom chatRoom = new ChatRoom();

        List<UserRoom> userRooms = List.of(
                UserRoom.builder().chatRoom(chatRoom).user(sender).build(),
                UserRoom.builder().chatRoom(chatRoom).user(receiver).build()
        );

        chatRoom.setParticipants(userRooms);
        return chatRoomRepository.save(chatRoom);
    }
}
