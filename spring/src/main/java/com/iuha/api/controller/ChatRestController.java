package com.iuha.api.controller;

import com.iuha.api.config.auth.LoginUser;
import com.iuha.api.entity.dto.ChatMessageDto;
import com.iuha.api.entity.dto.ChatRoomDto;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.model.ChatMessage;
import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.entity.model.User;
import com.iuha.api.jwt.JwtTokenProvider;
import com.iuha.api.repository.ChatMessageRepository;
import com.iuha.api.repository.ChatRoomRepository;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.util.ChatStorage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/chat")
@Slf4j
public class ChatRestController {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /* 내 채팅방 목록 조회 */
    @GetMapping("/my")
    public List<ChatRoomDto> getMyRooms(@LoginUser SessionUser user) throws IllegalAccessException {
        if (user == null) throw new IllegalAccessException("로그인이 필요합니다.");
        String myId = user.getId();

        List<ChatRoom> rooms = chatRoomRepository.findChatRoomsByUserId(myId);

        return rooms.stream().map(room -> {
            boolean isSender = room.getSender().getId().equals(myId);
            User opponent = isSender ? room.getReceiver() : room.getSender();
            return new ChatRoomDto(
                    room.getId(),
                    room.getName(),
                    opponent.getId(),
                    opponent.getName()
            );
        }).toList();
    }

    /* 메시지 전송 */
//    @PostMapping("/{roomId}/send")
//    public ResponseEntity<?> sendMessage(
//            @LoginUser SessionUser sessionUser,
//            @PathVariable String roomId,
//            @RequestBody ChatMessageDto request
//    ) {
//        var sender = userRepository.findById(sessionUser.getId())
//                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
//        var receiver = userRepository.findById(request.getReceiver().getId())
//                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상대방입니다."));
//        var chatRoom = chatRoomRepository.findById(roomId)
//                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방입니다."));
//
//        var chatMessage = new ChatMessage();
//        chatMessageRepository.save(chatMessage);
//        return ResponseEntity.ok().build();
//    }
    @PostMapping("/{roomId}/send")
    public ResponseEntity<?> sendMessage(
            @LoginUser SessionUser sessionUser,
            @PathVariable String roomId,
            @RequestBody ChatMessage message
    ) {
        String senderId = sessionUser.getId();

        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방입니다."));

        message.setChatRoom(room);
        message.setSender(senderId);
        message.setTimestamp(LocalDateTime.now());

        chatMessageRepository.save(message);

        return ResponseEntity.ok().build();
    }

    /* 채팅방 생성 DB 저장 */
    @PostMapping("/save")
    public ChatRoom saveRoom(@RequestBody ChatRoom chatRoom, @LoginUser SessionUser user) throws IllegalAccessException {
        if (user == null) throw new IllegalAccessException("로그인이 필요합니다.");

        User sender = userRepository.findById(user.getId()).orElseThrow();
        User receiver = userRepository.findById(chatRoom.getReceiver().getId()).orElseThrow();

        log.info("채팅방 생성 요청 정보: {}", chatRoom);
        log.info("receiver: {}", chatRoom.getReceiver());

        chatRoom.setSender(sender);
        chatRoom.setReceiver(receiver);

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
    public List<ChatMessageDto> getChatMessages(@PathVariable String roomId) {
        return chatMessageRepository.findByChatRoomIdOrderByTimestampAsc(roomId)
                .stream()
                .map(ChatMessageDto::new)
                .toList();
    }

    public ChatRestController(ChatMessageRepository chatMessageRepository, ChatRoomRepository chatRoomRepository, UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

}
