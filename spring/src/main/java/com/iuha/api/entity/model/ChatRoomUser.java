package com.iuha.api.entity.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class ChatRoomUser {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private User user;

    @ManyToOne
    private ChatRoom chatRoom;
}

