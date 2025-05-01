package com.iuha.api.service.impl;

import com.iuha.api.config.auth.LoginUser;
import com.iuha.api.entity.dto.ChatMessageDto;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.repository.ChatMessageRepository;
import com.iuha.api.repository.ChatRoomRepository;
import com.iuha.api.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    /* 채팅 메시지 전송 */
    @Override
    public ChatMessage sendMessage(SessionUser sessionUser, ChatMessageDto dto) {
        ChatRoom room = chatRoomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("채팅방 정보가 존재하지 않습니다."));

        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(room)
                .sender(sessionUser.getId())
                .receiver(dto.getReceiver())
                .message(dto.getMessage())
                .build();

        return save(chatMessage);
    }

    /* 채팅 메시지 저장 */
    public ChatMessage save(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        return chatMessageRepository.save(message);
    }

    @Override
    public List<ChatMessageDto> getChatMessages(String roomId) {
        return chatMessageRepository.findByChatRoomIdOrderByTimestampAsc(roomId)
                .stream()
                .map(this::entityToDto)
                .toList();
    }


}
