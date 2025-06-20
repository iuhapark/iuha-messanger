package com.iuha.api.service.impl;

import com.iuha.api.entity.dto.MessageDto;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.model.Message;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.entity.model.User;
import com.iuha.api.repository.ChatRoomRepository;
import com.iuha.api.repository.MessageRepository;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    /* 채팅 메시지 전송 */
    @Override
    public Message sendMessage(SessionUser sessionUser, MessageDto dto) {
        ChatRoom chatRoom = chatRoomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Chat room not found."));
        User sender = userRepository.findById(sessionUser.getId())
                .orElseThrow(() -> new RuntimeException("Sender not found."));

        Message message = Message.builder()
                .chatRoom(chatRoom)
                .sender(sender)
                .message(dto.getMessage())
                .type(Message.MessageType.TALK)
                .build();

        return save(message);
    }

    /* 채팅 메시지 저장 */
    public Message save(Message message) {
        // 채팅방의 마지막 메시지 업데이트
        ChatRoom chatRoom = message.getChatRoom();
        chatRoom.setLastMessage(message.getMessage());
        chatRoom.setUpdatedAt(message.getTimestamp());
        chatRoomRepository.save(chatRoom);
        return messageRepository.save(message);
    }

    @Override
    public List<MessageDto> getChatMessages(String roomId) {
        return messageRepository.findMessagesWithSenderByRoomId(roomId)
                .stream()
                .map(this::entityToDto)
                .toList();
    }

    @Override
    public ChatRoom findChatRoomById(String roomId) {
        return chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found."));
    }

}
