package com.iuha.api.repository;

import com.iuha.api.entity.model.ChatRoom;

import java.util.List;

public interface ChatRoomRepositoryCustom {
    List<ChatRoom> findChatRoomsByUserId(String userId);
}
