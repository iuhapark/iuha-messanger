package com.iuha.api.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatRoomDto {
    private String id;
    private String name;
    private String opponentId;
    private String opponentName;
}