package com.iuha.api.util;

import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.entity.model.ChatRoom;

import java.util.*;

public class ChatStorage {
    private static final Map<String, List<ChatMessage>> chatMessages = new HashMap<>();


    public static void saveMessage(ChatMessage message) {
        /* 서버 저장 조건 */

        /* 그외 로컬 스토리지 저장 */
        chatMessages.computeIfAbsent(message.getRoomId(), k -> new ArrayList<>()).add(message);
    }

    public static List<ChatMessage> getMessages(String roomId) {
        return chatMessages.getOrDefault(roomId, new ArrayList<>());
    }

    public static Set<String> getAllRoomIds() {
        return chatMessages.keySet();
    }

    public static ChatRoom createRoom(ChatRoom newRoom) {
        return newRoom;
    }
}
