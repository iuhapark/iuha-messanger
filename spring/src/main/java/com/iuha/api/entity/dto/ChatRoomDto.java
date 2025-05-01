package com.iuha.api.entity.dto;

import com.iuha.api.entity.model.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDto {
    private String id;
    private String name;
    private String sender;
    private String receiver;

    public ChatRoomDto(ChatRoom chatRoom) {
        this.id = chatRoom.getId();
        this.name = chatRoom.getName();
        this.sender = sender;
        this.receiver = receiver;
    }

}