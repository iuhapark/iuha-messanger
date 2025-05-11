package com.iuha.api.util;

import com.iuha.api.entity.model.Message;
import com.iuha.api.entity.model.ChatRoom;

import java.util.*;

public class ChatStorage {
    private static final Map<String, List<Message>> messages = new HashMap<>();


    public static void saveMessage(Message message) {
        /* 서버 저장 조건 */

        /* 그외 로컬 스토리지 저장 */
        messages.computeIfAbsent(message.getId(), k -> new ArrayList<>()).add(message);
    }

    public static List<Message> getMessages(String roomId) {
        return messages.getOrDefault(roomId, new ArrayList<>());
    }

    public static Set<String> getAllRoomIds() {
        return messages.keySet();
    }

    public static ChatRoom createRoom(ChatRoom newChatRoom) {
        return newChatRoom;
    }
}
