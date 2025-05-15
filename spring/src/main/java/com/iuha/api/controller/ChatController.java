package com.iuha.api.controller;

import com.iuha.api.entity.dto.MessageDto;
import com.iuha.api.entity.model.Message;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.entity.model.User;
import com.iuha.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final MessageService messageService;

    /* 메시지 전송 */
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public MessageDto sendMessage(MessageDto dto) {
        ChatRoom chatRoom = messageService.findChatRoomById(dto.getRoomId());
        User sender = User.builder().id(dto.getSender().getId()).build();

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

