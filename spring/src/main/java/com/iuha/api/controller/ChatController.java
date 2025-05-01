package com.iuha.api.controller;

import com.iuha.api.entity.dto.ChatMessageDto;
import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatMessageService chatMessageService;

    /* 메시지 전송 */
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessage sendMessage(ChatMessageDto dto) {
        log.info("채팅 메시지 roomId: {}", dto.getRoomId());
        log.info("채팅 메시지 sender: {}", dto.getSender());
        log.info("채팅 메시지 receiver: {}", dto.getReceiver());
        log.info("채팅 메시지 message: {}", dto.getMessage());
        return chatMessageService.save(
                new ChatMessage(
                        null,
                        HtmlUtils.htmlEscape(dto.getSender()),
                        HtmlUtils.htmlEscape(dto.getReceiver()),
                        HtmlUtils.htmlEscape(dto.getMessage()),
                        null
                )
        );
    }
}

