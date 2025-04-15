package com.iuha.api.controller;

import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.repository.ChatMessageRepository;
import com.iuha.api.repository.ChatRoomRepository;
import com.iuha.api.util.ChatStorage;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/chat")
public class ChatRestController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    /* 채팅방 생성 DB 저장 */
    @PostMapping("/save")
    public ChatRoom saveRoom(@RequestBody ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    /* 채팅방 생성 스토리지 저장 */
    @PostMapping("/new")
    public ChatRoom createRoom(@RequestBody ChatRoom chatRoom) {
        return ChatStorage.createRoom(chatRoom);
    }

    /* 모든 채팅방 조회 */
    @GetMapping("/all")
    public List<ChatRoom> getAllRooms() {
        return chatRoomRepository.findAll();
    }

    /* 로컬 스토리지 채팅방 조회 */
    @GetMapping("/rooms")
    public Set<String> getAllStorageRooms() {
        return ChatStorage.getAllRoomIds();
    }

    /* 특정 채팅방 메시지 조회 */
    @GetMapping("/{roomId}")
    public List<ChatMessage> getChatMessages(@PathVariable String roomId) {
        return chatMessageRepository.findByRoomIdOrderByTimestampAsc(roomId);
    }

    public ChatRestController(ChatMessageRepository chatMessageRepository, ChatRoomRepository chatRoomRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomRepository = chatRoomRepository;
    }


}

