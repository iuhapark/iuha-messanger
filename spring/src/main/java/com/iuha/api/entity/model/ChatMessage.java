package com.iuha.api.entity.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String roomId;
    private String sender;
    private String receiver;
    private String message;
    private LocalDateTime timestamp;

    public ChatMessage() {}

    public ChatMessage(String roomId, String sender, String receiver, String message, LocalDateTime timestamp) {
        this.roomId = roomId;
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.timestamp = timestamp;
    }

    public String getRoomId() {
        return roomId;
    }

    public String getSender() {
        return sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}
