package com.iuha.api.entity.dto;

import com.iuha.api.entity.model.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {

    private String id;
    private String message;
    private LocalDateTime timestamp;

    private ChatRoomDto chatRoom;
    private UserDto sender;
    private UserDto receiver;

    public ChatMessageDto(ChatMessage entity) {
        this.id = entity.getId();
        this.message = entity.getMessage();
        this.timestamp = entity.getTimestamp();
    }

    public UserDto getReceiver() {
        return this.receiver;
    }
}
