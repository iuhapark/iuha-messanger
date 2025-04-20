package com.iuha.api.controller;

import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.entity.model.User;
import com.iuha.api.jwt.JwtTokenProvider;
import com.iuha.api.repository.ChatMessageRepository;
import com.iuha.api.repository.ChatRoomRepository;
import com.iuha.api.service.ChatMessageService;
import com.iuha.api.service.ChatRoomService;
import com.iuha.api.util.ChatStorage;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/chat")
public class ChatRestController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /* 특정 유저 채팅방 목록 조회 */
    @GetMapping("/my")
    public List<ChatMessage> getMyMessages(@RequestHeader("Authorization") String token) {
        String userId = jwtTokenProvider.getUserIdFromToken(token);
        return chatMessageRepository.findBySenderOrReceiverOrderByTimestampAsc(userId, userId);
    }

    /* 메시지 전송 */
    @PostMapping("/{roomId}/send")
    public ResponseEntity<?> sendMessage(
            @PathVariable String roomId,
            @RequestHeader("Authorization") String token,
            @RequestBody ChatMessage message
    ) {
        String senderId = jwtTokenProvider.getUserIdFromToken(token);

        ChatRoom room = chatRoomRepository.findById(Long.valueOf(roomId))
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방입니다."));

        message.setChatRoom(room);
        message.setSender(senderId);
        message.setTimestamp(LocalDateTime.now());

        chatMessageRepository.save(message);

        return ResponseEntity.ok().build();
    }


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


    /* 모든 채팅방 조회 - ADMIN ONLY */
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
        return chatMessageRepository.findByChatRoomIdOrderByTimestampAsc(roomId);
    }

    public ChatRestController(ChatMessageRepository chatMessageRepository, ChatRoomRepository chatRoomRepository, JwtTokenProvider jwtTokenProvider) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

}
