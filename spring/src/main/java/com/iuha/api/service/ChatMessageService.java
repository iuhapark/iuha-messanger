package com.iuha.api.service;

import com.iuha.api.config.auth.LoginUser;
import com.iuha.api.entity.dto.ChatMessageDto;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.entity.model.ChatRoom;
import org.apache.logging.log4j.message.Message;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatMessageService {

    default ChatMessage dtoToEntity(ChatMessageDto dto) {
        return ChatMessage.builder()
                .id(dto.getId())
                .message(dto.getMessage())
                .timestamp(LocalDateTime.now())
                .chatRoom(ChatRoom.builder().id(dto.getRoomId()).build())
                .sender(dto.getSender())
                .receiver(dto.getReceiver())
                .build();
    }

    default ChatMessageDto entityToDto(ChatMessage message) {
        return ChatMessageDto.builder()
                .id(message.getId())
                .message(message.getMessage())
                .timestamp(message.getTimestamp())
                .roomId(message.getChatRoom().getId())
                .sender(message.getSender())
                .receiver(message.getReceiver())
                .build();
    }

    ChatMessage save(ChatMessage message);

    ChatMessage sendMessage(SessionUser sessionUser, ChatMessageDto dto);

    List<ChatMessageDto> getChatMessages(String roomId);



}
