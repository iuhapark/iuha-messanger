package com.iuha.api.repository;

import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.entity.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findBySenderIdAndReceiverId(String senderId, String receiverId);

}
