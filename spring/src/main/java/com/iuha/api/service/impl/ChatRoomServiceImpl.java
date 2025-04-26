package com.iuha.api.service.impl;

import com.iuha.api.entity.dto.ChatRoomDto;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.entity.model.User;
import com.iuha.api.repository.ChatRoomRepository;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.iuha.api.util.exception.ExceptionUtil;

import java.util.List;
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

        List<ChatRoom> rooms = chatRoomRepository.findChatRoomsByUserId(myId);

        return rooms.stream().map(room -> {
            boolean isSender = room.getSender().getId().equals(myId);

            // 상대방 유저 추출
//            var opponent = isSender ? room.getReceiver() : room.getSender();

            return ChatRoomDto.builder()
                    .id(room.getId())
                    .name(room.getName())
                    .sender(new UserDto(room.getSender()))
                    .receiver(new UserDto(room.getReceiver()))
                    .build();
        }).toList();
    }

    @Override
    public ChatRoom saveRoom(SessionUser user, ChatRoom chatRoom) throws Exception {
        if (user == null) throw new ExceptionUtil.UnauthorizedException("로그인이 필요합니다.");

        User sender = userRepository.findById(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("발신자 정보가 없습니다."));
        User receiver = Optional.ofNullable(chatRoom.getReceiver())
                .map(User::getId)
                .flatMap(userRepository::findById)
                .orElseThrow(() -> new IllegalArgumentException("수신자 정보가 없습니다."));

        log.info("채팅방 생성 요청 정보: {}", chatRoom);
        log.info("receiver: {}", chatRoom.getReceiver());

        // 기존 채팅방 존재 여부 확인
        Optional<ChatRoom> existingRoom = chatRoomRepository.findBySenderIdAndReceiverId(sender.getId(), receiver.getId());
        if (existingRoom.isPresent()) throw new ExceptionUtil.BadRequestException("이미 존재하는 채팅방입니다.");

        chatRoom.setSender(sender);
        chatRoom.setReceiver(receiver);

        return chatRoomRepository.save(chatRoom);
    }


}
