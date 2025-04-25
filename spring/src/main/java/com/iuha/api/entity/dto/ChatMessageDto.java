package com.iuha.api.entity.dto;

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
    private String roomId;
    private String sender;
    private String receiver;

}
