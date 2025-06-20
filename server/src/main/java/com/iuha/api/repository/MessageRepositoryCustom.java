package com.iuha.api.repository;

import com.iuha.api.entity.model.Message;

import java.util.List;

public interface MessageRepositoryCustom {
        List<Message> findMessagesWithSenderByRoomId(String roomId);
}
