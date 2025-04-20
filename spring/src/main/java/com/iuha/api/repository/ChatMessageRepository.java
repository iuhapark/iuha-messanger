package com.iuha.api.repository;

import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.entity.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    List<ChatMessage> findByChatRoomIdOrderByTimestampAsc(String chatRoomId);
    List<ChatMessage> findBySenderOrReceiverOrderByTimestampAsc(String sender, String receiver);
}


