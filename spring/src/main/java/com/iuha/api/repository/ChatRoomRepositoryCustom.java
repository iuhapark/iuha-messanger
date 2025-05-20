package com.iuha.api.repository;

import com.iuha.api.entity.model.ChatRoom;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepositoryCustom {
    List<ChatRoom> findChatRoomsByUserId(String userId);
    Optional<ChatRoom> findExistingChatRoom(String senderId, String receiverId);
}
