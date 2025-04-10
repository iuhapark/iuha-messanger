package com.iuha.api.controller;

import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.service.ChatMessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class ChatController {

    private final ChatMessageService chatMessageService;

    public ChatController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;

    }

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessage sendMessage(ChatMessage message) {
        ChatMessage saved = chatMessageService.save(
                new ChatMessage(
                        null,
                        HtmlUtils.htmlEscape(message.getSender()),
                        HtmlUtils.htmlEscape(message.getReceiver()),
                        HtmlUtils.htmlEscape(message.getMessage()),
                        null
                )
        );
        return saved;
    }

}

