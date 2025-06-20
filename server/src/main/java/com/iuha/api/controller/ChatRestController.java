package com.iuha.api.controller;

import com.iuha.api.config.auth.LoginUser;
import com.iuha.api.entity.dto.MessageDto;
import com.iuha.api.entity.dto.ChatRoomDto;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.repository.ChatRoomRepository;
import com.iuha.api.service.MessageService;
import com.iuha.api.service.ChatRoomService;
import com.iuha.api.util.ChatStorage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatRestController {

    private final ChatRoomService chatRoomService;
    private final MessageService messageService;
    private final ChatRoomRepository chatRoomRepository;

    /* 내 채팅방 목록 조회 */
    @GetMapping("/room-list")
    public ResponseEntity<List<ChatRoomDto>> getMyRooms(@LoginUser SessionUser user) {
        log.info("내 채팅방 목록 조회 요청: {}", user.getEmail());
        return ResponseEntity.ok(chatRoomService.getMyRooms(user));
    }

    /* 메시지 전송 */
    @PostMapping("/{roomId}/send")
    public ResponseEntity<?> sendMessage(@LoginUser SessionUser user,
                                         @RequestBody MessageDto dto) {
        return ResponseEntity.ok(messageService.sendMessage(user, dto));
    }

    /* 채팅방 생성 DB 저장 */
    @PostMapping("/save")
    public ResponseEntity<ChatRoomDto> saveRoom(@LoginUser SessionUser user,
                                             @RequestBody ChatRoomDto dto) throws Exception {
        ChatRoom chatRoom = chatRoomService.saveRoom(user, dto);
        return ResponseEntity.ok(new ChatRoomDto(chatRoom));
    }

    /* 모든 채팅방 조회 - ADMIN ONLY */
    @GetMapping("/all")
    public List<ChatRoom> getAllRooms() {
        return chatRoomRepository.findAll();
    }

    /* 특정 채팅방 메시지 조회 */
    @GetMapping("/{roomId}")
    public ResponseEntity<List<MessageDto>> getChatMessages(@PathVariable String roomId) {
        log.info("채팅방 메시지 조회 요청: {}", roomId);
        return ResponseEntity.ok(messageService.getChatMessages(roomId));
    }

    /* 채팅방 생성 스토리지 저장 */
    @PostMapping("/new")
    public ChatRoom createRoom(@RequestBody ChatRoom chatRoom) {
        return ChatStorage.createRoom(chatRoom);
    }

    /* 로컬 스토리지 채팅방 조회 */
    @GetMapping("/rooms")
    public Set<String> getAllStorageRooms() {
        return ChatStorage.getAllRoomIds();
    }

    /* 로컬 스토리지 메시지 조회 */
    @GetMapping("/messages/{roomId}")
    public List<MessageDto> getStorageMessages(@PathVariable String roomId) {
        log.info("로컬 스토리지 메시지 조회 요청: {}", roomId);
        return ChatStorage.getMessages(roomId).stream()
                .map(MessageDto::from)
                .toList();
    }
}
