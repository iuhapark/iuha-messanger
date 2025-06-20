package com.iuha.api.entity.model;

import jakarta.persistence.*;
import lombok.*;
import jakarta.persistence.Id;

import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserFriend {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "friend_id")
    private User friend;

    public static List<UserFriend> createBidirectional(User user, User friend) {
        return List.of(
                UserFriend.builder().user(user).friend(friend).build(),
                UserFriend.builder().user(friend).friend(user).build()
        );
    }
}