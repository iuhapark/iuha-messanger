package com.iuha.api.controller;

import com.iuha.api.entity.dto.MessageDto;
import com.iuha.api.entity.model.Message;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.entity.model.User;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.HtmlUtils;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final MessageService messageService;
    private final UserRepository userRepository;

    /* 메시지 전송 */
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public MessageDto sendMessage(@DestinationVariable String roomId, MessageDto dto) {
        ChatRoom chatRoom = messageService.findChatRoomById(roomId);
        // sender id로 전체 유저 정보 조회
        User sender = userRepository.findById(dto.getSender().getId())
                .orElseThrow(() -> new RuntimeException("Sender not found."));

        Message saved = messageService.save(
                Message.builder()
                        .chatRoom(chatRoom)
                        .sender(sender)
                        .type(Message.MessageType.TALK)
                        .message(HtmlUtils.htmlEscape(dto.getMessage()))
                        .timestamp(LocalDateTime.now())
                        .build()
        );

        return MessageDto.from(saved);
    }
}

