package com.iuha.api.service;

import com.iuha.api.entity.dto.MessageDto;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.Message;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.entity.model.User;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatMessageService {

    default Message dtoToEntity(MessageDto dto) {
        return Message.builder()
                .id(dto.getId())
                .chatRoom(ChatRoom.builder().id(dto.getRoomId()).build())
                .sender(User.builder().id(dto.getId()).build())
                .type(dto.getType())
                .message(dto.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
    }

    default MessageDto entityToDto(Message message) {
        return MessageDto.builder()
                .id(message.getId())
                .roomId(message.getChatRoom().getId())
                .sender(UserDto.builder()
                        .id(message.getSender().getId())
                        .name(message.getSender().getName())
                        .profile(message.getSender().getProfile())
                        .build())
                .type(message.getType())
                .message(message.getMessage())
                .timestamp(message.getTimestamp())
                .build();
    }

    Message save(Message message);

    Message sendMessage(SessionUser sessionUser, MessageDto dto);

    List<MessageDto> getChatMessages(String roomId);



}
