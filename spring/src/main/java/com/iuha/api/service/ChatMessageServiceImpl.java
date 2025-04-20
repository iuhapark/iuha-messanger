package com.iuha.api.service;

import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.repository.ChatMessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageServiceImpl(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public ChatMessage save(ChatMessage message) {
        message = new ChatMessage(
                message.getId(),
                message.getSender(),
                message.getReceiver(),
                message.getMessage(),
                LocalDateTime.now()
        );
        return chatMessageRepository.save(message);
    }


}
