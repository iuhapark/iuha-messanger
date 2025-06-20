package com.iuha.api.entity.dto;

import com.iuha.api.entity.model.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

    private String id;
    private String roomId;
    private UserDto sender;
    private Message.MessageType type;
    private String message;
    private LocalDateTime timestamp;

    public static MessageDto from(Message message) {
        return new MessageDto(
                message.getId(),
                message.getChatRoom().getId(),
                UserDto.from(message.getSender()),
                message.getType(),
                message.getMessage(),
                message.getTimestamp()
        );
    }

}
